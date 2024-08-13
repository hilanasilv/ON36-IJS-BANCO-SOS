import { Test, TestingModule } from '@nestjs/testing';
import { GerenteController } from '../../src/controllers/gerente.controller';
import { GerenteService } from '../../src/services/gerente.service';
import { Gerente } from '../../src/models/gerente.model';
import { Cliente } from '../../src/models/cliente.model';

describe('GerenteController', () => {
  let gerenteController: GerenteController;
  let gerenteService: GerenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GerenteController],
      providers: [
        {
          provide: GerenteService,
          useValue: {
            criarGerente: jest.fn(),
            buscarGerente: jest.fn(),
            buscarGerentes: jest.fn(),
            atualizarGerente: jest.fn(),
            deletarGerente: jest.fn(),
            adicionarClienteAoGerente: jest.fn(),
          },
        },
      ],
    }).compile();

    gerenteController = module.get<GerenteController>(GerenteController);
    gerenteService = module.get<GerenteService>(GerenteService);
  });

  it('deve ser definido', () => {
    expect(gerenteController).toBeDefined();
  });

  it('deve criar um novo gerente', () => {
    const gerente: Gerente = { id: 1, nome: 'João', clientes: [] };
    jest.spyOn(gerenteService, 'criarGerente').mockReturnValue(gerente);

    expect(gerenteController.criarGerente(gerente)).toBe(gerente);
    expect(gerenteService.criarGerente).toHaveBeenCalledWith(gerente);
  });

  it('deve buscar um gerente por ID', () => {
    const gerente: Gerente = { id: 1, nome: 'João', clientes: [] };
    jest.spyOn(gerenteService, 'buscarGerente').mockReturnValue(gerente);

    expect(gerenteController.buscarGerente(1)).toBe(gerente);
    expect(gerenteService.buscarGerente).toHaveBeenCalledWith(1);
  });

  it('deve deletar um gerente por ID', () => {
    const mensagem = { message: 'Gerente deletado com sucesso' };
    jest.spyOn(gerenteService, 'deletarGerente').mockReturnValue(mensagem);

    expect(gerenteController.deletarGerente(1)).toBe(mensagem);
    expect(gerenteService.deletarGerente).toHaveBeenCalledWith(1);
  });
});
