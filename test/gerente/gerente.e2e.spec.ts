import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { Gerente } from '../../src/models/gerente.model';
import { Cliente } from '../../src/models/cliente.model';

describe('GerenteController (e2e)', () => {
    let app: INestApplication;
    let gerenteId: number;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('deve criar um gerente', async () => {
        const gerente: Gerente = {
            id: 1,
            nome: 'Gerente 1',
            clientes: [],
        };

        const response = await request(app.getHttpServer())
            .post('/gerente/criar')
            .send(gerente)
            .expect(201);

        expect(response.body).toMatchObject({
            id: gerente.id,
            nome: gerente.nome,
            clientes: expect.any(Array),
        });

        gerenteId = response.body.id;
    });

    it('deve buscar um gerente existente', async () => {
        const response = await request(app.getHttpServer())
            .get(`/gerente/${gerenteId}`)
            .expect(200);

        expect(response.body.id).toBe(gerenteId);
        expect(response.body.nome).toBe('Gerente 1');
    });

    it('deve buscar todos os gerentes', async () => {
        const response = await request(app.getHttpServer())
            .get('/gerente')
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('deve atualizar um gerente existente', async () => {
        const gerenteAtualizado: Partial<Gerente> = { nome: 'Gerente Atualizado' };

        const response = await request(app.getHttpServer())
            .patch(`/gerente/atualizar/${gerenteId}`)
            .send(gerenteAtualizado)
            .expect(200);

        expect(response.body.id).toBe(gerenteId);
        expect(response.body.nome).toBe(gerenteAtualizado.nome);
    });  

    it('deve associar um cliente a um gerente', async () => {
        // Primeiro, cria um novo gerente
        const gerente: Gerente = {
            id: 2,
            nome: 'Gerente 2',
            clientes: [],
        };

        const responseGerente = await request(app.getHttpServer())
            .post('/gerente/criar')
            .send(gerente)
            .expect(201);

        const novoGerenteId = responseGerente.body.id;

        // Cria um cliente para associar ao gerente
        const cliente: Cliente = {
            id: 1,
            nome: 'Cliente 1',
            dataNascimento: '01/01/1990',
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
            .post(`/gerente/associarcliente/${novoGerenteId}`)
            .send(cliente)
            .expect(201);

        expect(response.body.id).toBe(novoGerenteId);
        expect(response.body.clientes).toContainEqual(expect.objectContaining({ id: cliente.id }));
    });

    afterAll(async () => {
        await app.close();
    });
});
