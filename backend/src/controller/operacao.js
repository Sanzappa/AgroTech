const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const operacao = await prisma.operacao.createMany({
        data: info
    })

    res.status(200).json(operacao).end()
}

const read = async (req, res) => {
    const operacao = await prisma.operacao.findMany()

    res.status(200).json(operacao).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const operacao = await prisma.operacao.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(operacao).end()
}

const remove = async (req, res) => {
    const operacao = await prisma.operacao.delete({
        where: {
            id: Number(req.body.id)
        }
    })

    res.status(200).json(operacao).end()
}

module.exports = {
    create,
    read,
    update,
    remove
}