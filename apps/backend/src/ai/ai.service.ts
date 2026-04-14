import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class AiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1', // Սա թույլ է տալիս օգտագործել OpenAI library-ն Groq-ի հետ
  });

  async chat(message: string) {
    const response = await this.openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful baby care assistant. Give short, useful advice for parents.',
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
