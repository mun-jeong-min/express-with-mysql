import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    id:string;

    @Column()
    password: string;

    @Column()
    name:string;
}