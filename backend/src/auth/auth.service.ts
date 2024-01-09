import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { login_dto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user, user_model } from './schema/user.schema';
import mongoose from 'mongoose';
import * as bcrypt from "bcrypt";
import {JwtService}  from "@nestjs/jwt"
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(user_model)
    private  userModel: mongoose.Model<user>,
  private jwtService: JwtService
  ){ }
  async register_user(CreateUserDto: CreateUserDto): Promise<{token : string, message : string }> {
    const { name, email, password } = CreateUserDto
    const userInfo = await this.userModel.findOne({ email })
    
    if (userInfo) {
      throw new ConflictException('Email already exisiting')
    }
    else {
      const new_user = await this.userModel.create({
        name: name.trim(),
        email: email.trim(),
        password : await bcrypt.hash(password, 9)
      })
      const token = await this.jwtService.sign({
        _id: new_user.id,
        name: new_user.name,
      })
      return{token,message : 'User registration succesful !'}
    }
 
  }

  async login_user(login_dto: login_dto) : Promise<{token : string, message : string }> {
    const { email, password } = login_dto
    const userInfo = await this.userModel.findOne({ email }).select('+password')
    if (userInfo) {
      const check_password = await bcrypt.compare(password, userInfo.password)
      if (check_password) {
             const token = await this.jwtService.sign({
        _id: userInfo.id,
        name: userInfo.name,
             })
        return{token,message:"User Login Succesful"}
      }
      else {
        throw new UnauthorizedException('Wrong Password')
      }
    }
    else {
      throw new NotFoundException('Account not found !')
    }
  }
}
