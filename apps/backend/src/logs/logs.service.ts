import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/logs/log.entity';
import { Repository } from 'typeorm';
import { Baby } from 'src/baby/baby.entity';
import { CreateLogDto } from 'src/logs/dto/create-log.dto';
import { LogsGateway } from 'src/logs/logs.gateway';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log) private logRepo: Repository<Log>,
    @InjectRepository(Baby) private babyRepo: Repository<Baby>,
    private logsGateway: LogsGateway,
    @InjectQueue('reminder-queue') private reminderQueue: Queue,
  ) {}

  async create(dto: CreateLogDto) {
    const baby = await this.babyRepo.findOne({ where: { id: dto.babyId } });
    if (!baby) throw new Error('Baby not found');

    const log = this.logRepo.create({
      type: dto.type,
      value: dto.value,
      baby,
    });
    const saved = await this.logRepo.save(log);

    // 🔥 ADD JOB
    await this.reminderQueue.add(
      'feeding-reminder', // job name
      { babyId: dto.babyId }, // data
      {
        delay: 5000, // 5 second
      },
    );

    this.logsGateway.sendLogUpdate(saved);
    return saved;
  }

  findByBaby(babyId: number) {
    return this.logRepo.find({
      where: { baby: { id: babyId } },
      relations: ['baby'],
    });
  }

  getRecentLogs(userId: number): Promise<Log[]> {
    return this.logRepo.find({
      where: { baby: { owner: { id: userId } } },
      relations: ['baby'],
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }
}
