import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { Log } from 'src/logs/log.entity';
import { Baby } from 'src/baby/baby.entity';
import { LogsController } from 'src/logs/logs.controller';
import { LogsGateway } from 'src/logs/logs.gateway';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Log, Baby]),
    JobsModule,
  ],
  providers: [LogsService, LogsGateway],
  controllers: [LogsController],
})
export class LogsModule {}
