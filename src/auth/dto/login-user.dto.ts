import { IsEmail, IsString, MaxLength } from "class-validator";

export class LoginUserDto{
    @IsString()
    @IsEmail()
    userEmail: string;
    @IsString()
    @MaxLength(8)
    userPassword: string;

}