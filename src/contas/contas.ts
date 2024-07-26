import { Cliente } from "../cliente/cliente";

export abstract class ContaBancaria {
    private saldo: number = 0;

    constructor(
        private numeroConta: string,
        protected cliente: Cliente
    ) {
        cliente.adicionarConta(this);
    }

    getNumeroConta(): string {
        return this.numeroConta;
    }

    getSaldo(): number {
        return this.saldo;
    }

    depositar(valor: number): void {
        if (valor > 0) {
            this.saldo += valor;
            console.log(`O valor de R$${valor} foi depositado na conta ${this.numeroConta}.`);
        }
    }

    sacar(valor: number): void {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log(`O valor de R$${valor} foi sacado da conta ${this.numeroConta}.`);
        } else {
            console.log('Saldo insuficiente.');
        }
    }

    transferir(valor: number, contaDestino: ContaBancaria): void {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            contaDestino.depositar(valor);
            console.log(`O valor de R$${valor} foi transferido da conta ${this.numeroConta} para a conta ${contaDestino.getNumeroConta()}.`);
        } else {
            console.log('Saldo insuficiente.');
        }
    }
}

export class ContaCorrente extends ContaBancaria {
    constructor(
        numeroConta: string,
        cliente: Cliente,
        private limiteChequeEspecial: number
    ) {
        super(numeroConta, cliente);
    }

    sacar(valor: number): void {
        if (valor > 0 && valor <= this.getSaldo() + this.limiteChequeEspecial) {
            this.depositar(-valor);
            console.log(`O valor de R$${valor} foi depositado da conta ${this.getNumeroConta()} com uso do cheque especial.`);
        } else {
            console.log('Saldo insuficiente, mesmo com cheque especial.');
        }
    }
}

export class ContaPoupanca extends ContaBancaria {
    constructor(
        numeroConta: string,
        cliente: Cliente,
        private taxaJuros: number
    ) {
        super(numeroConta, cliente);
    }

    aplicarJuros(): void {
        const juros = this.getSaldo() * this.taxaJuros / 100;
        this.depositar(juros);
        console.log(`Aplicado juros de R$${juros} na conta ${this.getNumeroConta()}.`);
    }
}
