import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/logs/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
