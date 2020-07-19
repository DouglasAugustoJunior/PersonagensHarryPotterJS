var campoFiltro = document.querySelector("#busca")

campoFiltro.addEventListener("input", function () {

    if (this.value.length > 0) { // Se houver texto

        while (tabelaPesquisa.firstChild) { // Limpa a lista para não duplicar
            tabelaPesquisa.removeChild(tabelaPesquisa.firstChild)
        }

        divPadrao.classList.add("invisivel")
        divPesquisa.classList.remove("invisivel")
        let lista = []
        personagens.forEach(personagem => {
            var expressao = new RegExp(this.value, "i")

            if (expressao.test(personagem.name)) { // Valida o nome com o regex
                lista.push(personagem)
            }
        })
        atualizaTabela(lista, true)
    } else { // Input vazio
        divPadrao.classList.remove("invisivel")
        divPesquisa.classList.add("invisivel")
    }
})