"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaPoupanca = exports.ContaCorrente = exports.ContaBancaria = void 0;
class ContaBancaria {
    constructor(numeroConta, cliente) {
        this.numeroConta = numeroConta;
        this.cliente = cliente;
        this.saldo = 0;
        cliente.adicionarConta(this);
    }
    getNumeroConta() {
        return this.numeroConta;
    }
    getSaldo() {
        return this.saldo;
    }
    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
            console.log(`O valor de R$${valor} foi depositado na conta ${this.numeroConta}.`);
        }
    }
    sacar(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log(`O valor de R$${valor} foi sacado da conta ${this.numeroConta}.`);
        }
        else {
            console.log('Saldo insuficiente.');
        }
    }
    transferir(valor, contaDestino) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            contaDestino.depositar(valor);
            console.log(`O valor de R$${valor} foi transferido da conta ${this.numeroConta} para a conta ${contaDestino.getNumeroConta()}.`);
        }
        else {
            console.log('Saldo insuficiente.');
        }
    }
}
exports.ContaBancaria = ContaBancaria;
class ContaCorrente extends ContaBancaria {
    constructor(numeroConta, cliente, limiteChequeEspecial) {
        super(numeroConta, cliente);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }
    sacar(valor) {
        if (valor > 0 && valor <= this.getSaldo() + this.limiteChequeEspecial) {
            this.depositar(-valor);
            console.log(`O valor de R$${valor} foi depositado da conta ${this.getNumeroConta()} com uso do cheque especial.`);
        }
        else {
            console.log('Saldo insuficiente, mesmo com cheque especial.');
        }
    }
}
exports.ContaCorrente = ContaCorrente;
class ContaPoupanca extends ContaBancaria {
    constructor(numeroConta, cliente, taxaJuros) {
        super(numeroConta, cliente);
        this.taxaJuros = taxaJuros;
    }
    aplicarJuros() {
        const juros = this.getSaldo() * this.taxaJuros / 100;
        this.depositar(juros);
        console.log(`Aplicado juros de R$${juros} na conta ${this.getNumeroConta()}.`);
    }
}
exports.ContaPoupanca = ContaPoupanca;
