import { IsString, IsNotEmpty } from 'class-validator'

export class groupDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}