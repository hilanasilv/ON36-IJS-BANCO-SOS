import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from '../../src/services/cliente.service';
import { ContaService } from '../../src/services/conta.service';
import { InterfacePessoa } from '../../src/interfaces/pessoa.interface';
import { Conta } from '../../src/models/conta.model';
import { TipoConta } from '../../src/enum/tipoDeConta';

describe('ClienteService', () => {
  let clienteService: ClienteService;
  let contaService: ContaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: ContaService,
          useValue: {
            obterConta: jest.fn(),
          },
        },
      ],
    }).compile();

    clienteService = module.get<ClienteService>(ClienteService);
    contaService = module.get<ContaService>(ContaService);
  });

  it('deve ser definido', () => {
    expect(clienteService).toBeDefined();
  });

  it('deve adicionar um cliente', () => {
    const cliente: InterfacePessoa = {
        id: 1, nome: 'Lorrane', conta: [],
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: ''
    };
    expect(clienteService.adicionarCliente(cliente)).toBe(cliente);
  });

  it('deve buscar um cliente por ID', () => {
    const cliente: InterfacePessoa = {
        id: 1, nome: 'Lorrane', conta: [],
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: ''
    };
    clienteService.adicionarCliente(cliente);
    expect(clienteService.buscarCliente(1)).toBe(cliente);
  });

  it('deve atualizar um cliente', () => {
    const cliente: InterfacePessoa = {
        id: 1, nome: 'Lorrane', conta: [],
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: ''
    };
    clienteService.adicionarCliente(cliente);
    const clienteAtualizado = { nome: 'Lorrane Maria' };
    expect(clienteService.atualizarCliente(1, clienteAtualizado)).toEqual({ ...cliente, ...clienteAtualizado });
  });

  it('deve associar uma conta ao cliente', () => {
    const cliente: InterfacePessoa = {
        id: 1, nome: 'Lorrane', conta: [],
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: ''
    };
    clienteService.adicionarCliente(cliente);
    const conta: Conta = new Conta(1, TipoConta.ContaCorrente, 100, 1); 
    jest.spyOn(contaService, 'obterConta').mockReturnValue(conta);
    
    expect(clienteService.associarConta(1, 1)).toBe(true);
    expect(cliente.conta).toContain(conta);
  });

  it('deve deletar um cliente', () => {
    const cliente: InterfacePessoa = {
        id: 1, nome: 'Lorrane', conta: [],
        dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: ''
    };
    clienteService.adicionarCliente(cliente);
    expect(clienteService.deletarCliente(1)).toEqual({ message: 'Cliente com ID 1 removido com sucesso.' });
    expect(clienteService.buscarCliente(1)).toBeUndefined();
  });
});
