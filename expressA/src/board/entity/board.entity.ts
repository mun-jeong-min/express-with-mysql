import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";

export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    create: Date;

    @UpdateDateColumn()
    update: Date;
}