const express = require("express");
const router = express.Router();

const controller = require("../controller/alunoController")

router.get("/all", controller.getAll)

router.post("/create", controller.createAluno)

router.put("/update/:id", controller.updateAlunos)

router.delete("/delete/:id", controller.deleteAluno)

module.exports = router;