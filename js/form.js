var cadastrar = document.querySelector("#cadastrar") // Pega o botão Cadastrar no HTML
var tabela = document.querySelector("#tabela") // Tabela padrão no HTML
var tabelaPesquisa = document.querySelector("#tabela-pesquisa") // Tabela exibida na pesquisa
var divPadrao = document.querySelector("#padrao") // Tabela e paginação normal
var divPesquisa = document.querySelector("#pesquisa") // DIV da tabela de pesquisa
var fechar = document.querySelector("#fechar") // Pega o botão Fechar do modal no HTML
var paginasHTML = document.querySelector("#paginacao") // Páginas no HTML

cadastrar.addEventListener("click", function (e) { // Ao clicar em cadastrar
    e.preventDefault() // evita que a página recarregue

    var form = document.querySelector("#formulario") // Pega os dados inseridos no formulário

    var personagem = obtemPersonagem(form) // Pega os dados inseridos no Form

    var erros = validaPersonagem(personagem) // Valida cada campo do Form

    if (erros.length > 0) { // Se houver erros
        exibeMensagensDeErro(erros) // Mostra na tela
        return // Para antes de executar os próximos passos
    }

    cadastraPersonagem(personagem) // Insere o personagem na tabela

    form.reset() // Limpa o Form

    document.querySelector("#mensagens-erro").innerHTML = "" // Limpa as mensagens de erro

})

pagina.addEventListener("click", function (e) { // Ao clicar em uma nova página
    e.preventDefault() // evita que a página recarregue
    if (e.srcElement.textContent) { // valida se existe um valor
        let paginaAtual = e.srcElement.textContent
        mudaPagina(personagens, paginaAtual) // atualiza a página e a tabela
    }
})

function obtemPersonagem(form) { // Pega os dados do Form

    var personagem = {
        name: form.nome.value,
        role: form.funcao.value,
        house: form.casa.value,
        school: form.escola.value,
        species: form.especie.value,
        bloodStatus: form.sangue.value,
    }

    return personagem
}

function validaPersonagem(personagem) { // Verifica se os dados estão corretos

    var erros = []

    if (personagem.name.length == 0) {
        erros.push("O nome não pode ficar em branco!!")
    }

    if (personagem.role.length == 0) {
        erros.push("A função não pode ficar em branco!!")
    }

    if (personagem.house.length == 0) {
        erros.push("A casa não pode ficar em branco!!")
    }

    if (personagem.school.length == 0) {
        erros.push("A escola não pode ficar em branco!!")
    }

    if (personagem.species.length == 0) {
        erros.push("A espécie não pode ficar em branco!!")
    }

    if (personagem.bloodStatus.length == 0) {
        erros.push("O sangue não pode ficar em branco!!")
    }

    return erros
}

function exibeMensagensDeErro(erros) { // Exibe as mensagens de erro
    var ul = document.querySelector("#mensagens-erro") // Pega o elemento para inserir as mensagens
    ul.innerHTML = "" // Limpa para não acumular erros anteriores

    erros.forEach(function (erro) { // Para cada erro
        let li = document.createElement("li") // Cria um li
        li.classList.add("alert") // Adiciona a classe de alerta
        li.classList.add("alert-danger") // Adiciona a classe de alerta
        li.textContent = erro // Atribui a mensagem de erro
        ul.appendChild(li) // Adiciona no ul
    })

}

function montaIcone(icone) { // Exibe imagens dos ícones
    var td = document.createElement("td")
    var img = document.createElement("img")
    img.src = `images/${icone}.png`
    img.classList.add('icone')

    td.appendChild(img)
    return td
}

function montaTd(dado, classe) { // Monta a célula
    var td = document.createElement("td")
    if (classe) {
        td.classList.add(classe)
    }
    switch (dado) {
        case 'Hufflepuff':
            return montaIcone(dado)
            break
        case 'Gryffindor':
            return montaIcone(dado)
            break
        case 'Slytherin':
            return montaIcone(dado)
            break
        case 'Ravenclaw':
            return montaIcone(dado)
            break
        default:
            td.textContent = dado
            break
    }

    return td
}

function montaTr(personagem) { // Monta a linha da tabela
    let personagemTr = document.createElement("tr")

    personagemTr.appendChild(montaTd(personagem.nome, ""))
    personagemTr.appendChild(montaTd(personagem.funcao, ""))
    personagemTr.appendChild(montaTd(personagem.casa, ""))
    personagemTr.appendChild(montaTd(personagem.escola, ""))
    personagemTr.appendChild(montaTd(personagem.especie, ""))
    personagemTr.appendChild(montaTd(personagem.sangue, ""))

    return personagemTr
}

function adicionaPersonagemNaTabela(personagem, pesquisa) { // Insere na tabela
    let personagemTr = montaTr(personagem)
    if (pesquisa) {
        tabelaPesquisa.appendChild(personagemTr)
    } else {
        tabela.appendChild(personagemTr)
    }
    fechar.click()
}

function mudaPagina(items, pageActual) { // Atualiza a tabela e a paginação conforme a página atual
    let result = [] // itens da página atual
    totalPaginas = Math.ceil(items.length / limitItems) // total de páginas
    atualizaPaginacao(totalPaginas, pageActual) // Atualiza a paginação no HTML
    let count = (pageActual * limitItems) - limitItems // de onde essa página começa
    let delimiter = count + limitItems // onde a página termina
    if (pageActual <= totalPaginas) { // Se a página for válida
        for (let i = count; i < delimiter; i++) { // para cada item
            if (items[i] != null) { // se não estiver vazio
                result.push(items[i]) // adiciona para exibir
            }
            count++
        }
    }
    atualizaTabela(result) // retorna lista da página atual
}

function atualizaPaginacao(paginas, paginaAtual) { // Atualiza a paginação no HTML

    while (paginasHTML.firstChild) { // Limpa a lista de páginas para não duplicar
        paginasHTML.removeChild(paginasHTML.firstChild)
    }

    for (let i = 0; i < paginas; i++) {
        let li = document.createElement("li")
        li.classList.add('page-item')
        if (paginaAtual && paginaAtual - 1 == i) {
            li.classList.add('disabled')
        }
        let a = document.createElement("a")
        a.classList.add('page-link')
        a.setAttribute('href', "#")
        a.textContent = i + 1
        li.appendChild(a)
        paginasHTML.appendChild(li)
    }
}

function atualizaTabela(lista, pesquisa) { // Atualiza a tabela no HTML

    while (tabela.firstChild && !pesquisa) { // Limpa a lista para não duplicar
        tabela.removeChild(tabela.firstChild)
    }

    if (lista) {
        lista.forEach(personagem => {
            let person = {
                nome: personagem.name,
                funcao: personagem.role,
                casa: personagem.house,
                escola: personagem.school,
                especie: tradutor(personagem.species),
                sangue: tradutor(personagem.bloodStatus)
            }
            adicionaPersonagemNaTabela(person, pesquisa)
        })
    }
}

function cadastraPersonagem(personagem) { // Adiciona o personagem no array
    personagens.push(personagem)
    mudaPagina(personagens, totalPaginas) // Vai para última página onde está o novo registro
}