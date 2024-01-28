import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt'
import { IUser } from './IUser';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private readonly SALT_OR_ROUND = 10;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ){}
  
  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email)
    if(user){
      throw new ConflictException({
        message: 'user already exists'
      })
    }
    return await this.prismaService.users.create({
      data: {...createUserDto, password: this.encriptPassword(createUserDto.password)},
      select: {
        name: true,
        id: true,
      }
    })
  }

  async login(user: IUser){
    return {
      id: user.id,
      name: user.name,
      token: this.jwtService.sign({sub: user.id, name: user.name})
    }
  }

  async findOne(id: number) {
    return await this.prismaService.users.findUnique({
      where: {
        id
      },
      select: {
        email: true,
        name: true,
        id: true,
      }
    });
  }

  async validateUser(email: string, password: string){
    const user = await this.findByEmail(email)
    if(!user){
      return undefined
    }
    const isValidPassword = this.comparePassword(password, user.password)
    if(!isValidPassword){
      return undefined
    }
    return user     
  }

  async findByEmail(email: string){
    return await this.prismaService.users.findUnique({
      where: {
        email
      }
    })
  }

  encriptPassword(password: string){
    return bcrypt.hashSync(password, this.SALT_OR_ROUND)
  }

  comparePassword(password: string, hash: string){
    return bcrypt.compareSync(password, hash)
  }
}
