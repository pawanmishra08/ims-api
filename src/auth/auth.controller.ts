import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from 'src/helpers/public';
import { profile } from 'console';
import { request } from 'http';
import { user } from '@prisma/client';


interface AuthRequest extends Request {
  payload : user;
}


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }

 @Public()
 @Post("register")
  async register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto);
  }

 @Public()
  @Get('profile')
  async profile(@Req() request : AuthRequest ){
    const userId = request.payload?.id;
   return this.authService.getProfile( userId);
  }
}
