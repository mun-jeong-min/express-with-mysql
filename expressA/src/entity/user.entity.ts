import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne} from "typeorm";
import { Board } from "./board.entity";

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
    board:Board;
}   