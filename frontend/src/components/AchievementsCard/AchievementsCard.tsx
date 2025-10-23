import React, { useEffect, useState } from "react";
import styled from "styled-components";
import achievementService from "../../services/achievementService";
import { getIcon } from "../../utils/iconMapper";

const Widget = styled.div`
  background: linear-gradient(135deg, #2d2d2d 0%, #252525 100%);
  border: 1px solid #3a3a3a;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const WidgetHeader = styled.div`
  background: linear-gradient(90deg, #F7931E 0%, #ff9d2e 100%);
  border-bottom: none;
  padding: 12px 20px;
  font-weight: 700;
  font-size: 13px;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const WidgetContent = styled.div`
  padding: 20px;
  background: rgba(35, 35, 35, 0.5);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #2a2a2a 0%, #222 100%);
  border: 2px solid #3a3a3a;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  
  &:hover {
    border-color: #F7931E;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(247, 147, 30, 0.2);
  }
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: #F7931E;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

const AchievementCard = styled.div`
  background: linear-gradient(135deg, #2a2a2a 0%, #222 100%);
  border: 2px solid #3a3a3a;
  padding: 20px;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
    border-color: #F7931E;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(247, 147, 30, 0.3);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: #F7931E;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  color: #000;
`;

const AchievementName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
`;

const AchievementDesc = styled.div`
  font-size: 12px;
  color: #bbb;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const AchievementFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #3a3a3a;
`;

const Points = styled.span`
  font-weight: 700;
  color: #F7931E;
  font-size: 13px;
`;

const BadgeGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Badge = styled.span<{ $color?: string }>`
  padding: 4px 8px;
  background: ${props => props.$color || '#2a2a2a'};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ClaimedDate = styled.div`
  font-size: 11px;
  color: #999;
  margin-top: 8px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 14px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #F7931E;
  font-size: 14px;
  font-weight: 700;
`;

interface UserAchievementData {
  id: string;
  userId: string;
  achievementId: string;
  claimedAt: string;
  achievement: {
    id: string;
    name: string;
    description: string;
    points: number;
    category: string;
    rarity: string;
    iconUrl: string;
  };
}

interface Stats {
  total: number;
  totalAvailable: number;
  percentage: number;
  byCategory: {
    bronze: number;
    prata: number;
    gold: number;
  };
  totalPoints: number;
}

const AchievementsCard: React.FC = () => {
  const [achievements, setAchievements] = useState<UserAchievementData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [achievementsData, statsData] = await Promise.all([
        achievementService.getMyAchievements(),
        achievementService.getMyStats(),
      ]);

      setAchievements(achievementsData || []);
      setStats(statsData || null);
    } catch (error) {
      console.error("Erro ao carregar conquistas:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "GOLD": return "#FFD700";
      case "PRATA": return "#C0C0C0";
      case "BRONZE": return "#CD7F32";
      default: return "#2a2a2a";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "LEGENDARY": return "#FF6B35";
      case "EPIC": return "#9C27B0";
      case "RARE": return "#2196F3";
      default: return "#4CAF50";
    }
  };

  if (loading) {
    return (
      <Widget>
        <WidgetHeader>Minhas Conquistas</WidgetHeader>
        <WidgetContent>
          <LoadingState>Carregando conquistas...</LoadingState>
        </WidgetContent>
      </Widget>
    );
  }

  return (
    <Widget>
      <WidgetHeader>Minhas Conquistas</WidgetHeader>
      <WidgetContent>
        {stats && (
          <StatsGrid>
            <StatCard>
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Conquistados</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.percentage}%</StatValue>
              <StatLabel>Progresso</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.totalPoints}</StatValue>
              <StatLabel>Pontos</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{stats.byCategory.bronze + stats.byCategory.prata + stats.byCategory.gold}</StatValue>
              <StatLabel>Total</StatLabel>
            </StatCard>
          </StatsGrid>
        )}

        {achievements.length === 0 ? (
          <EmptyState>
            Você ainda não conquistou nenhum emblema.
          </EmptyState>
        ) : (
          <AchievementsGrid>
            {achievements.map((userAchievement) => {
              const { achievement } = userAchievement;
              const Icon = getIcon(achievement.iconUrl);
              return (
                <AchievementCard key={userAchievement.id}>
                  <IconWrapper>
                    <Icon size={28} />
                  </IconWrapper>
                  <AchievementName>{achievement.name}</AchievementName>
                  <AchievementDesc>{achievement.description}</AchievementDesc>
                  <AchievementFooter>
                    <Points>{achievement.points} pts</Points>
                    <BadgeGroup>
                      <Badge $color={getCategoryColor(achievement.category)}>
                        {achievement.category}
                      </Badge>
                      <Badge $color={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </BadgeGroup>
                  </AchievementFooter>
                  <ClaimedDate>
                    {formatDate(userAchievement.claimedAt)}
                  </ClaimedDate>
                </AchievementCard>
              );
            })}
          </AchievementsGrid>
        )}
      </WidgetContent>
    </Widget>
  );
};

export default AchievementsCard;
