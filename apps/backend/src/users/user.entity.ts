import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Baby } from 'src/baby/baby.entity';
import { UserRole } from 'src/users/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MOM,
  })
  role: UserRole;

  @Column({ type: 'varchar', nullable: true })
  resetToken: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  resetTokenExpires: Date | null;

  @OneToMany(() => Baby, (baby) => baby.owner, { cascade: true })
  babies: Baby[];
}
