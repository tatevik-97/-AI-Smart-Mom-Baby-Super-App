import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GrowthService } from 'src/growth/growth.service';
import { CreateGrowthDto } from 'src/growth/dto/create-growth.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/role.enum';

@Controller('growth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.MOM, UserRole.ADMIN)
export class GrowthController {
  constructor(private growthService: GrowthService) {}

  @Post(':babyId')
  create(@Param('babyId') babyId: number, @Body() dto: CreateGrowthDto) {
    return this.growthService.create(babyId, dto);
  }

  @Get(':babyId')
  find(@Param('babyId') babyId: number) {
    return this.growthService.findByBaby(babyId);
  }
}
