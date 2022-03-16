import { IsNotEmpty, IsString } from "class-validator";

export class boardDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}