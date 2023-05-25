class despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados() {
        for(let i in this) {
            if (this[i] == undefined || this[i] == null || this[i] == '') {
                return false
            }
        }
        return true
    }
}
    

class BD {
    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        let id = localStorage.getItem('id')
        return parseInt(id) + 1
    }
    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }  
}

function cadastrarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value  

    let despesas = new despesa(ano, mes, dia, tipo, descricao, valor)

    
    let bd = new BD()

    if (despesas.validarDados()) {
        bd.gravar(despesas)
        console.log('Sucesso!')
    }
    else {
        console.log('Dados invalidos')
    }

    
}