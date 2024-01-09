import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { login_dto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('/user/register')
async register(@Body() createUserDto: CreateUserDto): Promise<{ token: string, message: string }> {
  return await this.authService.register_user(createUserDto);
}

@Post('/user/login')
async login(@Body() loginDto: login_dto): Promise<{ token: string, message: string }> {
  return await this.authService.login_user(loginDto);
}
}
