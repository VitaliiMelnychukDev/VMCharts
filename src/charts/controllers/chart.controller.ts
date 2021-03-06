import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ChartService } from '../services/chart.service';
import { CreateChartDto, UpdateChartDto } from '../dtos/create-update-chart.dto';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/types/role';
import { AuthNeeded } from '../../shared/decorators/auth.decorator';
import { ChartPath } from '../types/paths/chart';
import { IChartResponse, IChartsSearchResults, ISearchChartsResponse } from '../types/chart';
import { Chart } from '../schemas/chart.schema';
import { IResponse } from '../../shared/types/response';
import { ChartMessage } from '../types/message';
import { SearchChartsDto } from '../dtos/search-charts.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller(ChartPath.Base)
export class ChartController {
  constructor(private chartService: ChartService) {}

  @Get(ChartPath.Search)
  async search(@Query(new ValidationPipe()) body: SearchChartsDto): Promise<ISearchChartsResponse> {
    const charts: IChartsSearchResults = await this.chartService.search(body);

    return {
      data: charts
    };
  }

  @ApiBearerAuth()
  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor)
  @Post()
  async create(@Body(new ValidationPipe()) body: CreateChartDto): Promise<IChartResponse> {
    const chart: Chart =  await this.chartService.create(body);

    return {
      data: chart
    };
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<IChartResponse> {
    const chart: Chart = await this.chartService.get(id);

    return {
      data: chart
    };
  }

  @Get('get-by-slug/:slug')
  async getBySlug(@Param('slug') slug: string): Promise<IChartResponse> {
    const chart: Chart = await this.chartService.getBySlug(slug);

    return {
      data: chart
    };
  }

  @ApiBearerAuth()
  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor)
  @Patch(':id')
  async update(
    @Body(new ValidationPipe()) body: UpdateChartDto,
    @Param('id') id: string
  ): Promise<IChartResponse> {
    const updatedChart: Chart = await this.chartService.update(body, id);

    return {
      data: updatedChart
    };
  }

  @ApiBearerAuth()
  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IResponse> {
    await this.chartService.delete(id);

    return {
      message: ChartMessage.DeleteChartSuccess
    };
  }
}