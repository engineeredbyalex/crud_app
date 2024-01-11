import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/register.dto';
import { login_dto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        token: string;
        message: string;
    }>;
    login(loginDto: login_dto): Promise<{
        token: string;
        message: string;
    }>;
}
