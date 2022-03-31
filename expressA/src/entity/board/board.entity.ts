import { type } from "os";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../comment/comment.entity";
import { User } from "../user/user.entity";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @ManyToOne(() => User, user=>user.board, {eager:false})
    user:User;

    @OneToMany(() => Comment, comment => comment.board, { eager:false })
    comment:Comment[];
}