import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChartDto, UpdateChartDto } from '../dtos/create-update-chart.dto';
import { ChartError } from '../types/error';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChartSchemaName } from '../types/schema/chart';
import { Chart, ChartDocument } from '../schemas/chart.schema';

@Injectable()
export class ChartService {
  constructor(@InjectModel(ChartSchemaName) private chartModel: Model<ChartDocument>) {}

  public async getAll(): Promise<Chart[]> {
    try {
      return await this.chartModel.find().exec();
    } catch (e) {
      throw new BadRequestException(ChartError.GetAllChartsError);
    }
  }

  public async create(chart: CreateChartDto): Promise<Chart> {
    try {
      let createdChart: ChartDocument = new this.chartModel(chart);

      return await createdChart.save();
    } catch (e) {
      throw new BadRequestException(ChartError.CreateChartError);
    }
  }

  async update(chart: UpdateChartDto, chartId: string): Promise<Chart> {
    try {
      await this.chartModel.updateOne({ _id: chartId }, chart);

      return this.get(chartId);
    } catch(e) {
      this.handleException(e, ChartError.UpdateChartError);
    }
  }

  async get(chartId: string): Promise<Chart> {
    try {
      const chart: Chart | null = await this.chartModel.findOne({ _id: chartId });

      if (!chart) {
        throw new NotFoundException();
      }

      return chart;
    } catch(e) {
      this.handleException(e, ChartError.GetChartError);
    }
  }

  async delete(chartId: string): Promise<boolean> {
    try {
      const chart: Chart | null = await this.chartModel.findOneAndDelete({ _id: chartId });

      if (!chart) {
        throw new NotFoundException();
      }

      return true;
    } catch(e) {
      this.handleException(e, ChartError.DeleteChartError);
    }
  }

  private handleException(e: any, badRequestErrorMessage: ChartError) {
    if (e instanceof NotFoundException) {
      throw new NotFoundException();
    } else {
      throw new BadRequestException(badRequestErrorMessage);
    }
  }

}