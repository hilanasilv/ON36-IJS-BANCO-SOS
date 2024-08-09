import { Module } from '@nestjs/common';
import { GerenteController } from './gerente.controller';
import { GerenteService } from './gerente.service';

@Module({
  controllers: [GerenteController],
  providers: [GerenteService],
  exports: [GerenteService]
})
export class GerenteModule {}
