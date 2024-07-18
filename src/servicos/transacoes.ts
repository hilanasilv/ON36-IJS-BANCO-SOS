import { ContaBancaria } from "../contas/contas";

export function realizarTransferencia(contaOrigem: ContaBancaria, contaDestino: ContaBancaria, valor: number): void {
    contaOrigem.transferir(valor, contaDestino);
}
