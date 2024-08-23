import { Test, TestingModule } from '@nestjs/testing';
import { ContaController } from '../../src/controllers/conta.controller';
import { ContaService } from '../../src/services/conta.service';
import { TipoConta } from '../../src/enum/tipoDeConta';
import { Conta } from '../../src/models/conta.model';

describe('ContaController', () => {
  let contaController: ContaController;
  let contaService: ContaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaController],
      providers: [
        {
          provide: ContaService,
          useValue: {
            criarConta: jest.fn(),
            obterConta: jest.fn(),
            obterContas: jest.fn(),
            atualizarConta: jest.fn(),
            removerConta: jest.fn(),
            removerContasPorCliente: jest.fn(),
          },
        },
      ],
    }).compile();

    contaController = module.get<ContaController>(ContaController);
    contaService = module.get<ContaService>(ContaService);
  });

  it('deve ser definido', () => {
    expect(contaController).toBeDefined();
  });

  it('deve criar uma conta', () => {
    const novaConta: Conta = {
      id: 1,
      tipo: TipoConta.ContaCorrente,
      saldo: 1000,
      clienteId: 1,
    };
    jest.spyOn(contaService, 'criarConta').mockReturnValue(novaConta);

    const resultado = contaController.criarConta(
      TipoConta.ContaCorrente,
      1,
      1000,
      1,
      undefined,
      undefined,
    );

    expect(resultado).toEqual(novaConta);
    expect(contaService.criarConta).toHaveBeenCalledWith(
      TipoConta.ContaCorrente,
      1,
      1000,
      1,
      undefined,
      undefined,
    );
  });

  it('deve retornar uma conta pelo ID', () => {
    const conta: Conta = {
      id: 1,
      tipo: TipoConta.ContaPoupanca,
      saldo: 5000,
      clienteId: 2,
    };
    jest.spyOn(contaService, 'obterConta').mockReturnValue(conta);

    const resultado = contaController.obterConta(1);

    expect(resultado).toEqual(conta);
    expect(contaService.obterConta).toHaveBeenCalledWith(1);
  });

  it('deve atualizar uma conta', () => {
    const contaAtualizada: Conta = {
      id: 1,
      tipo: TipoConta.ContaPoupanca,
      saldo: 5000,
      clienteId: 1,
    };
    jest.spyOn(contaService, 'atualizarConta').mockReturnValue(contaAtualizada);

    const resultado = contaController.atualizarConta(1, TipoConta.ContaPoupanca);

    expect(resultado).toEqual(contaAtualizada);
    expect(contaService.atualizarConta).toHaveBeenCalledWith(1, TipoConta.ContaPoupanca);
  });

  it('deve remover uma conta', () => {
    const removerContaSpy = jest.spyOn(contaService, 'removerConta');

    const resultado = contaController.removerConta(1);

    expect(resultado).toEqual({ message: 'Conta removida com sucesso.' });
    expect(removerContaSpy).toHaveBeenCalledWith(1);
  });

  it('deve remover contas por cliente', () => {
    const removerContasPorClienteSpy = jest.spyOn(contaService, 'removerContasPorCliente');

    const resultado = contaController.removerContasPorCliente(1);

    expect(resultado).toEqual({ message: 'Contas removidas com sucesso.' });
    expect(removerContasPorClienteSpy).toHaveBeenCalledWith(1);
  });
});
