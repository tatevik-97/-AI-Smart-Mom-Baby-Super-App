import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationService } from 'src/notifications/notifications.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Processor('reminder-queue')
export class ReminderProcessor extends WorkerHost {
  constructor(
    private notificationService: NotificationService,
    private gateway: NotificationsGateway,
  ) {
    super();
  }

  async process(job: Job<{ userId: number; babyId: number }>) {
    console.log('Job received:', job.name);

    if (job.name === 'feeding-reminder') {
      await this.notificationService.create(
        job.data.userId,
        'Time for next feeding 🍼',
      );
      this.gateway.sendNotification(job.data.userId, {
        message: 'Time for next feeding 🍼',
      });
    }
  }
}
