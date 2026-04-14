import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReminderProcessor } from 'src/jobs/reminder.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'reminder-queue' })],
  providers: [ReminderProcessor],
  exports: [BullModule],
})
export class JobsModule {}
