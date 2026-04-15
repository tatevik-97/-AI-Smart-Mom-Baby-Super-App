import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Growth } from 'src/growth/growth.entity';
import { CreateGrowthDto } from 'src/growth/dto/create-growth.dto';

@Injectable()
export class GrowthService {
  constructor(
    @InjectRepository(Growth)
    private repo: Repository<Growth>,
  ) {}

  create(babyId: number, dto: CreateGrowthDto) {
    return this.repo.save({
      ...dto,
      baby: { id: babyId },
    });
  }

  findByBaby(babyId: number) {
    return this.repo.find({
      where: { baby: { id: babyId } },
      order: { date: 'ASC' },
    });
  }
}
