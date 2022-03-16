import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Board } from "../../board/entity/board.entity";

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
}