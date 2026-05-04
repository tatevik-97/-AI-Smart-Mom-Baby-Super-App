import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/role.enum';
import { LogsService } from 'src/logs/logs.service';
import { CreateLogDto } from 'src/logs/dto/create-log.dto';

@Controller('logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.MOM, UserRole.ADMIN)
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Post()
  create(@Req() req: { user: { id: number } }, @Body() dto: CreateLogDto) {
    return this.logsService.create({ ...dto, userId: req.user.id });
  }

  @Get(':babyId')
  getLogs(@Param('babyId') babyId: number) {
    return this.logsService.findByBaby(+babyId);
  }
}
