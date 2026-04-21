import PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { Baby } from 'src/baby/baby.entity';
import { Log } from 'src/logs/log.entity';
import { Growth } from 'src/growth/growth.entity';

@Injectable()
export class ReportsService {
  constructor() {}

  generateReport(
    res: ExpressResponse,
    baby: Baby,
    logs: Log[],
    growth: Growth[],
  ) {
    const doc = new PDFDocument();

    doc.pipe(res as any);

    doc.fontSize(20).text(`Baby Report: ${baby.name}`);
    doc.moveDown();

    doc.fontSize(14).text('Logs');
    logs.forEach((log) => {
      doc.text(`${log.type}: ${log.value}`);
    });

    doc.moveDown();
    doc.text('Growth');
    growth.forEach((g) => {
      doc.text(`Weight: ${g.weight}kg Height: ${g.height}cm`);
    });

    doc.end();
  }
}
