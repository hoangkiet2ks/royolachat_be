import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return { 
      status: 'ok', 
      message: 'Royola Chat Backend is running',
      timestamp: new Date().toISOString()
    }
  }

  @Get('health')
  checkHealth() {
    return { 
      status: 'healthy', 
      socketio: 'enabled',
      namespace: '/chat'
    }
  }
}
