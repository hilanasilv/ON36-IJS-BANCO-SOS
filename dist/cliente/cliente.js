"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(id, nome_completo, endereco, telefone) {
        this.id = id;
        this.nome_completo = nome_completo;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = [];
    }
    adicionarConta(conta) {
        this.contas.push(conta);
    }
    obterContas() {
        return this.contas;
    }
}
exports.Cliente = Cliente;
