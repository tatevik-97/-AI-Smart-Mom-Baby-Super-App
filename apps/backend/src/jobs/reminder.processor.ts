import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('reminder-queue')
export class ReminderProcessor extends WorkerHost {
  async process(job: Job<any>) {
    console.log('Job received:', job.name);

    if (job.name === 'feeding-reminder') {
      const { babyId } = job.data;
      console.log(`⏰ Reminder: Feed baby ${babyId}`);
    }
  }
}
