const express = require('express');
const router = express.Router();

const Middleware = require('../middleware/middleware')
const Usuario = require("../controller/usuarios")
const Motorista = require("../controller/motorista")
const Veiculos = require("../controller/veiculos")
const Operacao = require("../controller/operacao")
const Manutencao = require("../controller/manutencao")

router.get('/motorista', Motorista.read);
router.get('/veiculos', Veiculos.read);
router.get('/operacao', Operacao.read);
router.get('/manutencao', Manutencao.read);

router.post('/motorista', Motorista.create)
router.post('/manutencao', Manutencao.create)
router.post('/veiculos', Veiculos.create)
router.post('/operacao', Operacao.create)
router.post('/usuario', Usuario.create)
router.post('/login', Usuario.login)

router.delete('/motorista', Motorista.remove)
router.delete('/manutencao', Manutencao.remove)
router.delete('/veiculos', Veiculos.remove)
router.delete('/operacao', Operacao.remove)

router.put('/motorista', Motorista.update)
router.put('/manutencao', Manutencao.update)
router.put('/veiculos', Veiculos.update)
router.put('/operacao', Operacao.update)

router.delete('/delete', Middleware.validaAcesso, Usuario.remover)

module.exports = router;