import { Injectable, NotFoundException } from '@nestjs/common';
import { Gerente } from '../models/gerente.model';
import { Cliente } from '../models/cliente.model';

@Injectable()
export class GerenteService {
  private gerentes: Gerente[] = [];

  criarGerente(gerente: Gerente): Gerente {
    console.log('Criando gerente:', gerente);
    this.gerentes.push(gerente);
    console.log('Gerente após criação:', this.gerentes);
    return gerente;
  }

  buscarGerente(id: number): Gerente {
    console.log('Buscando gerente com id:', id);
    const gerente = this.gerentes.find(g => g.id === id);
    if (!gerente) {
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }
    return gerente;
  }

  buscarGerentes(): Gerente[] {
    console.log('Buscando todos os gerentes registrados');
    return this.gerentes;
  }

  atualizarGerente(id: number, gerenteAtualizado: Partial<Gerente>): Gerente {
    console.log(`Atualizando gerente com id ${id}:`, gerenteAtualizado);
    const gerente = this.buscarGerente(id);
    Object.assign(gerente, gerenteAtualizado);
    return gerente;
  }

  deletarGerente(id: number): { message: string } {
    console.log(`Iniciando exclusão do gerente com id: ${id}`);
    const gerenteIndex = this.gerentes.findIndex(g => g.id === id);

    if (gerenteIndex === -1) {
      console.log(`Gerente com ID ${id} não encontrado.`);
      throw new NotFoundException(`Gerente com ID ${id} não encontrado.`);
    }

    this.gerentes.splice(gerenteIndex, 1); // Remove o gerente do array
    console.log(`Gerente com ID ${id} removido com sucesso.`);
    console.log('Gerentes após deleção:', this.gerentes);

    return { message: `Gerente com ID ${id} removido com sucesso.` };
  }
  

  adicionarClienteAoGerente(gerenteId: number, cliente: Cliente): Gerente {
    console.log(`Associando cliente ao gerente com ID ${gerenteId}:`, cliente);
    const gerente = this.buscarGerente(gerenteId);
    if (!gerente.clientes) {
      gerente.clientes = [];
    }
    gerente.clientes.push(cliente);
    return gerente;
  }
}
