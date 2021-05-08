import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateChartDto } from '../dtos/create-chart.dto';
import { Chart } from '../interface/chart.interface';

@Injectable()
export class ChartService {
  getAll(): Chart[] {
    return [
      {
        name: 'Best Metal',
        id: 12
      },
      {
        name: 'Best Metalcore',
        id: 12
      }
    ];
  }

  create(chart: CreateChartDto): void {
    throw new NotImplementedException('Method Is Not Implemented');
  }
}