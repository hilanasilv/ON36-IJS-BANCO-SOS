import { ContaBancaria } from "../conta/conta.model";
import { TipoConta } from "../enums/tipoDeConta.enum";
import { Gerente } from "../gerente/gerente.model";

export class Cliente {
    constructor(public id: number, public nome: string, public contas: ContaBancaria[] = []) {}

    criarConta(tipo: TipoConta, saldo: number, gerente: Gerente): void {
        const novaConta = new ContaBancaria(tipo, saldo, gerente, { nome: this.nome, id: this.id });
        this.contas.push(novaConta);
    }

    alterarTipoConta(tipoContaAtual: TipoConta, novoTipoConta: TipoConta): void {
        const conta = this.contas.find(c => c.tipo === tipoContaAtual);
        if (conta) {
            conta.tipo = novoTipoConta;
        }
    }

    excluirConta(tipo: TipoConta): void {
        this.contas = this.contas.filter(c => c.tipo !== tipo);
    }
}
