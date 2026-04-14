import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3002',
      'https://ai-smart-mom-baby-super-app-fronten.vercel.app',
      'https://ai-smart-mom-baby-super-app-fronten.vercel.app/',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    maxAge: 3600,
  });
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
