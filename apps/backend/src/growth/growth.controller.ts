import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GrowthService } from 'src/growth/growth.service';
import { CreateGrowthDto } from 'src/growth/dto/create-growth.dto';

@Controller('growth')
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
