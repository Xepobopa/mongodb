import { IsEmail, IsString, IsStrongPassword, Min } from "class-validator";

export class UserDto {
    @IsString()
    @Min(3)
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 5,
        minUppercase: 1,
        minSymbols: 1
    })
    password: string;
}