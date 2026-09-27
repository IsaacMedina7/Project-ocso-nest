import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(
      @InjectRepository(User) private userRepository: Repository<User>
    ){}

    registerUser(CreateUserDto: CreateUserDto){
      CreateUserDto.userPassword = bcrypt.hashSync(CreateUserDto.userPassword, 5)
      return this.userRepository.save(CreateUserDto)
    }

    async loginUser(CreateUserDto: CreateUserDto){
      const user = await this.userRepository.findOne({
        where: {
          userEmail: CreateUserDto.userEmail
        }
      })
      if (!user) {
      throw new UnauthorizedException("No estás autorizado");
      }
      const match = await bcrypt.compare(CreateUserDto.userPassword, user.userPassword)
      if(!match) throw new UnauthorizedException("No estas autorizado");
      const token = jwt.sign(JSON.stringify(user), "SECRET KEY");
      return token
    }

}
