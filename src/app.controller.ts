import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async main() {
    return 'Nothing interesting here...';
  }

  @Get('/doc')
  async doc() {
    return 'Doc...';
  }
}
