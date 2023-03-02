function alterarPage(e) {
    var optionall = document.querySelector(".optionall")
    optionall.classList.remove("optionall")

    document.getElementById(e.id).classList.add("optionall")

    var pages = document.querySelectorAll(".report-container")

    pages.forEach(p => {
        p.classList.add("model")
        if (e.classList[1] == p.id) {
            p.classList.remove("model")
        }
    })
}

function loadVeiculos() {
    fetch("http://localhost:5000/veiculos", {
        "method": "GET",
        "headers": {}
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response.forEach(e => {

                var veiculos = document.querySelector("#tr").cloneNode(true)
                veiculos.classList.remove("model")

                veiculos.querySelector("#idV").innerHTML = e.id
                veiculos.querySelector("#placa").innerHTML = e.placa
                veiculos.querySelector("#modelo").innerHTML = e.modelo
                veiculos.querySelector("#marca").innerHTML = e.marca
                veiculos.querySelector("#tipo").innerHTML = e.tipo

                if (e.disponivel == true) {
                    veiculos.querySelector("#disponibilidade").innerHTML = "Disponivel"
                    veiculos.querySelector("#disponibilidade").style.color = "#009c27"
                } else {
                    veiculos.querySelector("#disponibilidade").innerHTML = "Indisponivel"
                    veiculos.querySelector("#disponibilidade").style.color = "#fa291e"
                }

                document.querySelector("#info-veiculo").appendChild(veiculos)

            })
        })
}

function loadOperacoes() {
    fetch("http://localhost:5000/operacao", {
        "method": "GET",
        "headers": {}
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response.forEach(e => {

                var operacao = document.querySelector("#info-operacao").querySelector("#tr").cloneNode(true)
                operacao.classList.remove("model")


                operacao.querySelector("#id-op").innerHTML = e.id
                operacao.querySelector("#id-motorista").innerHTML = e.id_motorista
                operacao.querySelector("#data-saida").innerHTML = new Date(e.data_saida).toLocaleDateString('pt-br', { timeZone: 'UTC' })
                if (e.data_retorno != null) {
                    operacao.querySelector("#data-retorno").innerHTML = new Date(e.data_retorno).toLocaleDateString('pt-br', { timeZone: 'UTC' })
                } else {
                    operacao.querySelector("#data-retorno").innerHTML = e.data_retorno
                }
                operacao.querySelector("#descricao").innerHTML = e.descricao

                document.querySelector("#info-operacao").appendChild(operacao)
            })
        })
}

function loadManutencoes() {
    fetch("http://localhost:5000/manutencao", {
        "method": "GET",
        "headers": {}
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response.forEach(e => {

                var manutencao = document.querySelector("#info-manutencao").querySelector("#tr").cloneNode(true)
                manutencao.classList.remove("model")

                manutencao.querySelector("#id-man").innerHTML = e.id
                manutencao.querySelector("#data-inicio").innerHTML = new Date(e.data_inicio).toLocaleDateString('pt-br', { timeZone: 'UTC' })
                manutencao.querySelector("#data-fim").innerHTML = e.data_fim
                manutencao.querySelector("#valor").innerHTML = "R$" + e.valor
                manutencao.querySelector("#descricao-man").innerHTML = e.descricao

                document.querySelector("#info-manutencao").appendChild(manutencao)

            })
        })
}
function loadMotoristas() {
    fetch("http://localhost:5000/motorista", {
        "method": "GET",
        "headers": {}
    })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            response.forEach(e => {

                var motorista = document.querySelector("#info-motoristas").querySelector("#tr").cloneNode(true)
                motorista.classList.remove("model")

                motorista.querySelector("#id-mot").innerHTML = e.id
                motorista.querySelector("#cpf").innerHTML = e.cpf
                motorista.querySelector("#cnh").innerHTML = e.cnh
                motorista.querySelector("#nome").innerHTML = e.nome

                document.querySelector("#info-motoristas").appendChild(motorista)

            })
        })
}

function toggleModal(e) {
    if (e.id.slice(0, 1) == "s") {
        document.getElementById(e.id).parentNode.parentNode.parentNode.querySelector('.modal').classList.toggle('escondido')
        document.body.style.overflow = 'hidden'
    } else {
        document.getElementById(e.id).parentNode.querySelector('.modal').classList.toggle('escondido')
        document.body.style.overflow = 'hidden'
    }
}

var idV

