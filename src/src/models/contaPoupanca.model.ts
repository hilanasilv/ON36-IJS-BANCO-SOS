import { TipoConta } from '../enum/tipoDeConta';
import { Conta } from './conta.model';

export class ContaPoupanca extends Conta {
  constructor(
    id: number,
    saldo: number,
    clienteId: number,
    public rendimentoMensal: number,
  ) {
    super(id, TipoConta.ContaPoupanca, saldo, clienteId);
  }
}