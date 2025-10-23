import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement, UserAchievement } from './entities/achievement.entity';

@Injectable()
export class AchievementService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAchievementDto): Promise<Achievement> {
    return this.prisma.achievement
      .create({ data: dto })
      .catch(this.handleError);
  }

  async findAll(): Promise<Achievement[]> {
    return this.prisma.achievement.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<Achievement> {
    const record = await this.prisma.achievement.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Emblema com o Id '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Achievement> {
    return this.findById(id);
  }

  async findByCategory(category: string): Promise<Achievement[]> {
    return this.prisma.achievement.findMany({
      where: { category: category as any },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, dto: UpdateAchievementDto): Promise<Achievement> {
    await this.findById(id);

    return this.prisma.achievement
      .update({
        where: { id },
        data: dto,
      })
      .catch(this.handleError);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.achievement
      .delete({
        where: { id },
      })
      .catch(this.handleError);
  }

  // User Achievement Methods
  async claimRandomAchievement(userId: string): Promise<UserAchievement> {
    // Buscar todos os emblemas
    const allAchievements = await this.prisma.achievement.findMany();

    if (allAchievements.length === 0) {
      throw new NotFoundException(
        'Nenhum emblema disponível para resgate. Por favor, execute o seed do banco de dados.',
      );
    }

    // Buscar emblemas já resgatados pelo usuário
    const userAchievements = await this.prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true },
    });

    const claimedAchievementIds = userAchievements.map(
      (ua) => ua.achievementId,
    );

    // Filtrar emblemas não resgatados
    const availableAchievements = allAchievements.filter(
      (achievement) => !claimedAchievementIds.includes(achievement.id),
    );

    if (availableAchievements.length === 0) {
      throw new BadRequestException(
        'Você já resgatou todos os emblemas disponíveis!',
      );
    }

    // Selecionar um emblema aleatório
    const randomIndex = Math.floor(
      Math.random() * availableAchievements.length,
    );
    const selectedAchievement = availableAchievements[randomIndex];

    // Criar o resgate
    const userAchievement = await this.prisma.userAchievement.create({
      data: {
        userId,
        achievementId: selectedAchievement.id,
      },
      include: {
        achievement: true,
      },
    });

    return userAchievement;
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return this.prisma.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
      },
      orderBy: {
        claimedAt: 'desc',
      },
    });
  }

  async getUserAchievementsByCategory(
    userId: string,
    category: string,
  ): Promise<UserAchievement[]> {
    return this.prisma.userAchievement.findMany({
      where: {
        userId,
        achievement: {
          category: category as any,
        },
      },
      include: {
        achievement: true,
      },
      orderBy: {
        claimedAt: 'desc',
      },
    });
  }

  async getUserStats(userId: string) {
    const totalAchievements = await this.prisma.achievement.count();
    const userAchievements = await this.prisma.userAchievement.count({
      where: { userId },
    });

    const bronzeCount = await this.prisma.userAchievement.count({
      where: {
        userId,
        achievement: { category: 'BRONZE' as any },
      },
    });

    const prataCount = await this.prisma.userAchievement.count({
      where: {
        userId,
        achievement: { category: 'PRATA' as any },
      },
    });

    const goldCount = await this.prisma.userAchievement.count({
      where: {
        userId,
        achievement: { category: 'GOLD' as any },
      },
    });

    const userAchievementsWithPoints = await this.prisma.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: {
          select: { points: true },
        },
      },
    });

    const totalPoints = userAchievementsWithPoints.reduce(
      (sum, ua) => sum + ua.achievement.points,
      0,
    );

    return {
      total: userAchievements,
      totalAvailable: totalAchievements,
      percentage: totalAchievements > 0 
        ? Math.round((userAchievements / totalAchievements) * 100) 
        : 0,
      byCategory: {
        bronze: bronzeCount,
        prata: prataCount,
        gold: goldCount,
      },
      totalPoints,
    };
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    
    if (!lastErrorLine) {
      console.error(error);
    }
    
    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}

