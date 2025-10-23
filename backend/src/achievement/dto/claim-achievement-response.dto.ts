import { ApiProperty } from '@nestjs/swagger';

export class ClaimAchievementResponseDto {
  @ApiProperty({
    description: 'ID do resgate',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  userId: string;

  @ApiProperty({
    description: 'ID do emblema',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  achievementId: string;

  @ApiProperty({
    description: 'Data e hora do resgate',
    example: '2024-06-15T10:30:00.000Z',
  })
  claimedAt: Date;

  @ApiProperty({
    description: 'Dados do emblema resgatado',
  })
  achievement: {
    id: string;
    name: string;
    description: string;
    category: string;
    iconUrl: string | null;
    points: number;
    rarity: string;
  };
}

