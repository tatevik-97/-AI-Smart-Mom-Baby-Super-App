import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { BabyModule } from './baby/baby.module';
import { LogsModule } from './logs/logs.module';
import { AiModule } from './ai/ai.module';
import { GrowthModule } from './growth/growth.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        url: process.env.REDIS_URL,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: process.env.DB_PASSWORD,
      // database: 'mom_baby',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // DEV ONLY
    }),
    UserModule,
    AuthModule,
    BabyModule,
    LogsModule,
    AiModule,
    GrowthModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
console.log('DB URL:', process.env.DATABASE_URL);
