import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BabyController } from './baby.controller';
import { BabyService } from './baby.service';
import { Baby } from './baby.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Baby]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [BabyController],
  providers: [BabyService],
  exports: [BabyService],
})
export class BabyModule {}
