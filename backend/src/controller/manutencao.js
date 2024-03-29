const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    await prisma.veiculos.updateMany({
        where: {
            id: req.body.id_veiculo,
        },
        data: {
            disponivel: false
        }
    })

    const manutencao = await prisma.manutencao.createMany({
        data: info
    })

    res.status(200).json(manutencao).end()
}

const read = async (req, res) => {

    const manutencao = await prisma.manutencao.findMany({
        select: {
            veiculos: true,
            id: true,
            data_inicio: true,
            data_fim: true,
            valor: true,
            descricao: true
        }
    })

    res.status(200).json(manutencao).end()
}

const readMaior = async (req, res) => {

    const manutencao = await prisma.manutencao.findMany({
        select: {
            veiculos: true,
            id: true,
            data_inicio: true,
            data_fim: true,
            valor: true,
            descricao: true
        },
        orderBy: {
            valor: 'desc'
        }
    })

    res.status(200).json(manutencao).end()
}

const update = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    
    await prisma.veiculos.updateMany({
        where: {
            id: req.body.id_veiculo,
        },
        data: {
            disponivel: true
        }
    })
    delete req.body.id_motorista
    
    var info = req.body

    if (info.data_fim !== undefined) {
        info.data_fim = new Date(req.body.data_fim)
    }
    const manutencao = await prisma.manutencao.update({
        where: {
            id: id
        },
        data: info
    })

    res.status(200).json(manutencao).end()
}

const remove = async (req, res) => {
    const manutencao = await prisma.manutencao.delete({
        where: {
            id: Number(req.body.id)
        }
    })

    res.status(200).json(manutencao).end()
}

module.exports = {
    create,
    read,
    readMaior,
    update,
    remove
}