import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/User/entities/user.entities';
import { AchievementService } from './achievement.service';
import { ClaimAchievementResponseDto } from './dto/claim-achievement-response.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@ApiTags('achievements')
@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os emblemas disponíveis',
    description: 'Retorna a lista completa de emblemas cadastrados no sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de emblemas retornada com sucesso',
  })
  findAll() {
    return this.achievementService.findAll();
  }

  @Get('category/:category')
  @ApiOperation({
    summary: 'Listar emblemas por categoria',
    description: 'Retorna emblemas filtrados por categoria (BRONZE, PRATA, GOLD)',
  })
  @ApiResponse({
    status: 200,
    description: 'Emblemas da categoria retornados com sucesso',
  })
  findByCategory(@Param('category') category: string) {
    return this.achievementService.findByCategory(category);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um emblema específico',
    description: 'Retorna os detalhes completos de um emblema pelo ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Emblema encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Emblema não encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.achievementService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Criar novo emblema',
    description: 'Cria um novo emblema no sistema (apenas administradores)',
  })
  @ApiResponse({
    status: 201,
    description: 'Emblema criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  create(@Body() dto: CreateAchievementDto) {
    return this.achievementService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Editar emblema',
    description: 'Atualiza as informações de um emblema (apenas administradores)',
  })
  @ApiResponse({
    status: 200,
    description: 'Emblema atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Emblema não encontrado',
  })
  update(@Param('id') id: string, @Body() dto: UpdateAchievementDto) {
    return this.achievementService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar emblema',
    description: 'Remove um emblema do sistema (apenas administradores)',
  })
  @ApiResponse({
    status: 204,
    description: 'Emblema deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Emblema não encontrado',
  })
  delete(@Param('id') id: string) {
    return this.achievementService.delete(id);
  }

  // User Achievement Endpoints
  @Post('claim')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Resgatar um emblema aleatório',
    description:
      'Resgata um emblema aleatório que o usuário ainda não possui. Retorna erro se todos os emblemas já foram resgatados.',
  })
  @ApiResponse({
    status: 201,
    description: 'Emblema resgatado com sucesso',
    type: ClaimAchievementResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Todos os emblemas já foram resgatados',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum emblema disponível no sistema',
  })
  claimRandom(@LoggedUser() user: User) {
    return this.achievementService.claimRandomAchievement(user.id);
  }

  @Get('user/me')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Listar meus emblemas resgatados',
    description:
      'Retorna todos os emblemas que o usuário autenticado já resgatou. Pode ser filtrado por categoria.',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filtrar por categoria (BRONZE, PRATA, GOLD)',
    enum: ['BRONZE', 'PRATA', 'GOLD'],
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de emblemas do usuário',
  })
  getMyAchievements(
    @LoggedUser() user: User,
    @Query('category') category?: string,
  ) {
    if (category) {
      return this.achievementService.getUserAchievementsByCategory(
        user.id,
        category,
      );
    }
    return this.achievementService.getUserAchievements(user.id);
  }

  @Get('user/me/stats')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Ver minhas estatísticas',
    description:
      'Retorna estatísticas detalhadas: total de emblemas, por categoria, pontos acumulados, etc.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas do usuário',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number', example: 5 },
        totalAvailable: { type: 'number', example: 15 },
        percentage: { type: 'number', example: 33 },
        byCategory: {
          type: 'object',
          properties: {
            bronze: { type: 'number', example: 3 },
            prata: { type: 'number', example: 2 },
            gold: { type: 'number', example: 0 },
          },
        },
        totalPoints: { type: 'number', example: 125 },
      },
    },
  })
  getMyStats(@LoggedUser() user: User) {
    return this.achievementService.getUserStats(user.id);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Listar emblemas de um usuário',
    description: 'Retorna todos os emblemas resgatados por um usuário específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de emblemas do usuário',
  })
  getUserAchievements(@Param('userId') userId: string) {
    return this.achievementService.getUserAchievements(userId);
  }

  @Get('user/:userId/stats')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Ver estatísticas de um usuário',
    description: 'Retorna as estatísticas de emblemas de um usuário específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas do usuário',
  })
  getUserStats(@Param('userId') userId: string) {
    return this.achievementService.getUserStats(userId);
  }
}

