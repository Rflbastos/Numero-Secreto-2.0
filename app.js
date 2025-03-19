let listaDeNumerosSorteados = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){// Boa pratica para não repetir comandos parecidos
    let campo = document.querySelector(tag);//modificaçõe no index sem alterar o HTML se
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial() {
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um numero entre 1 e ${numeroMaximo}`);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute > numeroSecreto) {
        exibirTextoNaTela('p',`O número secreto é menor que ${chute}`);
      } else if(chute < numeroSecreto) {
        exibirTextoNaTela('p',`O número secreto é maior que ${chute}`);
       } else {
        exibirTextoNaTela('h1','Parabéns você Acertou!');  
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        }

        tentativas++;  
        limparCampo ();
      }

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random()* numeroMaximo + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
   
   if(quantidadeDeElementosNaLista == numeroMaximo){
    listaDeNumerosSorteados = [];
   }
   if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
   } else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}