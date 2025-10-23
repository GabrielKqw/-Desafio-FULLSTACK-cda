import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { 
  Gift, 
  Grid, 
  LogOut, 
  Edit3, 
  Save,
  X,
  Award,
  TrendingUp
} from "lucide-react";
import Api from "../../services/api";
import { RoutesPath } from "../../routes";
import AchievementsCard from "../../components/AchievementsCard/AchievementsCard";
import swal from "sweetalert";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
  font-family: Arial, sans-serif;
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
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: #F7931E;
  letter-spacing: -1px;
`;

const UserStatus = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  background: #4CAF50;
  border-radius: 50%;
`;

const StatusText = styled.span`
  color: #fff;
  font-size: 13px;
  font-weight: 600;
`;

const MainContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileImage = styled.div<{ $src?: string }>`
  width: 120px;
  height: 120px;
  background: ${props => props.$src ? `url(${props.$src}) center/cover` : '#F7931E'};
  border: 3px solid #F7931E;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 900;
  color: #000;
`;

const ProfileName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
`;

const ProfileNickname = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 15px;
`;

const RankBadge = styled.div`
  background: #F7931E;
  color: #000;
  padding: 8px 20px;
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 1px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  width: 100%;
  background: ${props => {
    if (props.$variant === 'danger') return '#d32f2f';
    if (props.$variant === 'secondary') return '#2a2a2a';
    return '#F7931E';
  }};
  border: none;
  color: ${props => props.$variant === 'secondary' ? '#fff' : '#000'};
  padding: 12px;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #3a3a3a;
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.span`
  color: #bbb;
  font-size: 13px;
`;

const StatValue = styled.span`
  color: #F7931E;
  font-weight: 700;
  font-size: 14px;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const MenuItem = styled.button`
  background: linear-gradient(135deg, #2d2d2d 0%, #252525 100%);
  border: 2px solid #3a3a3a;
  padding: 40px 20px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #F7931E 0%, #ff9d2e 100%);
    border-color: #F7931E;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(247, 147, 30, 0.4);
    
    ${MenuIcon}, ${MenuLabel} {
      color: #000;
    }
  }
`;

const MenuIcon = styled.div`
  color: #F7931E;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
`;

const MenuLabel = styled.div`
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EditForm = styled.form`
  background: rgba(35, 35, 35, 0.8);
  border: 1px solid #3a3a3a;
  padding: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #F7931E;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  background: #1a1a1a;
  border: 2px solid #3a3a3a;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: #F7931E;
    background: #252525;
    box-shadow: 0 0 10px rgba(247, 147, 30, 0.2);
  }
`;

const FormActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 30px;
`;

