import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AchievementModule } from './achievement/achievement.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    AchievementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
