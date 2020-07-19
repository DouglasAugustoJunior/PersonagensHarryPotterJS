var pagina = document.querySelector("#paginacao") // Pega o a pagina no HTML para atualizar
const animateFootprints = "images/pegadas-gif.gif" // GIF que aparece ao clicar na imagem
const url = 'https://www.potterapi.com/v1/characters?key=$2a$10$QqUiCuF1E7WOBL5e4VS3Ku0xO0QEYvpLkpfI3W8.nA7yPLlsX.WsO' // Link da API
var personagens // Lista de personagens
var totalPaginas // Total das páginas
var limitItems = 6 // Limite de personagens por página

buscaDados(url)

$(document).ready(function () { // Animação inicial
    $("#swear").click(function () { // Quando clicar na imagem
        $("#swear").fadeOut('slow', function () { // A imagem vai sumir
            $("#swearimg").attr('src', animateFootprints) // Atribui o GIF
            $("#swear").fadeIn('fast', function () { // Exibe o GIF
                $("#swear").fadeOut('slow', function () { // Esconde o GIF
                    $('.hidden').removeClass("hidden") // Mostra os campos ocultos
                })
            })
        })
    })
})

function buscaDados(url) { // Pega os dados na API
    let xhr = new XMLHttpRequest()

    xhr.open("GET", url) // URL com o nome digitado

    xhr.addEventListener("load", function () { // Bate na API

        if (xhr.status == 200) { // Se retornar sucesso

            var resposta = xhr.responseText // pega a resposta

            personagens = JSON.parse(resposta) // Transforma a resposta em um array de objetos JSON

            mudaPagina(personagens, 1) // Exibe a primeira página

        } else {
            alert("Erro ao buscar dados na API!")
        }
    })

    xhr.send()

}

function tradutor(palavra) { // Traduz algumas palavras para exibição
    if (palavra) {
        switch (palavra) {
            case 'half-blood':
                return 'meio-sangue'
                break
            case 'pure-blood':
                return 'puro-sangue'
                break
            case 'unknown':
                return 'desconhecido'
                break
            case 'muggle':
                return 'trouxa'
                break
            case 'muggle-born':
                return 'nascido trouxa'
                break
            case 'quarter-villa':
                return 'quarto de campo'
                break
            case 'squib':
                return 'aborto'
                break
            case 'human':
                return 'humano'
                break
            case 'ghost':
                return 'fatasma'
                break
            case 'part-human':
                return 'parte-humano'
                break
            case 'part-goblin':
                return 'parte-goblin'
                break
            case 'werewolf':
                return 'lobisomem'
                break
            case 'half-giant':
                return 'meio-gigante'
                break
            case 'human (metamorphmagus)':
                return 'humano (metamorphmagus)'
                break
            case 'centaur':
                return 'centauro'
                break
            case 'hippogriff':
                return 'hipogrifo'
                break
            case 'cat':
                return 'gato'
                break
            case 'house-elf':
                return 'elfo doméstico'
                break
            case 'Great Grey Owl':
                return 'coruja cinzenta'
                break
            case 'giant':
                return 'gigante'
                break
            case 'portrait':
                return 'retrato'
                break
            case 'phoenix':
                return 'fênix'
                break
            case 'three-headed dog':
                return 'cachorro de três cabeças'
                break
            case 'Snowy Owl':
                return 'Coruja-das-neves'
                break
            case 'scops owl':
                return 'Coruja'
                break
            case 'toad':
                return 'sapo'
                break
            default:
                return palavra
                break
        }
    }
}