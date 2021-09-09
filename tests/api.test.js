const request = require('supertest')
const createServer = require("../server")
const mongoose = require("mongoose")

beforeEach((done) => {
    mongoose.connect(
        "mongodb://localhost:27017/testing",
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done()
    )
})

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    })
})

const app = createServer();

describe('Testing Endpoints', () => {

    it('should add a user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                name: "Name1",
                lastname: 'Lastname1',
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.name).toEqual("Name1")
    })

    it('should add two users', async () => {
        await request(app)
            .post('/api/users')
            .send({
                name: "Name1",
                lastname: 'Lastname1',
            })

        await request(app)
            .post('/api/users')
            .send({
                name: "Name2",
                lastname: 'Lastname2',
            })

        const res = await request(app)
            .get('/api/users')
        expect(res.body[0].name).toEqual("Name1")
        expect(res.body[1].name).toEqual("Name2")
    })

    it('should not allow to remove user when not logged', async () => {
        await request(app)
            .post('/api/users')
            .send({
                _id: 1,
                name: "Name1",
                lastname: 'Lastname1',
            })

        await request(app)
            .post('/api/users')
            .send({
                _id: 2,
                name: "Name2",
                lastname: 'Lastname2',
            })

        const res = await request(app)
            .delete('/api/users/1')

        expect(res.status).toEqual(403)
    })

    it('should not allow to remove other user', async () => {
        await request(app)
            .post('/api/users')
            .send({
                _id: 1,
                name: "Name1",
                lastname: 'Lastname1',
            })

        await request(app)
            .post('/api/users')
            .send({
                _id: 2,
                name: "Name2",
                lastname: 'Lastname2',
            })

        const res = await request(app)
            .delete('/api/users/1')
            .set('id', '2')

        expect(res.status).toEqual(405)
    })

    it('should not allow to give kudos to itself', async () => {
        await request(app)
            .post('/api/users')
            .send({
                _id: 1,
                name: "Name1",
                lastname: 'Lastname1',
            })

        await request(app)
            .post('/api/users')
            .send({
                _id: 2,
                name: "Name2",
                lastname: 'Lastname2',
            })

        const res = await request(app)
            .post('/api/users/2/kudos')
            .set('id', '2')
            .send({
                message: "You are the best!"
            })

        expect(res.body.message).toEqual("You can not give kudos to yourself")
    })    
})
