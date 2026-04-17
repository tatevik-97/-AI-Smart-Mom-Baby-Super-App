import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReminderProcessor } from 'src/jobs/reminder.processor';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'reminder-queue' }),
    NotificationModule,
  ],
  providers: [ReminderProcessor],
  exports: [BullModule],
})
export class JobsModule {}
