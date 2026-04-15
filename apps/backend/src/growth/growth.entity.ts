import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Baby } from 'src/baby/baby.entity';

@Entity()
export class Growth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  date: Date;

  @ManyToOne(() => Baby, (baby) => baby.id)
  baby: Baby;
}
