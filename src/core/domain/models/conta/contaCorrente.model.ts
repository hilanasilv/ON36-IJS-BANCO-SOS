import { Conta } from './conta.model';
import { TipoConta } from '../enum/tipoDeConta';

export class ContaCorrente extends Conta {
  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    public chequeEspecial: number,
    
  ) {
    super(id, TipoConta.ContaCorrente, saldo, clienteId);
  }
}

