import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { LogsService } from 'src/logs/logs.service';
import { Log } from 'src/logs/log.entity';

@Injectable()
export class AiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  constructor(private readonly logsService: LogsService) {}

  async chat(userId: number, message: string) {
    const logs: Log[] = await this.logsService.getRecentLogs(userId);

    const logsContext = logs.length
      ? `Recent baby logs (last ${logs.length}):\n` +
        logs
          .map(
            (l: Log) =>
              `- ${l.type}: ${l.value} (${new Date(l.createdAt).toLocaleString()})`,
          )
          .join('\n')
      : 'No recent logs available.';

    const response = await this.openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful baby care assistant. Give short, useful advice for parents. ' +
            'Use the baby logs below as context to personalize your answer.\n\n' +
            logsContext,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    return {
      reply: response.choices[0].message.content,
    };
  }
}
