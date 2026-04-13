import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Baby} from "src/baby/baby.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'mom' }) // roles: mom | admin
    role: string;

    @OneToMany(() => Baby, baby => baby.owner, { cascade: true })
    babies: Baby[];
}
