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

  async sendResetLink(email: string, token: string) {
    const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      html: `<p>Click below to reset password:</p>
           <a href="${link}">${link}</a>`,
    });
  }
}
