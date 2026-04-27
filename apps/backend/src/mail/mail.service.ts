import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendReminder(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Baby Feeding Reminder',
      html: `
    <h2>Baby Reminder</h2>
    <p>Time for next feeding 🍼</p>
  `,
    });
  }
}
