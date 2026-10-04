import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

    async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
      // 1. Buscamos primero al usuario para obtener su ID primario
      const user = await this.userRepository.findOne({ where: { userEmail } });

      if (!user) {
        throw new NotFoundException(`El usuario con el correo ${userEmail} no existe`);
      }

      // 2. Precaramos los datos pasando el ID primario del usuario
      const newUserData = await this.userRepository.preload({
        userId: user.userId, // Usa la clave primaria exacta definida en user.entity.ts
        ...updateUserDto
      });

      if (!newUserData) {
        throw new NotFoundException("No se pudieron precargar los datos del usuario");
      }

      // 3. Guardamos y retornamos los datos actualizados
      return await this.userRepository.save(newUserData);
    }

}
