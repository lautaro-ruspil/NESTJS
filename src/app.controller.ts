import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Trabaja sobre la ruta base
export class AppController {
  constructor(private readonly appService: AppService) {}
}
