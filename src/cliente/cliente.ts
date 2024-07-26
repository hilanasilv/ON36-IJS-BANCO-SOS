import { ContaBancaria } from "../contas/contas";

export interface InterfaceCliente {
    id: string;
    nome_completo: string;
    endereco: string;
    telefone: string;
    adicionarConta(conta: ContaBancaria): void;
    obterContas(): ContaBancaria[];
}

export class Cliente implements InterfaceCliente {
    private contas: ContaBancaria[] = [];

    constructor(
        public id: string,
        public nome_completo: string,
        public endereco: string,
        public telefone: string
    ) {}

    adicionarConta(conta: ContaBancaria): void {
        this.contas.push(conta);
    }

    obterContas(): ContaBancaria[] {
        return this.contas;
    }
}

