import { IsNotEmpty, IsString } from "class-validator";

export class commentDto {
    @IsNotEmpty()
    @IsString()
    script: string;
}