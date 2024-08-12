import { Test, TestingModule } from '@nestjs/testing';
import { ContaService } from '../src/services/conta.service';
import { TipoConta } from '../src/enum/tipoDeConta';
import { ContaCorrente } from '../src/models/contaCorrente.model';
import { ContaPoupanca } from '../src/models/contaPoupanca.model';

describe('ContaService', () => {
  let contaService: ContaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaService],
    }).compile();

    contaService = module.get<ContaService>(ContaService);
  });

  it('deve criar uma conta corrente com os parâmetros corretos e retornar a conta criada', () => {
    const id = 1;
    const saldo = 1000;
    const clienteId = 101;
    const chequeEspecial = 500;

    const conta = contaService.criarConta(
      TipoConta.ContaCorrente,
      id,
      saldo,
      clienteId,
      chequeEspecial,
    );

    expect(conta).toBeDefined();
    expect(conta.id).toBe(id);
    expect(conta.saldo).toBe(saldo);
    expect(conta.clienteId).toBe(clienteId);
    expect(conta.tipo).toBe(TipoConta.ContaCorrente);

    if (conta instanceof ContaCorrente) {
      expect(conta.chequeEspecial).toBe(chequeEspecial);
    }
  });

  it('deve criar uma conta poupança com os parâmetros corretos e retornar a conta criada', () => {
    const id = 2;
    const saldo = 2000;
    const clienteId = 102;
    const rendimentoMensal = 0.05;

    const conta = contaService.criarConta(
      TipoConta.ContaPoupanca,
      id,
      saldo,
      clienteId,
      undefined,
      rendimentoMensal,
    );

    expect(conta).toBeDefined();
    expect(conta.id).toBe(id);
    expect(conta.saldo).toBe(saldo);
    expect(conta.clienteId).toBe(clienteId);
    expect(conta.tipo).toBe(TipoConta.ContaPoupanca);

    if (conta instanceof ContaPoupanca) {
      expect(conta.rendimentoMensal).toBe(rendimentoMensal);
    }
  });

  it('deve lançar um erro com uma mensagem específica quando um tipo de conta não suportado é fornecido', () => {
    const tipoNaoSuportado = 'ContaNaoSuportada' as TipoConta;
    const erroEsperado = `Tipo de conta não suportado: ${tipoNaoSuportado}`;

    expect(() =>
      contaService.criarConta(tipoNaoSuportado, 3, 1000, 103),
    ).toThrowError(erroEsperado);
});

  });

