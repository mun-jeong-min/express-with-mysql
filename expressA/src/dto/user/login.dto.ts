import { IsNotEmpty, IsString } from "class-validator";

export class loginDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}