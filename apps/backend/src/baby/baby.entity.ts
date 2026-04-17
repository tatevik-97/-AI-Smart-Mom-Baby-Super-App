import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Log } from '../logs/log.entity';

@Entity()
export class Baby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  birthDate: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @ManyToOne(() => User, (user) => user.babies, { onDelete: 'CASCADE' })
  owner: User;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => Log, (log) => log.baby)
  logs: Log[];
}
