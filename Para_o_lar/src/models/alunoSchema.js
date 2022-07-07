const mongoose = require('mongoose')

const alunoSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  socialName: String,
  birthDate: Date,
  age: Number,
  address: String,
  telephone: Number,
  cpf: Number,
  serie: String,
  shift: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})


module.exports = mongoose.model('aluno', alunoSchema)