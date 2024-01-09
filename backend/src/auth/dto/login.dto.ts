import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class login_dto {
    @IsNotEmpty()
    @IsEmail({},{message:'Please provide a valid email adress.'})
    readonly email: string
    @IsNotEmpty()
    @MinLength(6)
    readonly password:string
}
