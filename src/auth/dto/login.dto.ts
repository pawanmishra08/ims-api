import { isNotEmpty, IsNotEmpty, IsString, isString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    password: string;
}