export class Achievement {
  id?: string;
  name: string;
  description: string;
  category: string;
  iconUrl?: string;
  points: number;
  rarity: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserAchievement {
  id?: string;
  userId: string;
  achievementId: string;
  claimedAt?: Date;
  user?: any;
  achievement?: Achievement;
}

