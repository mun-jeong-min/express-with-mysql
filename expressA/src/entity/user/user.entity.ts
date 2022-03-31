import { group } from "console";
import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { Board } from "../board/board.entity";
import { Comment } from "../comment/comment.entity";
import { Group } from "../group/group.entity";

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

    @OneToMany(() => Board, board => board.user)
    board:Board[];
    
    @OneToMany(() => Comment, comment => comment.user)
    comment:Comment[];

    @ManyToOne(() => Group, group => group.user)
    group:Group;
}