import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(baseUrl: string) {
    return {
      status: 'Server is running! 🚀',
      version: '1.0.0',
      docs: baseUrl + '/api',
      timestamp: new Date().toISOString(),
    };
  }

  healthCheck() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
