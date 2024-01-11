"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register_user(CreateUserDto) {
        const { name, email, password } = CreateUserDto;
        const userInfo = await this.userModel.findOne({ email });
        if (userInfo) {
            throw new common_1.ConflictException('Email already exisiting');
        }
        else {
            const new_user = await this.userModel.create({
                name: name.trim(),
                email: email.trim(),
                password: await bcrypt.hash(password, 9)
            });
            const token = await this.jwtService.sign({
                _id: new_user.id,
                name: new_user.name,
            });
            return { token, message: 'User registration succesful !' };
        }
    }
    async login_user(login_dto) {
        const { email, password } = login_dto;
        const userInfo = await this.userModel.findOne({ email }).select('+password');
        if (userInfo) {
            const check_password = await bcrypt.compare(password, userInfo.password);
            if (check_password) {
                const token = await this.jwtService.sign({
                    _id: userInfo.id,
                    name: userInfo.name,
                });
                return { token, message: "User Login Succesful" };
            }
            else {
                throw new common_1.UnauthorizedException('Wrong Password');
            }
        }
        else {
            throw new common_1.NotFoundException('Account not found !');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.user_model)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map