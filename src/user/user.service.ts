import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import config from 'src/common/config';
import { PrismaService } from 'src/common/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(
      createUserDto.password,
      config.BCRYPT_SALT,
    );
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { login } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ data: updateUserDto, where: { id } });
  }

  async remove(id: string): Promise<User | null> {
    return this.prisma.user.delete({ where: { id } });
  }
}