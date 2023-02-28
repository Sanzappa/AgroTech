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
                operacao.querySelector("#data-saida").innerHTML = e.data_saida
                operacao.querySelector("#data-retorno").innerHTML = e.data_retorno
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
                manutencao.querySelector("#data-inicio").innerHTML = e.data_inicio
                manutencao.querySelector("#data-fim").innerHTML = e.data_fim
                manutencao.querySelector("#valor").innerHTML = e.valor
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
        console.log('teste')
        document.getElementById(e.id).parentNode.parentNode.parentNode.querySelector('.modal').classList.toggle('escondido')
        document.body.style.overflow = 'hidden'
    } else {
        document.getElementById(e.id).parentNode.querySelector('.modal').classList.toggle('escondido')
        document.body.style.overflow = 'hidden'
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