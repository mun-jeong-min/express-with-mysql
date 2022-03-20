import { type } from "os";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "../board/board.entity";

@Entity()
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    script: string;

    @ManyToOne(type => Board, board=>board.comment, {eager:true})
    board:Board;
}