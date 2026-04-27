import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationService } from 'src/notifications/notifications.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/users/user.service';

@Processor('reminder-queue')
export class ReminderProcessor extends WorkerHost {
  constructor(
    private notificationService: NotificationService,
    private gateway: NotificationsGateway,
    private usersService: UserService,
    private mailService: MailService,
  ) {
    super();
  }

  async process(job: Job<{ userId: number; babyId: number }>) {
    console.log('Job received:', job.name);
    const user = await this.usersService.findById(job.data.userId);

    if (job.name === 'feeding-reminder') {
      await this.notificationService.create(
        job.data.userId,
        'Time for next feeding 🍼',
      );
      this.gateway.sendNotification(job.data.userId, {
        message: 'Time for next feeding 🍼',
      });
      await this.mailService.sendReminder(user.email).catch((err: Error) => {
        console.error('Failed to send reminder email:', err.message);
      });
    }
  }
}
