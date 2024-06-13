import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Usuário',
    example: 'tanjas',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Nickname do usuário',
    example: 'gabriel',
  })
  nickname: string;

  @IsString()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'gabrielkqw@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha de acesso do usuário',
    example: 'Gabs@1234',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha de login',
    example: 'Gabs@1234',
  })
  confirmPassword: string;

  @IsString()
  @MaxLength(15)
  @ApiProperty({
    description: 'CPF do usuário',
    example: '48071261564',
  })
  cpf: string;

  @ApiProperty({
    description: 'Rank do usuário',
    example: 'BRONZE',
    default: 'BRONZE', // Define o valor padrão como 'BRONZE'
  })
  rank: string = 'BRONZE'; // Define o valor padrão como 'BRONZE'
  @IsUrl()
  @ApiProperty({
    description: 'Imagem de perfil',
    example: 'https://i.pinimg.com/280x280_RS/ca/94/d0/ca94d0af95d038459ed4d6bfde48f6e7.jpg'
  })
  profileImage?: string;
  isAdmin: boolean;
}
