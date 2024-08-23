import { Test, TestingModule } from '@nestjs/testing';
import { GerenteService } from '../../src/services/gerente.service';
import { Gerente } from '../../src/models/gerente.model';
import { Cliente } from '../../src/models/cliente.model';

describe('GerenteService', () => {
  let service: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenteService],
    }).compile();

    service = module.get<GerenteService>(GerenteService);
  });

  it('deve criar um gerente', () => {
    const novoGerente: Gerente = { id: 1, nome: 'Gerente 1', clientes: [] };
    const gerenteCriado = service.criarGerente(novoGerente);

    expect(gerenteCriado).toEqual(novoGerente);
    expect(service.buscarGerentes()).toContainEqual(novoGerente);
  });

  it('deve buscar um gerente existente', () => {
    const gerenteExistente: Gerente = { id: 2, nome: 'Gerente 2', clientes: [] };
    service.criarGerente(gerenteExistente);

    const gerenteBuscado = service.buscarGerente(2);

    expect(gerenteBuscado).toEqual(gerenteExistente);
  });

  it('deve lançar uma exceção ao buscar um gerente inexistente', () => {
    expect(() => service.buscarGerente(999)).toThrowError('Gerente com ID 999 não encontrado.');
  });

  it('deve atualizar um gerente existente', () => {
    const gerenteAtualizado: Gerente = { id: 3, nome: 'Gerente 3', clientes: [] };
    service.criarGerente(gerenteAtualizado);
    const gerenteModificado: Partial<Gerente> = { nome: 'Gerente Atualizado' };

    const gerenteAtualizadoResult = service.atualizarGerente(3, gerenteModificado);

    expect(gerenteAtualizadoResult?.nome).toBe('Gerente Atualizado');
  });

  it('deve deletar um gerente existente', () => {
    const gerenteParaDeletar: Gerente = { id: 4, nome: 'Gerente 4', clientes: [] };
    service.criarGerente(gerenteParaDeletar);

    const mensagemDeletado = service.deletarGerente(4);

    expect(mensagemDeletado.message).toBe('Gerente com ID 4 removido com sucesso.');
    expect(() => service.buscarGerente(4)).toThrowError('Gerente com ID 4 não encontrado.');
  });

  it('deve adicionar um cliente ao gerente', () => {
    const gerente: Gerente = { id: 5, nome: 'Gerente 5', clientes: [] };
    const cliente: Cliente = {
        id: 1, nome: 'Cliente 1',
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: '',
        rendaSalarial: 0,
        statusAtivo: false,
        conta: []
    };
    service.criarGerente(gerente);

    const gerenteAtualizado = service.adicionarClienteAoGerente(5, cliente);

    expect(gerenteAtualizado.clientes).toContainEqual(cliente);
  });

  it('deve lançar uma exceção ao adicionar um cliente a um gerente inexistente', () => {
    const cliente: Cliente = {
        id: 2, nome: 'Cliente 2',
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: '',
        rendaSalarial: 0,
        statusAtivo: false,
        conta: []
    };
    expect(() => service.adicionarClienteAoGerente(999, cliente)).toThrowError('Gerente com ID 999 não encontrado.');
  });
});
