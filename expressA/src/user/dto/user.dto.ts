import { IsNotEmpty, IsString } from "class-validator";

export class userDto {
    @IsString()
    @IsNotEmpty()
    role:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    name: string;
}