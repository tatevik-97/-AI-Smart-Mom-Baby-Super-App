import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BabyController } from './baby.controller';
import { BabyService } from './baby.service';
import { Baby } from './baby.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Baby])],
    controllers: [BabyController],
    providers: [BabyService],
    exports: [BabyService],
})
export class BabyModule {}
