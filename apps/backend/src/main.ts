import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3002')
    .split(',')
    .map((o) => o.trim());

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    credentials: true,
    maxAge: 3600,
  });
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // '0.0.0.0' հասցեն կարևոր է Railway-ի համար

  console.log(`Application is running on: ${port}`);
}

void bootstrap();
