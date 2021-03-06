import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const req = await request(app.getHttpServer()).get('/');
    expect(req.status).toBe(404);
  });

  it('/games (GET)', async () => {
    const req = await request(app.getHttpServer()).get('/games');
    expect(req.status).toBe(200);
  });
});
