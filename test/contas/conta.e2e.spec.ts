import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { TipoConta } from '../../src/enum/tipoDeConta';

describe('ContaController (e2e)', () => {
  let app: INestApplication;
  let contaId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('deve criar uma conta', async () => {
    const conta = {
      tipo: TipoConta.ContaCorrente,
      id: 1,
      saldo: 1000,
      clienteId: 1,
      chequeEspecial: 500,
    };

    const response = await request(app.getHttpServer())
      .post('/conta/criar')
      .send(conta)
      .expect(201);

    // Ajusta a expectativa com base no que a API está retornando
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      tipo: conta.tipo,
      saldo: conta.saldo,
      clienteId: conta.clienteId,
      chequeEspecial: conta.chequeEspecial,
    });

    contaId = response.body.id;
  });

  it('deve obter uma conta existente', async () => {
    const response = await request(app.getHttpServer())
      .get(`/conta/${contaId}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: contaId,
      tipo: TipoConta.ContaCorrente,
      saldo: 1000, // Ajuste com base no valor inicial definido
      clienteId: 1,
      chequeEspecial: 500,
    });
  });

  it('deve atualizar uma conta existente', async () => {
    const updatedTipo = TipoConta.ContaPoupanca;
    const response = await request(app.getHttpServer())
      .patch(`/conta/atualizar/${contaId}`)
      .send({ tipo: updatedTipo })
      .expect(200);

    expect(response.body).toMatchObject({
      id: contaId,
      tipo: updatedTipo,
    });
  });

  it('deve remover uma conta existente', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/conta/remover/${contaId}`)
      .expect(200);

    expect(response.body.message).toBe('Conta removida com sucesso.');

    // Verifica se a conta foi realmente removida
    await request(app.getHttpServer())
      .get(`/conta/${contaId}`)
      .expect(404); // Ajuste conforme o código de erro retornado quando a conta não é encontrada
  });

  afterAll(async () => {
    await app.close();
  });
});
