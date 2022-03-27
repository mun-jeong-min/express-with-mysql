import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id:number;
}