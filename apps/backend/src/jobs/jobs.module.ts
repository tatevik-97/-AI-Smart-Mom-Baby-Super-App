import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReminderProcessor } from 'src/jobs/reminder.processor';
import { NotificationModule } from 'src/notifications/notifications.module';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'reminder-queue' }),
    NotificationModule,
  ],
  providers: [ReminderProcessor, NotificationsGateway],
  exports: [BullModule],
})
export class JobsModule {}
