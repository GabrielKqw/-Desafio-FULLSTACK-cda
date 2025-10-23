import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";
import achievementService, { Achievement } from "../../services/achievementService";
import { RoutesPath } from "../../routes";
import { getIcon } from "../../utils/iconMapper";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
`;

const Header = styled.div`
  background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
  border-bottom: 3px solid #F7931E;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const BackButton = styled.button`
  background: #F7931E;
  border: none;
  color: #000;
  padding: 10px 20px;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: #F7931E;
  letter-spacing: -1px;
`;

const MainContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 900;
  color: #fff;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: -0.5px;
`;

const PageSubtitle = styled.p`
  font-size: 14px;
  color: #999;
  margin: 0 0 30px 0;
`;

const FilterBar = styled.div`
  background: linear-gradient(135deg, #2d2d2d 0%, #252525 100%);
  border: 2px solid #3a3a3a;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const FilterLabel = styled.div`
  color: #F7931E;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 15px;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'linear-gradient(90deg, #F7931E 0%, #ff9d2e 100%)' : '#2a2a2a'};
  border: 2px solid ${props => props.$active ? '#F7931E' : '#3a3a3a'};
  color: ${props => props.$active ? '#000' : '#fff'};
  padding: 10px 20px;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(247, 147, 30, 0.3)' : 'none'};
  
  &:hover {
    background: ${props => props.$active ? 'linear-gradient(90deg, #ff9d2e 0%, #F7931E 100%)' : '#333'};
    border-color: #F7931E;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: linear-gradient(135deg, #2d2d2d 0%, #252525 100%);
  border: 2px solid #3a3a3a;
  padding: 25px;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
    border-color: #F7931E;
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(247, 147, 30, 0.3);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: #F7931E;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  color: #000;
`;

const CardName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px 0;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const Badge = styled.span<{ $color?: string }>`
  padding: 4px 10px;
  background: ${props => props.$color || '#2a2a2a'};
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardDesc = styled.p`
  font-size: 13px;
  color: #bbb;
  line-height: 1.5;
  margin: 0 0 15px 0;
`;

const Points = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #F7931E;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const LoadingText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #F7931E;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
`;

const AllAchievements: React.FC = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      navigate(RoutesPath.LOGIN);
      return;
    }

    loadAchievements();
  }, []);

  useEffect(() => {
    filterAchievements();
  }, [filter, achievements]);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      const data = await achievementService.getAllAchievements();
      setAchievements(data);
    } catch (error) {
      console.error("Erro ao carregar emblemas:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAchievements = () => {
    if (filter === "ALL") {
      setFilteredAchievements(achievements);
    } else {
      setFilteredAchievements(
        achievements.filter((a) => a.category === filter)
      );
    }
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

  const getCategoryCount = (category: string) => {
    return achievements.filter((a) => a.category === category).length;
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <Logo>CDA SOCIAL CLUB</Logo>
          </HeaderContent>
        </Header>
        <LoadingContainer>
          <LoadingText>Carregando...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onClick={() => navigate(RoutesPath.DASHBOARD)}>
            <ArrowLeft size={16} />
            Voltar
          </BackButton>
          <Logo>CDA SOCIAL CLUB</Logo>
        </HeaderContent>
      </Header>

      <MainContainer>
        <PageTitle>Todos os Emblemas</PageTitle>
        <PageSubtitle>
          Explore todos os {achievements.length} emblemas disponíveis
        </PageSubtitle>

        <FilterBar>
          <FilterLabel>Filtrar por Categoria</FilterLabel>
          <FilterButtons>
            <FilterButton
              $active={filter === "ALL"}
              onClick={() => setFilter("ALL")}
            >
              Todos ({achievements.length})
            </FilterButton>
            <FilterButton
              $active={filter === "BRONZE"}
              onClick={() => setFilter("BRONZE")}
            >
              Bronze ({getCategoryCount("BRONZE")})
            </FilterButton>
            <FilterButton
              $active={filter === "PRATA"}
              onClick={() => setFilter("PRATA")}
            >
              Prata ({getCategoryCount("PRATA")})
            </FilterButton>
            <FilterButton
              $active={filter === "GOLD"}
              onClick={() => setFilter("GOLD")}
            >
              Ouro ({getCategoryCount("GOLD")})
            </FilterButton>
          </FilterButtons>
        </FilterBar>

        {filteredAchievements.length === 0 ? (
          <EmptyState>
            <h2>Nenhum emblema encontrado</h2>
            <p>Tente alterar os filtros.</p>
          </EmptyState>
        ) : (
          <Grid>
            {filteredAchievements.map((achievement) => {
              const Icon = getIcon(achievement.iconUrl);
              return (
                <Card key={achievement.id}>
                  <IconWrapper>
                    <Icon size={32} />
                  </IconWrapper>
                  <CardName>{achievement.name}</CardName>
                  <BadgeRow>
                    <Badge $color={getCategoryColor(achievement.category)}>
                      {achievement.category}
                    </Badge>
                    <Badge $color={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                  </BadgeRow>
                  <CardDesc>{achievement.description}</CardDesc>
                  <Points>{achievement.points} pontos</Points>
                </Card>
              );
            })}
          </Grid>
        )}
      </MainContainer>
    </Container>
  );
};

export default AllAchievements;
