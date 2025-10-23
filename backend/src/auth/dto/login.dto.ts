import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'usuario@email.com',
  })
  email: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Senha@123',
    minLength: 6,
  })
  password: string;
}

