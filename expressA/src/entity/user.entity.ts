import { Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";

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