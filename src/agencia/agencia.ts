import { Cliente } from "../cliente/cliente";
import { ContaBancaria } from "../contas/contas";

export class Agencia {
    private clientes: Cliente[] = [];

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
        console.log(`Cliente ${cliente.nome_completo} adicionado à agência.`);
    }

    obterClientes(): Cliente[] {
        return this.clientes;
    }
}
