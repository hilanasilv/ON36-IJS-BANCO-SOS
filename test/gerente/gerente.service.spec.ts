import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from '../../src/services/gerente.service';
import { Gerente } from '../../src/models/gerente.model';
import { Cliente } from '../../src/models/cliente.model';
import { NotFoundException } from '@nestjs/common';

describe('GerenteService', () => {
  let service: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenteService],
    }).compile();

    service = module.get<GerenteService>(GerenteService);
  });

  it('deve criar um gerente', () => {
    const gerente: Gerente = { id: 1, nome: 'João', clientes: [] };
    const resultado = service.criarGerente(gerente);

    expect(resultado).toEqual(gerente);
    expect(service.buscarGerentes()).toContain(gerente);
  });

  it('deve buscar um gerente pelo ID', () => {
    const gerente: Gerente = { id: 1, nome: 'João', clientes: [] };
    service.criarGerente(gerente);

    const resultado = service.buscarGerente(1);
    expect(resultado).toEqual(gerente);
  });

  it('deve lançar NotFoundException ao buscar um gerente inexistente', () => {
    expect(() => service.buscarGerente(999)).toThrow(NotFoundException);
  });

  it('deve atualizar um gerente', () => {
    const gerente: Gerente = { id: 1, nome: 'João', clientes: [] };
    service.criarGerente(gerente);

    const gerenteAtualizado = { nome: 'João Silva' };
    const resultado = service.atualizarGerente(1, gerenteAtualizado);

    expect(resultado?.nome).toBe('João Silva');
  });

  it('deve lançar NotFoundException ao tentar atualizar um gerente inexistente', () => {
    expect(() => service.atualizarGerente(999, { nome: 'João Silva' })).toThrow(NotFoundException);
  });

  it('deve deletar um gerente', () => {
    const gerente: Gerente = { id: 1, nome: 'João', clientes: [] };
    service.criarGerente(gerente);

    const resultado = service.deletarGerente(1);

    expect(resultado).toEqual({ message: 'Gerente com ID 1 removido com sucesso.' });
    expect(() => service.buscarGerente(1)).toThrow(NotFoundException);
  });

  it('deve lançar NotFoundException ao tentar deletar um gerente inexistente', () => {
    expect(() => service.deletarGerente(999)).toThrow(NotFoundException);
  });

  it('deve adicionar um cliente a um gerente', () => {
    const gerente: Gerente = { id: 1, nome: 'João', clientes: [] };
    const cliente: Cliente = {
        id: 1,
        nome: 'Marina',
        dataNascimento: '1990-01-01',
        email: 'marina@email.com',
        telefone: '123456789',
        endereco: 'Rua das Flores, 123',
        cidade: '',
        estado: '',
        cpf: '',
        rendaSalarial: 0,
        statusAtivo: false,
        conta: []
    };
    service.criarGerente(gerente);

    const resultado = service.adicionarClienteAoGerente(1, cliente);

    expect(resultado.clientes).toContain(cliente);
  });

  it('deve lançar NotFoundException ao tentar adicionar um cliente a um gerente inexistente', () => {
    const cliente: Cliente = {
        id: 1,
        nome: 'Marina',
        dataNascimento: '1990-01-01',
        email: 'marina@email.com',
        telefone: '123456789',
        endereco: 'Rua das Flores, 123',
        cidade: '',
        estado: '',
        cpf: '',
        rendaSalarial: 0,
        statusAtivo: false,
        conta: []
    };
    expect(() => service.adicionarClienteAoGerente(999, cliente)).toThrow(NotFoundException);
  });
});
