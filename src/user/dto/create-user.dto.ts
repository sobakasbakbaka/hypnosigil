import { Role } from '@prisma/client';
import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  role: Role;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