function toggleModalAlterar(e) {
    if (e==null) {
        document.querySelector('.alterar').classList.toggle('escondido')
        document.body.style.overflow = 'hidden'
    } else {
        var placaV = document.querySelector('.alterar').querySelector("#veiPlaca")
        var modeloV = document.querySelector('.alterar').querySelector("#veiModelo")
        var marcaV = document.querySelector('.alterar').querySelector("#veiMarca")
        var tipoV = document.querySelector('.alterar').querySelector("#veiTipo")
        idV = e.parentNode.parentNode.querySelector('#idV').innerHTML
        placaV.value = e.parentNode.parentNode.querySelector('#placa').innerHTML
        modeloV.value = e.parentNode.parentNode.querySelector('#modelo').innerHTML
        marcaV.value = e.parentNode.parentNode.querySelector('#marca').innerHTML
        tipoV.value = e.parentNode.parentNode.querySelector('#tipo').innerHTML
        if (e.id.slice(0, 1) == "s") {
            document.querySelector('.alterar').classList.toggle('escondido')
            document.body.style.overflow = 'hidden'
        } else {
            document.querySelector('.alterar').classList.toggle('escondido')
            document.body.style.overflow = 'hidden'
        }
    }
}

var idOp

function toggleModalAlterarOp(e) {
    if (e==null) {
        document.querySelector('.alterarOp').classList.toggle('escondido')
        document.body.style.overflow = 'hidden'
    } else {
        var descricao = document.querySelector('.alterarOp').querySelector("#descOperacao")
        idOp = e.parentNode.parentNode.querySelector('#id-op').innerHTML
        descricao.value = e.parentNode.parentNode.querySelector('#descricao').innerHTML
        if (e.id.slice(0, 1) == "s") {
            document.querySelector('.alterarOp').classList.toggle('escondido')
            document.body.style.overflow = 'hidden'
        } else {
            document.querySelector('.alterarOp').classList.toggle('escondido')
            document.body.style.overflow = 'hidden'
        }
    }
}

function cadastrarVeiculo() {
    var placaV = document.querySelector("#veicPlaca")
    var modeloV = document.querySelector("#veicModelo")
    var marcaV = document.querySelector("#veicMarca")
    var tipoV = document.querySelector("#veicTipo")

    var veiculo = {
        "placa": placaV.value,
        "modelo": modeloV.value,
        "marca": marcaV.value,
        "tipo": tipoV.value,
    }

    fetch("http://localhost:5000/veiculos", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(veiculo)
    })
        .then(response => {
            if (response !== undefined) {
                window.location.reload()
            }
        })
}

function cadastrarOperacao() {
    var idMotorista = document.querySelector("#opMot")
    var descricaoO = document.querySelector("#opDesc")

    var operacao = {
        "id_motorista": parseInt(idMotorista.value),
        "descricao": descricaoO.value,
    }

    fetch("http://localhost:5000/operacao", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(operacao)
    })
        .then(response => {
            if (response !== undefined) {
                window.location.reload()
            }
        })
}

function cadastrarManutencao() {
    var valor = document.querySelector("#manValor")
    var descricaoM = document.querySelector("#manDesc")

    var manutencao = {
        "valor": parseFloat(valor.value),
        "descricao": descricaoM.value,
    }

    fetch("http://localhost:5000/manutencao", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(manutencao)
    })
        .then(response => {
            if (response !== undefined) {
                window.location.reload()
            }
        })
}

function cadastrarMotorista() {
    var cpf = document.querySelector("#cpf")
    var cnh = document.querySelector("#cnh")
    var nome = document.querySelector("#nome")

    var motorista = {
        "cpf": cpf.value,
        "cnh": cnh.value,
        "nome": nome.value
    }

    fetch("http://localhost:5000/motorista", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(motorista)
    })
        .then(response => {
            if (response !== undefined) {
                window.location.reload()
            }
        })
}

function alterarVeiculo() {
    var placaV = document.querySelector("#veiPlaca")
    var modeloV = document.querySelector("#veiModelo")
    var marcaV = document.querySelector("#veiMarca")
    var tipoV = document.querySelector("#veiTipo")

    var veiculo = {
        "id": idV,
        "placa": placaV.value,
        "modelo": modeloV.value,
        "marca": marcaV.value,
        "tipo": tipoV.value,
    }

    console.log(veiculo)

    fetch("http://localhost:5000/veiculos", {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(veiculo)
    })
        .then(response => {
            console.log(response);
        })
}

function alterarOperacao() {
    var data_retorno = document.querySelector("#dataRetorno")
    var descricao = document.querySelector("#descOperacao")

    var operacao = {
        "id": idOp,
        "data_retorno": data_retorno.value,
        "descricao": descricao.value,
    }

    console.log(operacao)

    fetch("http://localhost:5000/operacao", {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(operacao)
    })
        .then(response => {
            console.log(response);
        })
}