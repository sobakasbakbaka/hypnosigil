import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new ConflictException(
          'Пользователь с таким Email уже существует',
        );
      }
      throw error;
    }
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async removeUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
