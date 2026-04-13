import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from '../logs/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AiService {
    constructor(
        @InjectRepository(Log)
        private logRepo: Repository<Log>,
    ) {}

    async getInsights(babyId: number) {
        const logs = await this.logRepo.find({
            where: { baby: { id: babyId } },
        });

        // 🔹 Filter logs
        const sleepLogs = logs.filter(l => l.type === 'sleep');
        const feedingLogs = logs.filter(l => l.type === 'feeding');

        // 🔹 Simple logic
        const sleepCount = sleepLogs.length;
        const feedingCount = feedingLogs.length;

        let sleepInsight = '';
        let feedingInsight = '';

        if (sleepCount < 3) {
            sleepInsight = 'Baby slept less than average';
        } else {
            sleepInsight = 'Sleep is normal';
        }

        if (feedingCount < 3) {
            feedingInsight = 'Feeding might be low';
        } else {
            feedingInsight = 'Feeding is normal';
        }

        return {
            sleep: sleepInsight,
            feeding: feedingInsight,
            recommendation:
                sleepCount < 3
                    ? 'Try earlier bedtime'
                    : 'Keep current routine',
        };
    }
}
