import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from '../../src/controllers/cliente.controller';
import { ClienteService } from '../../src/services/cliente.service';
import { NotFoundException } from '@nestjs/common';
import { Cliente } from '../../src/models/cliente.model';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  beforeEach(async () => {
    const mockClienteService = {
      adicionarCliente: jest.fn(),
      buscarCliente: jest.fn(),
      buscarClientes: jest.fn(),
      atualizarCliente: jest.fn(),
      deletarCliente: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClienteService,
          useValue: mockClienteService,
        },
      ],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);
  });

  it('deve adicionar um cliente', () => {
    const cliente: Cliente = {
        id: 1, nome: 'Marina', conta: [], dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: '',
        rendaSalarial: 0,
        statusAtivo: false
    };
    jest.spyOn(service, 'adicionarCliente').mockReturnValue(cliente);

    const result = controller.adicionarCliente(cliente);
    expect(result).toEqual(cliente);
    expect(service.adicionarCliente).toHaveBeenCalledWith(cliente);
  });

  it('deve buscar um cliente pelo ID', async () => {
    const cliente: Cliente = {
        id: 1, nome: 'Marina', conta: [], dataNascimento: '',
        email: '',
        telefone: '',
        endereco: '',
        cidade: '',
        estado: '',
        cpf: '',
        rendaSalarial: 0,
        statusAtivo: false
    };
    jest.spyOn(service, 'buscarCliente').mockReturnValue(cliente);

    const result = await controller.buscarCliente(1);
    expect(result).toEqual(cliente);
    expect(service.buscarCliente).toHaveBeenCalledWith(1);
  });

  it('deve lançar NotFoundException ao buscar um cliente inexistente', async () => {
    jest.spyOn(service, 'buscarCliente').mockReturnValue(undefined);

    await expect(controller.buscarCliente(999)).rejects.toThrow(NotFoundException);
  });
});
