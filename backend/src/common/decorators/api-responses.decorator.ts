import { applyDecorators } from '@nestjs/common';
import {
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiStandardResponses() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Requisição inválida - Dados enviados estão incorretos',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: {
            type: 'array',
            items: { type: 'string' },
            example: ['email must be an email'],
          },
          error: { type: 'string', example: 'Bad Request' },
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Não autorizado - Token inválido ou ausente',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Recurso não encontrado',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'Registro não encontrado' },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Erro interno do servidor',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 500 },
          message: { type: 'string', example: 'Internal server error' },
        },
      },
    }),
  );
}

