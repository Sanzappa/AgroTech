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

                veiculos.querySelector("#id").innerHTML = e.id
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

function toggleModal() {
    document.querySelector('.modal').classList.toggle('escondido')
    document.body.style.overflow = 'hidden'
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