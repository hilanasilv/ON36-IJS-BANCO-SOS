import { TipoConta } from "../enums/tipoDeConta.enum";
import { Gerente } from "../gerente/gerente.model";

export class ContaBancaria {
    saldo: number;
    tipo: TipoConta;
    gerente: Gerente;
    proprietario: {
        nome: string;
        id: number;
    };

    constructor(tipo: TipoConta, saldo: number, gerente: Gerente, proprietario: { nome: string; id: number }) {
        this.saldo = saldo;
        this.tipo = tipo;
        this.gerente = gerente;
        this.proprietario = proprietario;
    }
}
