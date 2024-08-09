import { TipoConta } from "../enum/tipoDeConta";

export class Conta {
  constructor(
    public id: number,
    public tipo: TipoConta,
    public saldo: number,
    public clienteId: number,
  ) {}
}