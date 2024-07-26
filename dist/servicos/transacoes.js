"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realizarTransferencia = realizarTransferencia;
function realizarTransferencia(contaOrigem, contaDestino, valor) {
    contaOrigem.transferir(valor, contaDestino);
}
