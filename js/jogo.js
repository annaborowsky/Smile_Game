// Variáveis globais
let vida = 5;
let tentativas = 0;
let jogar = true;
let cartaSeguraIndex;

// Elementos do DOM
const btnReiniciar = document.getElementById("reiniciar");
const btnJogarNovamente = document.getElementById("joganovamente");

// Sorteia posição da carta segura (0-4)
function sortearCartaSegura() {
    cartaSeguraIndex = Math.floor(Math.random() * 5);
    console.log('Carta segura sorteada:', cartaSeguraIndex); // Para debug
}

// Função para reiniciar o jogo
function reiniciar() {
    vida = 5;
    tentativas = 0;
    jogar = true;
    sortearCartaSegura();
    jogarNovamente();
    atualizaPlacar();
    btnJogarNovamente.classList.replace("invisivel", "visivel");
    btnReiniciar.classList.replace("visivel", "invisivel");
}

// Função para jogar novamente
function jogarNovamente() {
    jogar = true;
    sortearCartaSegura();
    document.querySelectorAll('.game-card').forEach(card => {
        card.className = "game-card";
        card.innerHTML = "";
    });
}

// Atualiza o placar
function atualizaPlacar() {
    document.getElementById("resposta").innerHTML = `Vida: ${vida} | Tentativas: ${tentativas}`;
}

// Revela o Leocádio
function revelaLeocadio(obj) {
    obj.className = "game-card leocadio";
    const img = new Image();
    img.src = "https://sig.ifc.edu.br/shared/verFoto?idFoto=2920941&key=597bf61badb6dcbf083a9d70c27742b2";
    img.alt = "Leocádio";
    obj.appendChild(img);
}

// Revela o Asafe (carta segura)
function revelaSegura(obj) {
    obj.className = "game-card seguro";
    const img = new Image();
    img.src = "https://sig.ifc.edu.br/shared/verFoto?idFoto=2451758&key=2ffed9b49f9737a174b58b3e816f5b26";
    img.alt = "Asafe";
    obj.appendChild(img);
}

// Função principal CORRIGIDA
function verifica(obj) {
    if (!jogar) {
        alert('Clique em "Jogar novamente"');
        return;
    }
    
    jogar = false;
    tentativas++;

    // VERIFICAÇÃO CORRIGIDA - compara com o índice sorteado
    if (parseInt(obj.id) === cartaSeguraIndex) {
        revelaSegura(obj);
    } else {
        revelaLeocadio(obj);
        vida--;
        
        if (vida <= 0) {
            document.getElementById("gameOverSound").play();
            setTimeout(() => {
                alert("Game Over!");
                reiniciar();
            }, 500);
        }
    }

    if (tentativas >= 5) {
        btnJogarNovamente.classList.replace("visivel", "invisivel");
        btnReiniciar.classList.replace("invisivel", "visivel");
        document.getElementById("gameOverSound").play();
    }

    atualizaPlacar();
}

// Inicialização do jogo
sortearCartaSegura(); // Sorteia a primeira posição
btnJogarNovamente.addEventListener("click", jogarNovamente);
btnReiniciar.addEventListener("click", reiniciar);
atualizaPlacar();