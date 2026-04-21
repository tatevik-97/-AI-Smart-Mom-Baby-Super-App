import { Module } from '@nestjs/common';
import { ReportController } from './reports.controller';
import { ReportsService } from './reports.service';
import { BabyModule } from 'src/baby/baby.module';
import { LogsModule } from 'src/logs/logs.module';
import { GrowthModule } from 'src/growth/growth.module';

@Module({
  imports: [BabyModule, LogsModule, GrowthModule],
  controllers: [ReportController],
  providers: [ReportsService],
})
export class ReportsModule {}
