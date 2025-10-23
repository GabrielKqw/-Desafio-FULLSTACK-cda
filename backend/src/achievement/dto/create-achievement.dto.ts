import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export enum AchievementCategory {
  BRONZE = 'BRONZE',
  PRATA = 'PRATA',
  GOLD = 'GOLD',
}

export enum Rarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export class CreateAchievementDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do emblema',
    example: 'Primeiro Passo',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do emblema',
    example: 'Complete seu primeiro desafio',
  })
  description: string;

  @IsEnum(AchievementCategory)
  @ApiProperty({
    description: 'Categoria do emblema',
    enum: AchievementCategory,
    example: AchievementCategory.BRONZE,
  })
  category: AchievementCategory;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'URL do ícone do emblema',
    example: 'https://exemplo.com/icone.png',
    required: false,
  })
  iconUrl?: string;

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: 'Pontos do emblema',
    example: 10,
    default: 0,
  })
  points: number;

  @IsEnum(Rarity)
  @ApiProperty({
    description: 'Raridade do emblema',
    enum: Rarity,
    example: Rarity.COMMON,
    default: Rarity.COMMON,
  })
  rarity: Rarity;
}

