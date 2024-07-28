import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GerenteModule } from './gerente/gerente.module';

@Module({
  imports: [GerenteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}