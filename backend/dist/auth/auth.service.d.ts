/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateUserDto } from './dto/register.dto';
import { login_dto } from './dto/login.dto';
import { user } from './schema/user.schema';
import mongoose from 'mongoose';
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: mongoose.Model<user>, jwtService: JwtService);
    register_user(CreateUserDto: CreateUserDto): Promise<{
        token: string;
        message: string;
    }>;
    login_user(login_dto: login_dto): Promise<{
        token: string;
        message: string;
    }>;
}
