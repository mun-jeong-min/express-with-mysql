import { type } from "os";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "../board/board.entity";
import { User } from "../user/user.entity";

@Entity()
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    script: string;

    @ManyToOne(() => Board, board=>board.comment, {eager:true})
    board:Board;

    @ManyToOne(() => User, user => user.comment, {eager:false})
    user:User;
}