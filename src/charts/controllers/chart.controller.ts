import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChartService } from '../services/chart.service';
import { CreateChartDto, UpdateChartDto } from '../dtos/create-update-chart.dto';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/types/role';
import { AuthNeeded } from '../../shared/decorators/auth.decorator';
import { ChartPath } from '../types/paths/chart';
import { IChartResponse, IGetAllChartsResponse } from '../types/chart';
import { Chart } from '../schemas/chart.schema';
import { IResponse } from '../../shared/types/response';
import { ChartMessage } from '../types/message';

@Controller(ChartPath.Base)
export class ChartController {
  constructor(private chartService: ChartService) {}

  @Get(ChartPath.GetAll)
  async getAll(): Promise<IGetAllChartsResponse> {
    const charts: Chart[] = await this.chartService.getAll();

    return {
      data: charts
    };
  }

  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor)
  @Post()
  async create(@Body(new ValidationPipe()) createChartDTO: CreateChartDto): Promise<IChartResponse> {
    const chart: Chart =  await this.chartService.create(createChartDTO);

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

  @AuthNeeded()
  @Roles(Role.Admin, Role.ChartEditor)
  @Patch(':id')
  async update(
    @Body(new ValidationPipe()) chart: UpdateChartDto,
    @Param('id') id: string
  ): Promise<IChartResponse> {
    const updatedChart: Chart = await this.chartService.update(chart, id);

    return {
      data: updatedChart
    };
  }

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