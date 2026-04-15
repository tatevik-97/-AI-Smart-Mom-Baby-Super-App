import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Growth } from 'src/growth/growth.entity';
import { GrowthService } from 'src/growth/growth.service';
import { GrowthController } from 'src/growth/growth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Growth])],
  providers: [GrowthService],
  controllers: [GrowthController],
})
export class GrowthModule {}
