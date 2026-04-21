import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { BabyService } from 'src/baby/baby.service';
import { GrowthService } from 'src/growth/growth.service';
import { LogsService } from 'src/logs/logs.service';
import { ReportsService } from 'src/reports/reports.service';

@Controller('reports')
export class ReportController {
  constructor(
    private readonly babyService: BabyService,
    private readonly logsService: LogsService,
    private readonly growthService: GrowthService,
    private readonly reportsService: ReportsService,
  ) {}

  @Get(':id/report')
  async downloadReport(@Param('id') id: number, @Res() res: ExpressResponse) {
    const baby = await this.babyService.findById(id);
    if (!baby) throw new NotFoundException('Baby not found');

    const [logs, growth] = await Promise.all([
      this.logsService.findByBaby(id),
      this.growthService.findByBaby(id),
    ]);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${baby.name}-report.pdf`,
    });

    return this.reportsService.generateReport(res, baby, logs, growth);
  }
}
