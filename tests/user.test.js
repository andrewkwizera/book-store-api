const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose')
const app = require('../src/app')

jest.setTimeout(10000000)
server = app.listen(app.get('port'), () => {

})

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
    server.close(() => {});
})

describe('user service ', () => {
    describe('register a user', ()=> {
        it('ensure fistname is provided', async () => {
            await request(app).post('/api/users/auth/register').send({
                firstname: 'arah'
            }).expect(400)
        })
    })    
    
})

describe('login', () => {
    it("", async () =>{
        await request(app).get('/health').expect(200)
    })

    it("", async () =>{
        await request(app).get('/health').expect(200)
    })

    it("", async () =>{
        await request(app).get('/health').expect(200)
    })

    it("", async () =>{
        await request(app).get('/health').expect(200)
    })
    
    it("", async () =>{
        await request(app).get('/health').expect(200)
    })
    
    
})

describe('login', () => {
    it("", async () =>{
        await request(app).get('/health').expect(200)
    })

    it("", async () =>{
        await request(app).get('/health').expect(200)
    })

    it("", async () =>{
        await request(app).get('/health').expect(200)
    })

    it("", async () =>{
        await request(app).get('/health').expect(200)
    })
    
    it("", async () =>{
        await request(app).get('/health').expect(200)
    })
    
    
})

describe('login', () => {
    it("", async () =>{
        await request(app).get('/health').expect(200)
    })

    it("", async () =>{
        await request(app).get('/health').expect(200)
    })

    it("", async () =>{
        await request(app).get('/health').expect(200)
    })

    it("", async () =>{
        await request(app).get('/health').expect(200)
    })
    
    it("", async () =>{
        await request(app).get('/health').expect(200)
    })
    
    
})