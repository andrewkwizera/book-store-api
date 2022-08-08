const request = require('supertest')
const app = require('../src/app')

test('login', async () => {
    await request(app).post('/api/v1/books').send({
        name:'erarars'
    }).expect(201)
    
})