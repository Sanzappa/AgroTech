const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (req, res) => {
    const info = req.body

    const bMotorista = await prisma.motorista.findFirst({
        where: {
            id: info.id_motorista
        }
    })

    const bVeiculo = await prisma.veiculos.findFirst({
        where: {
            id: info.id_veiculo
        }
    })

    if (bMotorista.disponivel !== false && bVeiculo.disponivel !== false) {

        await prisma.veiculos.updateMany({
            where: {
                id: info.id_veiculo,
            },
            data: {
                disponivel: false
            }
        })

        await prisma.motorista.updateMany({
            where: {
                id: info.id_motorista
            },
            data: {
                disponivel: false
            }
        })

        const operacao = await prisma.operacao.createMany({
            data: info
        })

        res.status(200).json(operacao).end()
    } else {
        res.status(200).json("Veiculo ou Motorista Em Uso").end()
    }

   
}

const read = async (req, res) => {
    const operacao = await prisma.operacao.findMany({
        select: {
            veiculos: true,
            motorista: true,
            id: true,
            data_saida: true,
            data_retorno: true,
            descricao: true
        }
    })

    res.status(200).json(operacao).end()
}

const readOne = async (req, res) => {
    let id = Number(req.body.id)
    delete req.body.id
    const operacao = await prisma.operacao.findUnique({
        where: {
            id: id
        },
        select: {
            veiculos: true,
            motorista: true,
            id: true,
            data_saida: true,
            data_retorno: true,
            descricao: true
        }
    })

    res.status(200).json(operacao).end()
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

    await prisma.motorista.updateMany({
        where: {
            id: req.body.id_motorista
        },
        data: {
            disponivel: true
        }
    })
    delete req.body.id_motorista
    delete req.body.id_veiculo
    var info = req.body

    if (info.data_retorno !== undefined) {
        info.data_retorno = new Date(req.body.data_retorno)
    }

    const operacao = await prisma.operacao.update({
        where: {
            id: id
        },
        data: info
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
    readOne,
    update,
    remove
}