import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Baby } from 'src/baby/baby.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'sleep' | 'feeding' | 'diaper';

  @Column()
  value: string; // example: "2 hours", "150ml", "wet"

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Baby, (baby) => baby.id, { onDelete: 'CASCADE' })
  baby: Baby;
}
