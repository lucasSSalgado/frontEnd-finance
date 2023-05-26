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
        if (id == null) {
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
    recuperarDespesas() {
        let listaDespesas = []
        let id = localStorage.getItem('id') 
        
        for (let i = 1; i <= id; i++){
            let item = JSON.parse(localStorage.getItem(i))

            if (item === null || item === undefined) {
                continue
            }
            item.id = i
            listaDespesas.push(item)
        }
        return listaDespesas
    }
    removerDespesa(id) {
        localStorage.removeItem(id)
    }
}

let bd = new BD()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor') 

    let despesas = new despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)    
    
    // const modal = document.getElementById('modal-box')
    const title = document.getElementById('title')
    const validationMsg = document.getElementById('validation-msg')
    const btn = document.getElementById('modal-validation-btn')
    const validationDiv = document.getElementById('validation-div')

    if (despesas.validarDados()) {
        bd.gravar(despesas)

        title.innerText = 'Sucesso'
        validationMsg.innerText = 'Dados gravados no banco de dados'
        btn.className = 'btn-success btn'
        validationDiv.className = 'text-success modal-header'        
        $('#modal-box').modal('show')   

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    }
    else {
        title.innerText = 'Erro de validacao'
        validationMsg.innerText = 'Ha campos obrigatorios que nao estao corretamente preenchidos'
        btn.className = 'btn-danger btn'
        validationDiv.className = 'text-danger modal-header'
        $('#modal-box').modal('show')
    }    
}

function carregarListaDespesas(){    
    let listaDespesas = bd.recuperarDespesas() 
    updateView(listaDespesas)  
}

function filterData() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let filterFields = new despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    let allData = bd.recuperarDespesas()
    let answer = {}

    if (filterFields.ano != ''){        
        answer = allData.filter(d => d.ano == filterFields.ano)
    } 
    if (filterFields.mes != ''){        
        answer = allData.filter(d => d.mes == filterFields.mes)
    }
    if (filterFields.dia != ''){
        answer = allData.filter(d => d.dia == filterFields.dia)
    }
    if (filterFields.descricao != ''){
        answer = allData.filter(d => d.descricao == filterFields.descricao)
    }
    if (filterFields.valor != ''){
        answer = allData.filter(d => d.valor == filterFields.valor)
    }
    if (filterFields.tipo != ''){
        answer = allData.filter(d => d.tipo == filterFields.tipo)
    } 
    
    updateView(answer)
}

function updateView(list) {
    const tbody = document.getElementById('despesas') 
    tbody.innerHTML = ''

    list.forEach(function(o) {
        let row = tbody.insertRow()
        let tipo = parseInt(o.tipo)

        switch (tipo) {
            case 1:
                tipo = 'alimentacao'
                break
            case 2:
                tipo = 'educacao'
                break
            case 3:
                tipo = 'lazer'
                break    
            case 4:
                tipo = 'saude'
                break  
            case 5:
                tipo = 'transporte'
                break            
        }

        row.insertCell(0).innerText = `${o.dia}/${o.mes}/${o.ano}`
        row.insertCell(1).innerText = tipo
        row.insertCell(2).innerText = o.descricao
        row.insertCell(3).innerText = o.valor
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = o.id
        btn.onclick = function() {
            bd.removerDespesa(this.id)
            window.location.reload()
        }
        row.insertCell(4).append(btn)
        
    })
}