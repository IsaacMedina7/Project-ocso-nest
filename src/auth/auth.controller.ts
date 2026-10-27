import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiAuth } from './decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';

@ApiAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() CreateUserDto: CreateUserDto){
    return this.authService.registerUser(CreateUserDto)
  }

  @Post('login')
  async login(@Body() LoginUserDto: LoginUserDto, @Res({passthrough: true}) response: Response){
    const token = await this.authService.loginUser(LoginUserDto)
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      //expires: new Date().setDate()
    });
    return; 
  }
  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}
