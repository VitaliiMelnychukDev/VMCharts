import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, SetMetadata } from '@nestjs/common';
import { ChartService } from '../services/chart.service';
import { CreateChartDto } from '../dtos/create-chart.dto';
import { Chart } from '../interface/chart.interface';
import { ValidationPipe } from '../../shared/pipe/validation.pipe';
import { Roles } from '../../shared/decorators/roles.decorator';
import { Role } from '../../shared/types/role';

@Controller('chart')
export class ChartController {

  constructor(private chatsService: ChartService) {}

  @Get(':id')
  get(
    @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number
  ): Chart[] {
    return this.chatsService.getAll();
  }

  @Roles(Role.Admin)
  @Post()
  create(@Body(new ValidationPipe()) createChartDTO: CreateChartDto) {
    return this.chatsService.create(createChartDTO);
  }
}