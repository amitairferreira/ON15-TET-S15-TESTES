const request = require('supertest')
const app = require('../app')

// jest.setTimeout(30500)
// jest.useRealTimers()
let elementId

describe('API test', () => {
  //agrupar vários testes
  //testar primeiro a rota GET

  test('GET /users/all', (done) => {
    request(app)
      .get('/users/all')
      .expect(200)
      .expect((res) => {
        console.log('BODY DA RESPOSTA', res.body)
        expect(res.body.length).not.toBe(0)
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  test('POST /users/create', (done) => {
    request(app)
      .post('/users/create')
      .expect('Content-Type', /json/)
      .send({
        name: 'Paula',
        email: 'paula@email.com',
        password: 'senhamuitodificil'
      })
      .expect(201)
      .end((err, res) => {
        console.log('BODY DA RESPOSTA', res.body)
        if (err) return done(err)
        console.log('ID DO USUÁRIO RECÉM CRIADO', res.body.savedUser._id)
        console.log('VARIAVEL DE ID VAZIA', elementId)
        elementId = res.body.savedUser._id
        console.log('VARIAVEL DE ID PREENCHIDA', elementId)

        return done()
      })
  })
  test('PATCH /users/update/:id', (done) => {
    request(app)
      .patch(`/users/update/${elementId}`)
      .expect('Content-Type', /json/)
      .send({
        name: 'Paula Atualizado',
        email: 'paulaatualizado@email.com'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.savedUser._id).toBe(elementId)
        expect(res.body.savedUser.name).toBe('Paula Atualizado')
        expect(res.body.savedUser.email).toBe('paulaatualizado@email.com')
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  test('DELETE /users/delete/:id', (done) => {
    request(app)
      .delete(`/users/delete/${elementId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        console.log("DELETE", res.body)
        expect(res.body.userFound.email).toBe('paulaatualizado@email.com')
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
  
})
