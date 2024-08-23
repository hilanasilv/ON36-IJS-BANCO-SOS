import { Test, TestingModule } from '@nestjs/testing';
import { ContaService } from '../../src/services/conta.service';
import { TipoConta } from '../../src/enum/tipoDeConta';


describe('ContaService', () => {
  let contaService: ContaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaService],
    }).compile();

    contaService = module.get<ContaService>(ContaService);
    expect(contaService).toBeDefined();
  });

  it('deve criar uma conta corrente', () => {
    const conta = contaService.criarConta(
      TipoConta.ContaCorrente,
      1,
      1000,
      123,
      500
    );
    expect(conta).toBeDefined();
    expect(conta.tipo).toBe(TipoConta.ContaCorrente);
    expect(conta.saldo).toBe(1000);
    expect(conta.clienteId).toBe(123);
  });

  it('deve criar uma conta poupança', () => {
    const conta = contaService.criarConta(
      TipoConta.ContaPoupanca,
      2,
      2000,
      456,
      undefined,
      0.5
    );
    expect(conta).toBeDefined();
    expect(conta.tipo).toBe(TipoConta.ContaPoupanca);
    expect(conta.saldo).toBe(2000);
    expect(conta.clienteId).toBe(456);
  });

  it('deve obter uma conta por ID', () => {
    contaService.criarConta(
      TipoConta.ContaCorrente,
      3,
      1500,
      789
    );
    const contaObtida = contaService.obterConta(3);
    expect(contaObtida).toBeDefined();
    expect(contaObtida).toHaveProperty('id', 3);
    expect(contaObtida).toHaveProperty('saldo', 1500);
  });

  it('deve atualizar o tipo da conta', () => {
    contaService.criarConta(
      TipoConta.ContaCorrente,
      4,
      3000,
      101
    );
    const contaAtualizada = contaService.atualizarConta(4, TipoConta.ContaPoupanca);
    expect(contaAtualizada).toBeDefined();
    expect(contaAtualizada).toHaveProperty('tipo', TipoConta.ContaPoupanca);
    
    const contaVerificada = contaService.obterConta(4);
    expect(contaVerificada).toBeDefined();
    expect(contaVerificada).toHaveProperty('tipo', TipoConta.ContaPoupanca);
  });

  it('deve remover uma conta por ID', () => {
    contaService.criarConta(TipoConta.ContaCorrente, 5, 4000, 202);
    contaService.removerConta(5);
    expect(contaService.obterConta(5)).toBeUndefined();
  });

  it('deve remover todas as contas de um cliente', () => {
    contaService.criarConta(TipoConta.ContaCorrente, 6, 5000, 303);
    contaService.criarConta(TipoConta.ContaPoupanca, 7, 6000, 303);
    contaService.removerContasPorCliente(303);
    expect(contaService.obterContas().some(c => c.clienteId === 303)).toBeFalsy();
  });
});
