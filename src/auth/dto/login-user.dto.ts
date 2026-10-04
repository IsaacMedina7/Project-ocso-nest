import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class LoginUserDto{
    @ApiProperty({
            default: "user@gmail.com"
        })
    @IsString()
    @IsEmail()
    userEmail: string;

    @ApiProperty({
        default: "123267t7gdyg6g"
    })
    @IsString()
    @MaxLength(8)
    userPassword: string;

}