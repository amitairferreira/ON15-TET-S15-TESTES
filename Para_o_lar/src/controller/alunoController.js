const AlunoSchema = require('../models/alunoSchema')

const getAll = async (req, res) => {
  try {
    const allAlunos = await AlunoSchema.find()
    res.status(200).send(allAlunos)
  } catch (err) {
    console.error(err)
  }
}

const createAluno = async (req, res) => {
  try {
    if (!req.body.name || !req.body.cpf) {
      res.status(400).send({
        message: 'Campos obrigatórios precisam ser enviados',
        statusCode: 400
      })
    }

    const newAluno = new AlunoSchema({
      name: req.body.name,
      socialName: req.body.socialName,
      birthDate: req.body.birthDate,
      age: req.body.age,
      address: req.body.address,
      telephone: req.body.telephone,
      cpf: req.body.cpf,
      serie: req.body.serie,
      shift: req.body.shift,
      createdAt: new Date()
    })

    const savedAluno = await newAluno.save()

    if (savedAluno) {
      res.status(201).send({
        message: 'Aluno cadastrado com sucesso',
        savedAluno
      })
    }
  } catch (err) {
    console.error(err)
  }
}

const updateAlunos = async (req, res) => {
  try {
    const findAluno = await AlunoSchema.findById(req.params.id)

    if (!findAluno) {
      res.status(404).send({
        message: 'Aluno não encontrado',
        statusCode: 404
      })
    }

    findAluno.address = req.body.address || findAluno.address
    findAluno.shift = req.body.shift || findAluno.shift

    const saveAluno = await findAluno.save()

    res.status(200).send({
      message: 'Aluno atualizado com sucesso',
      saveAluno
    })
  } catch (err) {
    console.error(err)
  }
}

const deleteAluno = async (req, res) => {
  try {
    const findAluno = await AlunoSchema.findById(req.params.id)

    await findAluno.delete()

    res.status(200).send({
      message: 'Aluno deletado com sucesso',
      findAluno
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getAll,
  createAluno,
  updateAlunos,
  deleteAluno
}
