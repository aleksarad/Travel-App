const request = require('supertest')
const server = require('./server.js')

test('server status', ()=> {
    const res = request(server)
        .get('/')
        .then(res => {
            expect(res.statusCode).toBe()
        })
})