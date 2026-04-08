import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async createUser(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ email, password: hashedPassword });
        return this.usersRepository.save(user);
    }

    findByEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }

    findById(id: number) {
        return this.usersRepository.findOneBy({ id });
    }
}
