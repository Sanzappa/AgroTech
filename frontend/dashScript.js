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
            //Grafico de Barras

            let VeiculoLivre = response.reduce((contador, disponibilidade) => disponibilidade.disponivel ? contador + 1 : contador, 0)
            let VeiculoOcupado = response.reduce((contador, disponibilidade) => !disponibilidade.disponivel ? contador + 1 : contador, 0)
            const DoughVChart = document.getElementById('myChart');

            new Chart(DoughVChart, {
                type: 'doughnut',
                data: {
                    labels: ['Disponivel', 'Indisponivel'],
                    datasets: [{
                        label: 'Disponibilidade Veicular',
                        data: [VeiculoLivre, VeiculoOcupado],
                        borderWidth: 1,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                        ]
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        }
                    }
                }
            });

            
            const DoughVTChart = document.getElementById('doughVChart2');

            new Chart(DoughVTChart, {
                type: 'doughnut',
                data: {
                    labels: ['Venda', 'Carga', 'Visita'],
                    datasets: [{
                        label: 'Tipo Veicular',
                        data: [VeiculoVenda, VeiculoCarga, VeiculoVisita],
                        borderWidth: 1,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ]
                    }]
                },
                options: {
                    
                }
            });
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
                operacao.querySelector("#placaOp").innerHTML = e.veiculos.placa
                operacao.querySelector("#nome-motorista").innerHTML = e.motorista.nome
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
                manutencao.querySelector("#placaM").innerHTML = e.veiculos.placa
                manutencao.querySelector("#data-inicio").innerHTML = new Date(e.data_inicio).toLocaleDateString('pt-br', { timeZone: 'UTC' })
                if (e.data_fim != null) {
                    manutencao.querySelector("#data-fim").innerHTML = new Date(e.data_fim).toLocaleDateString('pt-br', { timeZone: 'UTC' })
                } else {
                    manutencao.querySelector("#data-fim").innerHTML = e.data_fim
                }
                manutencao.querySelector("#valorMan").innerHTML = "R$" + e.valor
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
                console.log(motorista);

                motorista.querySelector("#id-mot").innerHTML = e.id
                motorista.querySelector("#cpf").innerHTML = e.cpf
                motorista.querySelector("#cnh").innerHTML = e.cnh
                motorista.querySelector("#nome").innerHTML = e.nome
                if (e.disponivel == true) {
                    motorista.querySelector("#disponivelM").innerHTML = "Disponivel"
                    motorista.querySelector("#disponivelM").style.color = "#009c27"
                } else {
                    motorista.querySelector("#disponivelM").innerHTML = "Indisponivel"
                    motorista.querySelector("#disponivelM").style.color = "#fa291e"
                }

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
    if (e == null) {
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
    if (e == null) {
        document.querySelector('.alterarOp').classList.add('escondido')
        document.body.style.overflow = 'auto'
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

var idMan

function toggleModalAlterarMan(e) {
    if (e == null) {
        document.querySelector('.alterarMan').classList.add('escondido')
        document.body.style.overflow = 'auto'
    } else {
        var descricao = document.querySelector('.alterarMan').querySelector("#descMan")
        var valor = document.querySelector('.alterarMan').querySelector("#valorM")
        idMan = e.parentNode.parentNode.querySelector('#id-man').innerHTML
        valor.value = e.parentNode.parentNode.querySelector('#valorMan').innerHTML.slice(2)
        console.log(valor.value)
        descricao.value = e.parentNode.parentNode.querySelector('#descricao-man').innerHTML
        if (e.id.slice(0, 1) == "s") {
            document.querySelector('.alterarMan').classList.toggle('escondido')
            document.body.style.overflow = 'hidden'
        } else {
            document.querySelector('.alterarMan').classList.toggle('escondido')
            document.body.style.overflow = 'hidden'
        }
    }
}

var idMot

function toggleModalAlterarMot(e) {
    if (e == null) {
        document.querySelector('.alterarMot').classList.add('escondido')
        document.body.style.overflow = 'auto'
    } else {
        var nome = document.querySelector('.alterarMot').querySelector("#nomeMot")
        idMot = e.parentNode.parentNode.querySelector('#id-mot').innerHTML
        nome.value = e.parentNode.parentNode.querySelector('#nome').innerHTML
        if (e.id.slice(0, 1) == "s") {
            document.querySelector('.alterarMot').classList.toggle('escondido')
            document.body.style.overflow = 'hidden'
        } else {
            document.querySelector('.alterarMot').classList.toggle('escondido')
            document.body.style.overflow = 'hidden'
        }
    }
}

function toggleModalCadastrarOp(e) {
    document.querySelector('.cadastrarOp').classList.toggle('escondido')
    if (e == null) {
        document.body.style.overflow = 'auto'
    } else {
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

function cadastrarOperacao() {
    var idMotorista = document.querySelector("#opMot")
    var descricaoO = document.querySelector("#opDesc")
    var idVeiculo = document.querySelector("#opV")

    var operacao = {
        "id_motorista": parseInt(idMotorista.value),
        "id_veiculo" : parseInt(idVeiculo.value),
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
    var placaMan = document.querySelector("#manVeic")
    var valor = document.querySelector("#manValor")
    var descricaoM = document.querySelector("#manDesc")

    var manutencao = {
        "id_veiculo": parseInt(placaMan.value),
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
            if (response !== undefined) {
                window.location.reload()
            }
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
            if (response !== undefined) {
                window.location.reload()
            }
        })
}

function alterarManutencoes() {
    var data_fim = document.querySelector("#dataFim")
    var valor = document.querySelector("#valorM")
    var descricao = document.querySelector("#descMan")

    var manutencao = {
        "id": idMan,
        "data_fim": data_fim.value,
        "valor": parseFloat(valor.value),
        "descricao": descricao.value,
    }

    console.log(manutencao)

    fetch("http://localhost:5000/manutencao", {
        "method": "PUT",
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

function alterarMotoristas() {
    var nome = document.querySelector("#nomeMot")

    var motorista = {
        "id": idMot,
        "nome": nome.value
    }

    console.log(motorista)

    fetch("http://localhost:5000/motorista", {
        "method": "PUT",
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

function excluirMotoristas(e) {

    var idMot = e.querySelector("#id-mot").innerHTML

    var motorista = {
        "id": idMot
    }

    console.log(motorista)

    fetch("http://localhost:5000/motorista", {
        "method": "DELETE",
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
        .catch(err => {
            console.error(err);
        });
}

function excluirOperacoes(e) {

    var idOp = e.querySelector("#id-op").innerHTML

    var operacao = {
        "id": idOp
    }

    console.log(operacao)

    fetch("http://localhost:5000/operacao", {
        "method": "DELETE",
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
        .catch(err => {
            console.error(err);
        });
}

function excluirVeiculos(e) {

    var idV = e.querySelector("#idV").innerHTML

    var veiculo = {
        "id": idV
    }

    console.log(veiculo)

    fetch("http://localhost:5000/veiculos", {
        "method": "DELETE",
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
        .catch(err => {
            console.error(err);
        });
}

function alterarGrafico(e) {
    var optionallGr = document.querySelector(".optionallGr")
    optionallGr.classList.remove("optionallGr")

    document.getElementById(e.id).classList.add("optionallGr")

    var pages = document.querySelectorAll(".dash-container")

    pages.forEach(p => {
        p.classList.add("model")
        if (e.id == p.id) {
            p.classList.remove("model")
        }
    })
}

function deslogar() {
    window.location.href = "./login.html"
    window.localStorage.removeItem('uinfo')
}