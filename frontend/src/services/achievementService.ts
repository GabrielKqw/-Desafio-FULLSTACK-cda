import Api from "./api";
import swal from "sweetalert";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: "BRONZE" | "PRATA" | "GOLD";
  iconUrl?: string;
  points: number;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  createdAt?: string;
  updatedAt?: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  claimedAt: string;
  achievement: Achievement;
}

export interface AchievementStats {
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

class AchievementService {
  /**
   * Lista todos os emblemas disponíveis
   */
  async getAllAchievements(): Promise<Achievement[]> {
    try {
      const response = await Api.get("/achievement");
      return response.data;
    } catch (error: any) {
      swal({
        title: "Erro",
        text: error.response?.data?.message || "Erro ao buscar emblemas",
        icon: "error",
        timer: 3000,
      });
      throw error;
    }
  }

  /**
   * Busca emblemas por categoria
   */
  async getAchievementsByCategory(
    category: "BRONZE" | "PRATA" | "GOLD"
  ): Promise<Achievement[]> {
    try {
      const response = await Api.get(`/achievement/category/${category}`);
      return response.data;
    } catch (error: any) {
      swal({
        title: "Erro",
        text: error.response?.data?.message || "Erro ao buscar emblemas",
        icon: "error",
        timer: 3000,
      });
      throw error;
    }
  }

  /**
   * Resgata um emblema aleatório
   */
  async claimRandomAchievement(): Promise<UserAchievement> {
    try {
      const response = await Api.post("/achievement/claim");
      swal({
        title: "Parabéns! 🎉",
        text: `Você resgatou: ${response.data.achievement.name}!`,
        icon: "success",
        timer: 4000,
      });
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Erro ao resgatar emblema. Tente novamente.";
      swal({
        title: "Ops!",
        text: message,
        icon: "warning",
        timer: 4000,
      });
      throw error;
    }
  }

  /**
   * Busca emblemas do usuário autenticado
   */
  async getMyAchievements(category?: string): Promise<UserAchievement[]> {
    try {
      const url = category
        ? `/achievement/user/me?category=${category}`
        : "/achievement/user/me";
      const response = await Api.get(url);
      return response.data;
    } catch (error: any) {
      swal({
        title: "Erro",
        text:
          error.response?.data?.message || "Erro ao buscar suas conquistas",
        icon: "error",
        timer: 3000,
      });
      throw error;
    }
  }

  /**
   * Busca estatísticas do usuário autenticado
   */
  async getMyStats(): Promise<AchievementStats> {
    try {
      const response = await Api.get("/achievement/user/me/stats");
      return response.data;
    } catch (error: any) {
      swal({
        title: "Erro",
        text:
          error.response?.data?.message || "Erro ao buscar suas estatísticas",
        icon: "error",
        timer: 3000,
      });
      throw error;
    }
  }

  /**
   * Busca emblemas de um usuário específico
   */
  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    try {
      const response = await Api.get(`/achievement/user/${userId}`);
      return response.data;
    } catch (error: any) {
      swal({
        title: "Erro",
        text: error.response?.data?.message || "Erro ao buscar conquistas",
        icon: "error",
        timer: 3000,
      });
      throw error;
    }
  }

  /**
   * Busca estatísticas de um usuário específico
   */
  async getUserStats(userId: string): Promise<AchievementStats> {
    try {
      const response = await Api.get(`/achievement/user/${userId}/stats`);
      return response.data;
    } catch (error: any) {
      swal({
        title: "Erro",
        text: error.response?.data?.message || "Erro ao buscar estatísticas",
        icon: "error",
        timer: 3000,
      });
      throw error;
    }
  }
}

export default new AchievementService();

