import { Cliente } from "./cliente/cliente";
import { ContaCorrente, ContaPoupanca } from "./contas/contas";
import { Agencia } from "./agencia/agencia";
import { realizarTransferencia } from "./servicos/transacoes";


const cliente1 = new Cliente('001', 'Nayla da Silva', 'Rua F, 859', '0000-0000');
const cliente2 = new Cliente('002', 'Adélia Franco', 'Rua Lázaro, 1035', '1234-1234');

// Criando uma agência e adicionando clientes
const agencia = new Agencia();
agencia.adicionarCliente(cliente1);
agencia.adicionarCliente(cliente2);

// Criando contas
const contaCorrente1 = new ContaCorrente ("001",cliente1, 200 );
const contaPoupanca1 = new ContaPoupanca("002", cliente2, 150);

// Realizando operações
contaCorrente1.depositar(800);
contaCorrente1.sacar(100);
realizarTransferencia(contaCorrente1, contaPoupanca1, 100);
contaPoupanca1.aplicarJuros();