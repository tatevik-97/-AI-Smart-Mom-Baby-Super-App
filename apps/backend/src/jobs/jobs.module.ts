import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReminderProcessor } from 'src/jobs/reminder.processor';
import { NotificationModule } from 'src/notifications/notifications.module';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { UserModule } from 'src/users/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'reminder-queue' }),
    NotificationModule,
    UserModule,
    MailModule,
  ],
  providers: [ReminderProcessor, NotificationsGateway],
  exports: [BullModule],
})
export class JobsModule {}
