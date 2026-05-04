import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { UsersController } from 'src/users/users.controller';
import { Baby } from 'src/baby/baby.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Baby])],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
