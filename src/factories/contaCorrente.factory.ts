import { ContaCorrente } from '../models/contaCorrente.model';

export class ContaCorrenteFactory {
    static criarContaCorrente(
      id: number,
      saldo: number,
      clienteId: number,
      chequeEspecial: number,
    ): ContaCorrente {
      return new ContaCorrente(id, saldo, clienteId, chequeEspecial);
    }
}