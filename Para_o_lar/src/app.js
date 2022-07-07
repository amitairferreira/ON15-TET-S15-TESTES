const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

require('dotenv-safe').config()

const db = require('./database/mongoConfig');
db.connect();

app.use(express.json());

const alunoRoutes = require('./routes/alunoRoutes');
app.use("/alunos", alunoRoutes)

module.exports = app;