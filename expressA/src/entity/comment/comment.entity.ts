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

    @ManyToOne(() => Board, board=>board.comment, {eager:false})
    board:Board;

    @ManyToOne(() => User, user => user.comment, {eager:true})
    user:User;
}