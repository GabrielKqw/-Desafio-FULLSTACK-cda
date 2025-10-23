import { PrismaClient, AchievementCategory, Rarity } from '@prisma/client';

export const achievement = async (prisma: PrismaClient) => {
  const achievements = [
    {
      name: 'Primeiro Passo',
      description: 'Complete seu primeiro registro na plataforma',
      category: AchievementCategory.BRONZE,
      points: 10,
      rarity: Rarity.COMMON,
      iconUrl: 'footsteps',
    },
    {
      name: 'Iniciante',
      description: 'Faça seu primeiro login no sistema',
      category: AchievementCategory.BRONZE,
      points: 10,
      rarity: Rarity.COMMON,
      iconUrl: 'rocket',
    },
    {
      name: 'Explorador',
      description: 'Explore todas as funcionalidades básicas',
      category: AchievementCategory.BRONZE,
      points: 15,
      rarity: Rarity.COMMON,
      iconUrl: 'compass',
    },
    {
      name: 'Persistente',
      description: 'Acesse a plataforma por 3 dias consecutivos',
      category: AchievementCategory.BRONZE,
      points: 20,
      rarity: Rarity.RARE,
      iconUrl: 'calendar',
    },
    {
      name: 'Curioso',
      description: 'Visualize todos os emblemas disponíveis',
      category: AchievementCategory.BRONZE,
      points: 10,
      rarity: Rarity.COMMON,
      iconUrl: 'search',
    },
    {
      name: 'Sociável',
      description: 'Complete seu perfil com foto e informações',
      category: AchievementCategory.BRONZE,
      points: 15,
      rarity: Rarity.COMMON,
      iconUrl: 'user-circle',
    },
    {
      name: 'Ativo',
      description: 'Realize 10 ações na plataforma',
      category: AchievementCategory.BRONZE,
      points: 20,
      rarity: Rarity.COMMON,
      iconUrl: 'zap',
    },
    {
      name: 'Pontual',
      description: 'Acesse a plataforma durante a semana',
      category: AchievementCategory.BRONZE,
      points: 15,
      rarity: Rarity.COMMON,
      iconUrl: 'clock',
    },
    
    {
      name: 'Colecionador',
      description: 'Resgate 5 emblemas diferentes',
      category: AchievementCategory.PRATA,
      points: 50,
      rarity: Rarity.RARE,
      iconUrl: 'award',
    },
    {
      name: 'Dedicado',
      description: 'Acesse a plataforma por 7 dias consecutivos',
      category: AchievementCategory.PRATA,
      points: 75,
      rarity: Rarity.RARE,
      iconUrl: 'target',
    },
    {
      name: 'Conquistador',
      description: 'Alcance 100 pontos em emblemas',
      category: AchievementCategory.PRATA,
      points: 100,
      rarity: Rarity.EPIC,
      iconUrl: 'trophy',
    },
    {
      name: 'Mestre Bronze',
      description: 'Colete todos os emblemas de bronze',
      category: AchievementCategory.PRATA,
      points: 80,
      rarity: Rarity.EPIC,
      iconUrl: 'medal',
    },
    {
      name: 'Perfeccionista',
      description: 'Complete 100% do seu perfil',
      category: AchievementCategory.PRATA,
      points: 60,
      rarity: Rarity.RARE,
      iconUrl: 'check-circle',
    },
    {
      name: 'Influente',
      description: 'Alcance destaque na comunidade',
      category: AchievementCategory.PRATA,
      points: 70,
      rarity: Rarity.RARE,
      iconUrl: 'star',
    },
    {
      name: 'Estrategista',
      description: 'Complete desafios complexos',
      category: AchievementCategory.PRATA,
      points: 90,
      rarity: Rarity.EPIC,
      iconUrl: 'brain',
    },
    {
      name: 'Resiliente',
      description: 'Supere 10 desafios difíceis',
      category: AchievementCategory.PRATA,
      points: 85,
      rarity: Rarity.EPIC,
      iconUrl: 'shield',
    },
    
    {
      name: 'Lenda',
      description: 'Resgate 20 emblemas diferentes',
      category: AchievementCategory.GOLD,
      points: 200,
      rarity: Rarity.LEGENDARY,
      iconUrl: 'crown',
    },
    {
      name: 'Campeão',
      description: 'Alcance 500 pontos em emblemas',
      category: AchievementCategory.GOLD,
      points: 250,
      rarity: Rarity.LEGENDARY,
      iconUrl: 'gem',
    },
    {
      name: 'Mestre Completo',
      description: 'Colete todos os emblemas disponíveis',
      category: AchievementCategory.GOLD,
      points: 500,
      rarity: Rarity.LEGENDARY,
      iconUrl: 'sparkles',
    },
    {
      name: 'Veterano',
      description: 'Acesse a plataforma por 30 dias consecutivos',
      category: AchievementCategory.GOLD,
      points: 300,
      rarity: Rarity.LEGENDARY,
      iconUrl: 'flame',
    },
    {
      name: 'Elite',
      description: 'Seja reconhecido entre os melhores usuários',
      category: AchievementCategory.GOLD,
      points: 400,
      rarity: Rarity.LEGENDARY,
      iconUrl: 'trending-up',
    },
    {
      name: 'Imortal',
      description: 'Alcance o nível máximo de pontuação',
      category: AchievementCategory.GOLD,
      points: 600,
      rarity: Rarity.LEGENDARY,
      iconUrl: 'infinity',
    },
    {
      name: 'Guardião',
      description: 'Proteja sua sequência por 60 dias',
      category: AchievementCategory.GOLD,
      points: 450,
      rarity: Rarity.LEGENDARY,
      iconUrl: 'shield-check',
    },
    {
      name: 'Visionário',
      description: 'Complete todos os desafios especiais',
      category: AchievementCategory.GOLD,
      points: 550,
      rarity: Rarity.LEGENDARY,
      iconUrl: 'eye',
    },
  ];

  for (const achievement of achievements) {
    const existing = await prisma.achievement.findFirst({
      where: { name: achievement.name },
    });

    if (!existing) {
      await prisma.achievement.create({
        data: achievement,
      });
    }
  }

  console.log('✅ Achievements seeded successfully!');
}

