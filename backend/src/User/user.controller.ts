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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entities';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Listar todos os usuários',
    description: 'Lista todos os usuários cadastrados (apenas administradores)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado - apenas administradores',
  })
  findAll(@LoggedUser() user: User): Promise<User[]> {
    return this.userService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Visualizar usuário específico',
    description: 'Retorna os dados de um usuário pelo ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar novo usuário',
    description:
      'Registra um novo usuário na plataforma. Não requer autenticação.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou CPF já cadastrado',
  })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Editar informações do usuário',
    description:
      'Atualiza as informações de um usuário. Todos os campos são opcionais.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar usuário',
    description: 'Remove um usuário do sistema',
  })
  @ApiResponse({
    status: 204,
    description: 'Usuário deletado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  delete(@Param('id') id: string) {
    this.userService.delete(id);
  }
}
