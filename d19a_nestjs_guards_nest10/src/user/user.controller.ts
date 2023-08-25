import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserResponse } from '../interfaces/user';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}
  @Post('/register')
  async register(@Body() newUser: RegisterDto): Promise<RegisterUserResponse> {
    return await this.userService.register(newUser);
  }
}
