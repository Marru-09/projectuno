const request = require('supertest');
const mongoose = require('mongoose');

const { goodNewUser, badNewUser } = require('./testData');
const app = require('../app');

beforeAll(async () => {
    const connectionStringPrueba = process.env.DB_URL;
    console.log('const connectionStringPrueba');
    console.log(connectionStringPrueba);
    console.log("ruta base de datos procces.env.DB_URL ");
    //console.log(procces.env.DB_URL);
    //await mongoose.connect(procces.env.DB_URL);
    await mongoose.connect(connectionStringPrueba);
}, 10000);

afterAll(async () => {
    await mongoose.connection.close();
}, 10000);

describe('Pruebas Unitarias Controladores Accounts', () => {
    describe('Pruebas Endpoint Register', () => {

        test('Prueba de registro, peticion sin datos', async () => {
            const response = await request(app).
                                   post('/accounts/register').
                                   send();
            expect(response.statusCode).toBe(400);

        });

        test('Prueba de registro, peticion datos faltantes', async () => {
            const response = await request(app).
                                   post('/accounts/register').
                                   send(badNewUser);
            expect(response.statusCode).toBe(400);

        });

        test('Prueba de registro, peticion datos correctos', async () => {
            const response = await request(app).
                                   post('/accounts/register').
                                   send(goodNewUser);
            expect(response.statusCode).toBe(200);

        });

    });
});