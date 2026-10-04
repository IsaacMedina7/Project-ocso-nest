import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      private jwtService: JwtService){}

    registerUser(CreateUserDto: CreateUserDto){
      CreateUserDto.userPassword = bcrypt.hashSync(CreateUserDto.userPassword, 5)
      return this.userRepository.save(CreateUserDto)
    }

    async loginUser(LoginUserDto: LoginUserDto){
      const user = await this.userRepository.findOne({
        where: {
          userEmail: LoginUserDto.userEmail
        }
      })
      if (!user) {
      throw new UnauthorizedException("No estás autorizado");
      }
      const match = await bcrypt.compare(LoginUserDto.userPassword, user.userPassword)
      if(!match) throw new UnauthorizedException("No estas autorizado");
      const payload = {
        userEmail: user.userEmail,
        userPassword: user.userPassword,
        userRoles: user.userRoles
      }
      const token = this.jwtService.sign(payload);
      return token
    }

}
