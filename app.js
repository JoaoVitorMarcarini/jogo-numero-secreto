let listaDeNumeroSorteado = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Digite um número entre 1 e ${numeroLimite}`);  
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativa = `você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById("reiniciar").removeAttribute('disabled');
    }else{
        if(chute < numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é maior');
        }else{
            exibirTextoNaTela('p', 'O número secreto é menor');
        }
        tentativas ++;
        limparTela();
    }
}

function limparTela(){
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumeroNaLista = listaDeNumeroSorteado.length;

    if(quantidadeDeNumeroNaLista == numeroLimite){
        listaDeNumeroSorteado = [];
    }

    if (listaDeNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumeroSorteado.push(numeroEscolhido)
        console.log(listaDeNumeroSorteado)
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparTela();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute('disabled', true);
}