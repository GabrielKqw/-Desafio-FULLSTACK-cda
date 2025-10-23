import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser uma string válida' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    minLength: 3,
    maxLength: 100,
  })
  name: string;

  @IsString({ message: 'O nickname deve ser uma string válida' })
  @MinLength(3, { message: 'O nickname deve ter no mínimo 3 caracteres' })
  @MaxLength(30, { message: 'O nickname deve ter no máximo 30 caracteres' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'O nickname deve conter apenas letras, números e underscore',
  })
  @ApiProperty({
    description: 'Nickname único do usuário (apenas letras, números e _)',
    example: 'joao_silva',
    minLength: 3,
    maxLength: 30,
  })
  nickname: string;

  @IsEmail({}, { message: 'Email inválido' })
  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@email.com',
  })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(50, { message: 'A senha deve ter no máximo 50 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número ou caractere especial',
  })
  @ApiProperty({
    description:
      'Senha de acesso (mínimo 6 caracteres, deve conter maiúscula, minúscula e número/especial)',
    example: 'Senha@123',
    minLength: 6,
    maxLength: 50,
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Confirmação da senha (deve ser igual à senha)',
    example: 'Senha@123',
  })
  confirmPassword: string;

  @IsString({ message: 'O CPF deve ser uma string válida' })
  @MinLength(11, { message: 'O CPF deve ter 11 dígitos' })
  @MaxLength(14, { message: 'O CPF deve ter no máximo 14 caracteres (com formatação)' })
  @Matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
    message: 'CPF inválido. Use o formato: 000.000.000-00 ou 00000000000',
  })
  @ApiProperty({
    description: 'CPF do usuário (apenas números ou formatado)',
    example: '123.456.789-00',
  })
  cpf: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'URL da imagem de perfil',
    example: 'https://exemplo.com/foto.jpg',
    required: false,
  })
  profileImage?: string;

  @IsOptional()
  @IsBoolean({ message: 'isAdmin deve ser um valor booleano' })
  @ApiProperty({
    description: 'Define se o usuário é administrador',
    example: false,
    default: false,
    required: false,
  })
  isAdmin?: boolean;
}
