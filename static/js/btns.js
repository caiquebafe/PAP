// Main equivale ao Javascript principal da nossa página

/* A forma de escrita pode parecer "confusa", mas é uma boa prática de programação, que visa
facilitar a resolução de erros e permite maiores possibilidades de escalonamento
*/

const Main = {  
    // init será a função reponsável por "iniciar" as ações do código
    init: function(){
        this.cacheSelectors()
        this.bindEvents()
    },

    // CacheSelectors tem como função "chamar" os componentes da página
    // o $ simboliza que é um elemento proveniente do HTML
    cacheSelectors: function(){
        this.$butEscola = document.querySelector('#escola')
        this.$butRadio = document.querySelector('#radio')
        this.$butProjeto = document.querySelector('#projeto')
        this.$imagem = document.querySelector('.imagePlace')
        this.$paragrafo = document.querySelector('.paragrafo')
        this.$titulo = document.querySelector('.titulo')
    },

    
    // BindEvents será responsável por mapear os eventos de cada elemento
    bindEvents: function(){
        this.$butEscola.onclick = this.Events.butEscola_click
        this.$butRadio.onclick = this.Events.butRadio_click
        this.$butProjeto.onclick = this.Events.butProjeto_click
    },

    // Aqui é onde são feitos os comandos que bindEvents recebe
    Events:{
        
        butEscola_click: function(){
            Main.$butEscola.classList.add('ativo')
            Main.$butRadio.classList.remove('ativo')
            Main.$butProjeto.classList.remove('ativo')

            Main.$titulo.innerText = 'A escola'
            Main.$imagem.src = '/static/images/Escola.jpg'
            Main.$paragrafo.innerHTML = 'A <span>Escola Secundária de Rocha Peixoto</span> é um verdadeiro <span>centro de aprendizado e crescimento</span> para jovens estudantes. Tendo um compromisso incansável em fornecer uma <span>educação de qualidade</span>, preparando os alunos para <span>enfrentar os desafios do mundo atual</span>.'
            
            /* chamar novamente as funções, pois pode acontecer da página "perder" os eventos
            após um inner HTML
            */
            Main.cacheSelectors()  
            Main.bindEvents()
        },

        butRadio_click: function(){
            Main.$butEscola.classList.remove('ativo')
            Main.$butRadio.classList.add('ativo')
            Main.$butProjeto.classList.remove('ativo')

            Main.$titulo.innerText = 'A Rádio'
            Main.$imagem.src = '/static/images/radioFoto.png'
            Main.$paragrafo.innerHTML = 'A <span>Rádio ESRP</span> tem como compromisso <span>levar música e entretenimento</span> para o seu dia. Você vai poder <span>curtir os maiores sucessos do momento, clássicos que nunca saem de moda</span> e até mesmo descobrir <span>novos talentos musicais</span> dentro da nossa escola. Afinal, a música tem o <span>poder de unir e animar a todos</span>.'
            
            /* chamar novamente as funções, pois pode acontecer da página "perder" os eventos
            após um inner HTML
            */
            Main.cacheSelectors()  
            Main.bindEvents()
        },

        butProjeto_click: function(){
            Main.$butEscola.classList.remove('ativo')
            Main.$butRadio.classList.remove('ativo')
            Main.$butProjeto.classList.add('ativo')

            Main.$titulo.innerText = 'O projeto'
            Main.$imagem.src = '/static/images/Logo icone.png'
            Main.$paragrafo.innerHTML = 'Me chamo <span>Caique Silva</span>, tenho 18 anos e sou aluno do curso de <span>Gestão de equipamentos informáticos</span>. O projeto surgiu como ideia para minha Prova de Aptidão Profissional<span>(PAP)</span>, após passar pelos corredores e sentir a necessidade de uma <span>rádio</span> que fosse <span>mais integrada com a comunidade escolar</span>.'
            
            /* chamar novamente as funções, pois pode acontecer da página "perder" os eventos
            após um inner HTML
            */
            Main.cacheSelectors()  
            Main.bindEvents()
        },
    }
}
Main.init()