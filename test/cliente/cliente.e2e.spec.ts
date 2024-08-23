import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { Cliente } from '../../src/models/cliente.model';

describe('ClienteController (e2e)', () => {
  let app: INestApplication;
  let clienteId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('deve criar um cliente', async () => {
    const cliente: Cliente = {
      id: 1,
      nome: 'Cliente 1',
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
    
    const response = await request(app.getHttpServer())
      .post('/cliente/adicionar')
      .send(cliente)
      .expect(201);

    expect(response.body).toEqual(cliente);
    clienteId = response.body.id; 
    console.log(`Cliente criado com ID: ${clienteId}`);
  });

  it('deve buscar um cliente existente', async () => {
    console.log(`Buscando cliente com ID: ${clienteId}`);
    const response = await request(app.getHttpServer())
      .get(`/cliente/${clienteId}`)
      .expect(200);

    console.log('Resposta da busca do cliente:', response.body);
    
    expect(response.body.id).toBe(clienteId);
    expect(response.body.nome).toBe('Cliente 1');
  });

  it('deve atualizar um cliente existente', async () => {
    const updatedCliente: Partial<Cliente> = { nome: 'Cliente Atualizado' };
    const response = await request(app.getHttpServer())
      .patch(`/cliente/atualizar/${clienteId}`)
      .send(updatedCliente)
      .expect(200);

    console.log('Resposta da atualização do cliente:', response.body);

    expect(response.body.id).toBe(clienteId);
    expect(response.body.nome).toBe('Cliente Atualizado');
  });

  it('deve deletar um cliente existente', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/cliente/deletar/${clienteId}`)
      .expect(200);
  
    expect(response.body.message).toBe(`Cliente com ID ${clienteId} removido com sucesso.`);
  
    await request(app.getHttpServer())
      .get(`/cliente/${clienteId}`)
      .expect(404);
  });  

  afterAll(async () => {
    await app.close();
  });
});
