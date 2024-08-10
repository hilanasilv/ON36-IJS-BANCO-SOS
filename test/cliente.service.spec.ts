import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../src/services/cliente.service';
import { ContaService } from '../src/services/conta.service';
import { InterfacePessoa } from '../src/interfaces/pessoa.interface';

describe('ClienteService', () => {
  let service: ClienteService;
  let mockContaService: Partial<ContaService>;

  beforeEach(async () => {
    mockContaService = {
      obterConta: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        { provide: ContaService, useValue: mockContaService },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('deve adicionar um cliente', () => {
    const cliente: InterfacePessoa = {
        id: 1, nome: 'João', conta: [],
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: ''
    };
    const resultado = service.adicionarCliente(cliente);
    expect(resultado).toEqual(cliente);
    expect(service.buscarClientes()).toContain(cliente);
  });

  it('deve buscar um cliente pelo ID', () => {
    const cliente: InterfacePessoa = {
        id: 1, nome: 'João', conta: [],
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: ''
    };
    service.adicionarCliente(cliente);
    const resultado = service.buscarCliente(1);
    expect(resultado).toEqual(cliente);
  });

  it('deve retornar undefined ao buscar um cliente com ID inexistente', () => {
    const resultado = service.buscarCliente(999);
    expect(resultado).toBeUndefined();
  });

  // Você pode adicionar mais testes para outras funcionalidades como atualizarCliente, deletarCliente, etc.
});
