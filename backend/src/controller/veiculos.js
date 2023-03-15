const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const veiculos = await prisma.veiculos.createMany({
        data: info
    })

    res.status(200).json(veiculos).end()
}

const read = async (req, res) => {
    const veiculos = await prisma.veiculos.findMany()

    res.status(200).json(veiculos).end()
}

const updateDispFalse = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const veiculos = await prisma.veiculos.update({
        where: {
            id: id
        },
        data: {
            disponivel: false
        }
    })

    res.status(200).json(veiculos).end()
}

const updateDispTrue = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const veiculos = await prisma.veiculos.update({
        where: {
            id: id
        },
        data: {
            disponivel: true
        }
    })

    res.status(200).json(veiculos).end()
}

const update = async (req, res) => {
    console.log('achouVeic');
    let id = Number(req.body.id)
    delete req.body.id
    const veiculos = await prisma.veiculos.update({
        where: {
            id: id
        },
        data: req.body
    })

    res.status(200).json(veiculos).end()
}

const remove = async (req, res) => {
    const veiculos = await prisma.veiculos.delete({
        where: {
            id: Number(req.body.id)
        }
    })

    res.status(200).json(veiculos).end()
}

module.exports = {
    create,
    read,
    update,
    updateDispTrue,
    updateDispFalse,
    remove
}