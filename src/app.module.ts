import { Module } from '@nestjs/common';
import { ContaController } from './controllers/conta.controller';
import { ContaService } from './services/conta.service';
import { ClienteModule } from './modules/cliente.module';
import { GerenteModule } from './modules/gerente.module';

@Module({
  imports: [ClienteModule, GerenteModule],
  controllers: [ContaController],
  providers: [ContaService],
})
export class AppModule {}
