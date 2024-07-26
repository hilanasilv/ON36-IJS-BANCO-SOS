"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agencia = void 0;
class Agencia {
    constructor() {
        this.clientes = [];
    }
    adicionarCliente(cliente) {
        this.clientes.push(cliente);
        console.log(`Cliente ${cliente.nome_completo} adicionado à agência.`);
    }
    obterClientes() {
        return this.clientes;
    }
}
exports.Agencia = Agencia;
