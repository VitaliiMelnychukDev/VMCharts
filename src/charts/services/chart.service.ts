import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ChartSong, CreateChartDto, UpdateChartDto } from '../dtos/create-update-chart.dto';
import { ChartError } from '../types/error';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChartSchemaName } from '../types/schema/chart';
import { Chart, ChartDocument } from '../schemas/chart.schema';
import { SearchChartsDto } from '../dtos/search-charts.dto';
import { ChartRepository } from '../repositories/chart.repository';
import { IChartsSearchResults } from '../types/chart';

@Injectable()
export class ChartService {
  constructor(
    @InjectModel(ChartSchemaName) private chartModel: Model<ChartDocument>,
    private chartRepository: ChartRepository
  ) {}

  public async search(searchDto: SearchChartsDto): Promise<IChartsSearchResults> {
    try {
      return await this.chartRepository.searchCharts(searchDto);
    } catch (e) {
      throw new BadRequestException(ChartError.SearchChartsError);
    }
  }

  public async create(chart: CreateChartDto): Promise<Chart> {
    try {
      let createdChart: ChartDocument = new this.chartModel(chart);

      return await createdChart.save();
    } catch (e) {
      console.log("E: ", e);
      throw new BadRequestException(ChartError.CreateChartError);
    }
  }

  async update(chart: UpdateChartDto, chartId: string): Promise<Chart> {
    try {
      await this.chartModel.updateOne({ _id: chartId }, chart);
    } catch(e) {
      throw new BadRequestException(ChartError.UpdateChartError);
    }

    return this.get(chartId);
  }

  async get(chartId: string): Promise<Chart> {
    let chart: Chart | null = null;

    try {
      chart = await this.chartModel.findOne({ _id: chartId }).populate(this.chartRepository.songsPopulateStrting);
    } catch(e) {
      throw new BadRequestException(ChartError.GetChartError);
    }

    if (!chart) {
      throw new NotFoundException();
    }

    return this.prepareChart(chart);
  }

  async getBySlug(slug: string): Promise<Chart> {
    let chart: Chart | null = null;

    try {
      chart = await this.chartModel.findOne({ slug }).populate(this.chartRepository.songsPopulateStrting);
    } catch(e) {
      throw new BadRequestException(ChartError.GetBySlugError);
    }

    if (!chart) {
      throw new NotFoundException();
    }

    return this.prepareChart(chart);
  }

  async delete(chartId: string): Promise<boolean> {
    let chart: Chart | null = null;

    try {
      chart = await this.chartModel.findOneAndDelete({ _id: chartId });
    } catch(e) {
      throw new BadRequestException(ChartError.DeleteChartError);
    }

    if (!chart) {
      throw new NotFoundException();
    }

    return true;
  }

  private prepareChart(chart: Chart): Chart {
    chart.songs = chart.songs.filter((song: ChartSong) => song.song);

    chart.songs.sort(this.sortSongs);

    return chart;
  }


  private sortSongs( a: ChartSong, b: ChartSong ): number {
    if ( a.position < b.position ){
      return -1;
    }
    if ( a.position > b.position ){
      return 1;
    }

    return 0;
  }
}