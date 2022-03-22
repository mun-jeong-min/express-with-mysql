import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { Board } from "../board/board.entity";
import { Comment } from "../comment/comment.entity";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    role:string;

    @Column()
    password:string;

    @Column({ unique:true })
    name:string;

    @OneToMany(type => Board, board => board.user, {eager:true})
    board:Board[];

    @OneToMany(type => Comment, comment => comment.user, {eager: true})
    comment:Comment[];  
}   