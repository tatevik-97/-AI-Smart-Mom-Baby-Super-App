import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
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

bootstrap();
