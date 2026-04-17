import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Baby } from 'src/baby/baby.entity';
import { Repository } from 'typeorm';
import { CreateBabyDto } from 'src/baby/dto/create-baby.dto';
import { User } from 'src/users/user.entity';
import { UpdateBabyDto } from 'src/baby/dto/update-baby.dto';

@Injectable()
export class BabyService {
  constructor(@InjectRepository(Baby) private babyRepo: Repository<Baby>) {}

  create(createBabyDto: CreateBabyDto, user: User) {
    const baby = this.babyRepo.create({ ...createBabyDto, owner: user });
    return this.babyRepo.save(baby);
  }

  findAll(user: User) {
    return this.babyRepo.find({ where: { owner: user } });
  }

  findOne(id: number, user: User) {
    return this.babyRepo.findOne({ where: { id, owner: user } });
  }

  async update(id: number, updateDto: UpdateBabyDto, user: User) {
    const baby = await this.findOne(id, user);
    if (!baby) throw new Error('Baby not found');
    Object.assign(baby, updateDto);
    return this.babyRepo.save(baby);
  }

  async remove(id: number, user: User) {
    const baby = await this.findOne(id, user);
    if (!baby) throw new Error('Baby not found');
    return this.babyRepo.remove(baby);
  }
  async updatePhoto(id: number, filename: string) {
    const baby = await this.babyRepo.findOneBy({ id });
    if (!baby) throw new NotFoundException('Baby not found');
    baby.photo = filename;
    baby.photoUrl = `/uploads/${filename}`;
    return this.babyRepo.save(baby);
  }
}
