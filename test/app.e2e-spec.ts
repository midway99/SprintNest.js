import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Authentication', () => {
        let jwtToken: string

        describe('AuthModule', () => {
            it('register user', async () => {
                const response = await request((app.getHttpServer()))
                    .post('/auth/register')
                    .send({name: 'test', role: 'admin', email: 'test@gmail.com', password: '123456'})
                    .expect(201)
            })

            it('authenticates user with valid credentials and provides a jwt token', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({email: 'test@gmail.com', password: '123456'})
                    .expect(201)

                jwtToken = response.body.access_token
                expect(jwtToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) // jwt regex
            })

            it('fails to authenticate user with an incorrect password', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({email: 'test@gmail.com', password: 'wrong'})
                    .expect(401)

                expect(response.body.accessToken).not.toBeDefined()
            })

            it('fails to authenticate user that does not exist', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({email: 'nobody@example.com', password: 'test'})
                    .expect(401)

                expect(response.body.accessToken).not.toBeDefined()
            })
        });

        describe('Users', () => {

            it('/users (GET)', () => {
                return request(app.getHttpServer())
                    .get('/users')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
                    .expect(
                        res => {
                            expect(res.body).toEqual(
                                expect.objectContaining([{
                                    id: 1,
                                    role: 'admin',
                                    name: 'test',
                                    email: 'test@gmail.com',
                                    password: expect.any(String),
                                    created_at: expect.any(String),
                                    updated_at: expect.any(String)
                                }]),
                            );
                        });
            });

            it('register user', async () => {
                const response = await request((app.getHttpServer()))
                    .post('/auth/register')
                    .send({name: 'test user', role: 'user', email: 'test1@gmail.com', password: '654321'})
                    .expect(201)
            })

            it('/users (GET)', () => {
                return request(app.getHttpServer())
                    .get('/users')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
            });

            it('/users/2 (GET)', () => {
                return request(app.getHttpServer())
                    .get('/users/2')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
                    .expect(
                        res => {
                            expect(res.body).toEqual(
                                expect.objectContaining({
                                    id: 2,
                                    role: 'user',
                                    name: 'test user',
                                    email: "test1@gmail.com",
                                    password: expect.any(String),
                                    created_at: expect.any(String),
                                    updated_at: expect.any(String)
                                }),
                            );
                        }
                    );
            });

            it('/users/2 (PATCH)', async () => {
                return request(app.getHttpServer())
                    .patch('/users/2')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .send({name: 'test author', role: 'author'})
                    .expect(200)
                    .expect(
                        {
                            id: 2,
                            role: 'author',
                            name: 'test author',
                        }
                    )
            });

            it('/users (GET)', () => {
                return request(app.getHttpServer())
                    .get('/users')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
            });

            it('/users/2 (DELETE)', () => {
                return request(app.getHttpServer())
                    .delete('/users/2')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200);
            });

            it('/users (GET)', () => {
                return request(app.getHttpServer())
                    .get('/users')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
                    .expect(
                        res => {
                            expect(res.body).toEqual(
                                expect.objectContaining([{
                                    id: 1,
                                    role: 'admin',
                                    name: 'test',
                                    email: 'test@gmail.com',
                                    password: expect.any(String),
                                    created_at: expect.any(String),
                                    updated_at: expect.any(String)
                                }]),
                            );
                        });
            });
        });

        describe('Genres', () => {
            it('/genres (GET)', () => {
                return request(app.getHttpServer())
                    .get('/genres')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
                    .expect([]);
            });

            it('/genres (POST)', async () => {
                return request(app.getHttpServer())
                    .post('/genres')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .send({name: 'новый жанр'})
                    .expect(201)
                    .expect(
                        res => {
                            expect(res.body).toEqual(
                                expect.objectContaining({
                                    id: expect.any(Number),
                                    name: expect.any(String),
                                }),
                            );
                        }
                    )
            });

            it('/genres (GET)', () => {
                return request(app.getHttpServer())
                    .get('/genres')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
            });

            it('/genres/1 (GET)', () => {
                return request(app.getHttpServer())
                    .get('/genres/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
                    .expect(
                        res => {
                            expect(res.body).toEqual(
                                expect.objectContaining({
                                    id: 1,
                                    name: 'новый жанр',
                                    created_at: expect.any(String),
                                    updated_at: expect.any(String)
                                }),
                            );
                        }
                    )
            });

            it('/genres/1 (PATCH)', async () => {
                return request(app.getHttpServer())
                    .patch('/genres/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .send({name: 'измененный жанр'})
                    .expect(200)
                    .expect(
                        {
                            id: 1,
                            name: 'измененный жанр'
                        }
                    )
            });

            it('/genres (GET)', () => {
                return request(app.getHttpServer())
                    .get('/genres')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
            });

            it('/genres/1 (DELETE)', () => {
                return request(app.getHttpServer())
                    .delete('/genres/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200);
            });

            it('/genres (GET)', () => {
                return request(app.getHttpServer())
                    .get('/genres')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
                    .expect([]);
            });
        });

        describe('Books', () => {
            it('/books (GET)', () => {
                return request(app.getHttpServer())
                    .get('/books')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
                    .expect([]);
            });

            it('register user', async () => {
                const response = await request((app.getHttpServer()))
                    .post('/auth/register')
                    .send({name: 'test', role: 'author', email: 'author@gmail.com', password: '123456'})
                    .expect(201)
            })

            it('/genres (POST)', async () => {
                return request(app.getHttpServer())
                    .post('/genres')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .send({name: 'Жанр 2'})
                    .expect(201)
                    .expect(
                        res => {
                            expect(res.body).toEqual(
                                expect.objectContaining({
                                    id: expect.any(Number),
                                    name: expect.any(String),
                                }),
                            );
                        }
                    )
            });

            it('/books (POST)', async () => {
                return request(app.getHttpServer())
                    .post('/books')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .send({
                        name: "Первая книга",
                        description: "Краткое описание",
                        genre: 2,
                        user: 3,
                    })
                    .expect(201)
                    .expect(
                        res => {
                            expect(res.body).toEqual(
                                expect.objectContaining({
                                    id: expect.any(Number),
                                    name: expect.any(String),
                                    description: expect.any(String),
                                    genre: expect.any(Number),
                                    user: expect.any(Number),
                                    created_at: expect.any(String),
                                    updated_at: expect.any(String)
                                }),
                            );
                        }
                    )
            });

            it('/books (GET)', () => {
                return request(app.getHttpServer())
                    .get('/books')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
            });

            it('/books/1 (GET)', () => {
                return request(app.getHttpServer())
                    .get('/books/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
                    .expect(
                        res => {
                            expect(res.body).toEqual(
                                expect.objectContaining({
                                    id: 1,
                                    name: expect.any(String),
                                    description: expect.any(String),
                                    genre: expect.any(Object),
                                    user: expect.any(Object),
                                    created_at: expect.any(String),
                                    updated_at: expect.any(String)
                                }),
                            );
                        }
                    );
            });

            it('/books/1 (PATCH)', async () => {
                return request(app.getHttpServer())
                    .patch('/books/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .send({name: 'Изменённое название'})
                    .expect(200)
                    .expect(
                        {
                            id: 1,
                            name: 'Изменённое название',
                        }
                    )
            });

            it('/books (GET)', () => {
                return request(app.getHttpServer())
                    .get('/books')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
            });

            it('/books/1 (DELETE)', () => {
                return request(app.getHttpServer())
                    .delete('/books/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200);
            });

            it('/books (GET)', () => {
                return request(app.getHttpServer())
                    .get('/books')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .set('Role', 'admin')
                    .expect(200)
                    .expect([]);
            });
        });
    });

    afterAll(done => {
        app.close();
        done();
    });
});
