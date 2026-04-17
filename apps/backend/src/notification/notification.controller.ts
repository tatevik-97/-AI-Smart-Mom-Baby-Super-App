import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationService } from 'src/notification/notification.service';

@Controller('notification')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
  @Get()
  findMyNotifications(@Req() req: { user: { id: number } }) {
    return this.notificationService.findByUser(req.user.id);
  }
  @Post()
  create(
    @Req() req: { user: { id: number } },
    @Body() body: { message: string },
  ) {
    return this.notificationService.create(req.user.id, body.message);
  }
}
