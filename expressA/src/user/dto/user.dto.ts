import { IsNotEmpty, IsString } from "class-validator";

export class userDto {
    @IsString()
    @IsNotEmpty()
    id:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    name: string;
}