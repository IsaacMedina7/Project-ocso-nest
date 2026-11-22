import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException, Query } from '@nestjs/common';
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
  constructor(private readonly authService: AuthService) { }

  @Post("register/:id")
  registerManager(@Query("role") role: string, @Body() CreateUserDto: CreateUserDto, @Param("id") id: string) {
    if (role === "manager") {
      return this.authService.registerManager(id, CreateUserDto)
    } else if (role === "employee") {
      return this.authService.registerEmployee(id, CreateUserDto)
    }
    throw new BadRequestException("Rol invalido");
  }

  @Post('login')
  async login(@Body() LoginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
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
  @Patch("/:id")
  updateUser(@Param('id') userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}