const LoadingScreen = styled.div`
  position: fixed;
  inset: 0;
  background: #0d0d0d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const LoadingText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #F7931E;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

interface UserProfile {
  name: string;
  nickname: string;
  rank: string;
  profileImage?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchUserProfile();
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const achievementService = await import("../../services/achievementService");
      const statsData = await achievementService.default.getMyStats();
      setStats(statsData);
    } catch (error) {
      console.error("Erro ao carregar stats:", error);
    }
  };

  const calculateRank = (points: number) => {
    if (points >= 1000) return "DIAMANTE";
    if (points >= 500) return "PLATINA";
    if (points >= 300) return "OURO";
    if (points >= 150) return "PRATA";
    if (points >= 50) return "BRONZE";
    return "INICIANTE";
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const jwt = localStorage.getItem("jwt");
      const userId = localStorage.getItem("userId");

      if (!jwt || !userId) {
        navigate(RoutesPath.LOGIN);
        return;
      }

      const response = await Api.get(`/user/${userId}`);
      const { name, nickname, rank, profileImage } = response.data;

      const profile = { name, nickname, rank, profileImage };
      setUserProfile(profile);
      setFormData(profile);
    } catch (error) {
      navigate(RoutesPath.LOGIN);
    } finally {
      setLoading(false);
    }
  };

  const handleReceiveAchievement = async () => {
    try {
      const achievementService = await import("../../services/achievementService");
      await achievementService.default.claimRandomAchievement();
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const updatedData = {
        name: formData?.name || "",
        nickname: formData?.nickname || "",
        profileImage: formData?.profileImage || "",
      };

      await Api.patch(`/user/${userId}`, updatedData);
      setUserProfile({ ...userProfile!, ...updatedData });
      setIsEditing(false);
      swal("Sucesso", "Perfil atualizado", "success");
    } catch (error) {
      swal("Erro", "Falha ao atualizar", "error");
    }
  };

  if (loading) {
    return (
      <LoadingScreen>
        <LoadingText>Carregando...</LoadingText>
      </LoadingScreen>
    );
  }

  if (!userProfile) return null;

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo>CDA SOCIAL CLUB</Logo>
          <UserStatus>
            <StatusDot />
            <StatusText>ONLINE</StatusText>
          </UserStatus>
        </HeaderContent>
      </Header>

      <MainContainer>
        <Sidebar>
          <Widget>
            <WidgetHeader>Minha Conta</WidgetHeader>
            <WidgetContent>
              {!isEditing ? (
                <ProfileCard>
                  <ProfileImage $src={userProfile.profileImage}>
                    {!userProfile.profileImage && userProfile.name[0].toUpperCase()}
                  </ProfileImage>
                  <ProfileName>{userProfile.name}</ProfileName>
                  <ProfileNickname>@{userProfile.nickname}</ProfileNickname>
                  <RankBadge>
                    {stats ? calculateRank(stats.totalPoints) : "CARREGANDO..."}
                  </RankBadge>
                  
                  <ActionButton onClick={() => setIsEditing(true)}>
                    <Edit3 size={16} />
                    Editar Perfil
                  </ActionButton>
                  
                  <ActionButton $variant="danger" onClick={() => {
                    localStorage.clear();
                    navigate(RoutesPath.LOGIN);
                  }}>
                    <LogOut size={16} />
                    Sair
                  </ActionButton>
                </ProfileCard>
              ) : (
                <EditForm onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Nome Completo</Label>
                    <Input
                      type="text"
                      value={formData?.name || ""}
                      onChange={(e) =>
                        setFormData((prev) => prev ? { ...prev, name: e.target.value } : null)
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Nickname</Label>
                    <Input
                      type="text"
                      value={formData?.nickname || ""}
                      onChange={(e) =>
                        setFormData((prev) => prev ? { ...prev, nickname: e.target.value } : null)
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>URL da Imagem</Label>
                    <Input
                      type="text"
                      value={formData?.profileImage || ""}
                      onChange={(e) =>
                        setFormData((prev) => prev ? { ...prev, profileImage: e.target.value } : null)
                      }
                    />
                  </FormGroup>

                  <FormActions>
                    <ActionButton type="submit">
                      <Save size={16} />
                      Salvar
                    </ActionButton>
                    <ActionButton $variant="secondary" type="button" onClick={() => {
                      setFormData(userProfile);
                      setIsEditing(false);
                    }}>
                      <X size={16} />
                      Cancelar
                    </ActionButton>
                  </FormActions>
                </EditForm>
              )}
            </WidgetContent>
          </Widget>

          <Widget>
            <WidgetHeader>Estatísticas</WidgetHeader>
            <WidgetContent>
              <StatItem>
                <StatLabel>Emblemas Conquistados</StatLabel>
                <StatValue>{stats?.total || 0}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Pontos Totais</StatLabel>
                <StatValue>{stats?.totalPoints || 0}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Progresso</StatLabel>
                <StatValue>{stats?.percentage || 0}%</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Próximo Rank</StatLabel>
                <StatValue>
                  {stats && stats.totalPoints < 50 ? "BRONZE (50 pts)" :
                   stats && stats.totalPoints < 150 ? "PRATA (150 pts)" :
                   stats && stats.totalPoints < 300 ? "OURO (300 pts)" :
                   stats && stats.totalPoints < 500 ? "PLATINA (500 pts)" :
                   stats && stats.totalPoints < 1000 ? "DIAMANTE (1000 pts)" :
                   "RANK MÁXIMO"}
                </StatValue>
              </StatItem>
            </WidgetContent>
          </Widget>
        </Sidebar>

        <ContentArea>
          {!isEditing && (
            <>
              <Widget>
                <WidgetHeader>Menu Principal</WidgetHeader>
                <WidgetContent>
                  <MenuGrid>
                    <MenuItem onClick={handleReceiveAchievement}>
                      <MenuIcon>
                        <Gift size={40} />
                      </MenuIcon>
                      <MenuLabel>Resgatar Emblema</MenuLabel>
                    </MenuItem>
                    
                    <MenuItem onClick={() => navigate(RoutesPath.ALL_ACHIEVEMENTS)}>
                      <MenuIcon>
                        <Grid size={40} />
                      </MenuIcon>
                      <MenuLabel>Ver Todos</MenuLabel>
                    </MenuItem>
                    
                    <MenuItem>
                      <MenuIcon>
                        <Award size={40} />
                      </MenuIcon>
                      <MenuLabel>Minhas Conquistas</MenuLabel>
                    </MenuItem>
                  </MenuGrid>
                </WidgetContent>
              </Widget>

              <AchievementsCard />
            </>
          )}
        </ContentArea>
      </MainContainer>
    </Container>
  );
};

export default Dashboard;
