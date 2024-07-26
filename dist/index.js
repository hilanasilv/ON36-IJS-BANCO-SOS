"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = require("./cliente/cliente");
const contas_1 = require("./contas/contas");
const agencia_1 = require("./agencia/agencia");
const transacoes_1 = require("./servicos/transacoes");
const cliente1 = new cliente_1.Cliente('001', 'Nayla da Silva', 'Rua F, 859', '0000-0000');
const cliente2 = new cliente_1.Cliente('002', 'Adélia Franco', 'Rua Lázaro, 1035', '1234-1234');
// Criando uma agência e adicionando clientes
const agencia = new agencia_1.Agencia();
agencia.adicionarCliente(cliente1);
agencia.adicionarCliente(cliente2);
// Criando contas
const contaCorrente1 = new contas_1.ContaCorrente("001", cliente1, 200);
const contaPoupanca1 = new contas_1.ContaPoupanca("002", cliente2, 150);
// Realizando operações
contaCorrente1.depositar(800);
contaCorrente1.sacar(100);
(0, transacoes_1.realizarTransferencia)(contaCorrente1, contaPoupanca1, 100);
contaPoupanca1.aplicarJuros();
