import { RegisterUserResponse } from '../interfaces/user';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register(newUser: RegisterDto): Promise<RegisterUserResponse>;
}
