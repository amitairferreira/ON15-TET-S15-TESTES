const request = require('supertest')
const app = require('../app')

let elementId

describe('API test', () => {
  test('GET /alunos/all', (done) => {
    request(app)
      .get('/alunos/all')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0)
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
  test('POST /alunos/create', (done) => {
    request(app)
      .post('/alunos/create')
      .expect('Content-Type', /json/)
      .send({
        name: "Carla Maria",
        socialName: "Mario",
        birthDate: "1989/04/10",
        age: 19,
        address: "Rua Alvorada, 3040",
        telephone: 12345689,
        cpf: 12365478912,
        serie: "1 anos",
        shift: "Integral"
      })
      .expect(201)
      .end((err, res) => {
          if(err) return done(err)
          elementId = res.body.savedAluno._id
          return done()
      })
  })
  test('PUT /alunos/update/:id', (done) => {
    request(app)
      .put(`/alunos/update/${elementId}`)
      .expect('Content-Type', /json/)
      .send({
        name: "Carla Maria",
        socialName: "Mario",
        birthDate: "1989/04/10",
        age: 19,
        address: "addressatualizado",
        telephone: 12345689,
        cpf: 12365478912,
        serie: "1 anos",
        shift: "shiftatualizado"
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.saveAluno._id).toBe(elementId)
        expect(res.body.saveAluno.address).toBe('addressatualizado')
        expect(res.body.saveAluno.shift).toBe('shiftatualizado')
      })
      .end((err, res) => {
        if(err) return done (err)
        return done()
      })
  })
  test('DELETE /alunos/delete/:id', (done) => {
    request(app)
    .delete(`/alunos/delete/${elementId}`)
    .expect(200)

    .end((err, res) => {
        if(err) return done (err)
        return done()
    })
  })
})
