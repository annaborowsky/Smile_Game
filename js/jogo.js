let vida = 5;
let tentativas = 0;
let jogar = true;

const btnReiniciar = document.getElementById("reiniciar");
const btnJogarNovamente = document.getElementById("joganovamente");

function reiniciar() {
  vida = 5;
  tentativas = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar();
  btnJogarNovamente.classList.replace("invisivel", "visivel");
  btnReiniciar.classList.replace("visivel", "invisivel");
}

function jogarNovamente() {
  jogar = true;
  const cartas = document.querySelectorAll("#game-container > div");

  cartas.forEach(carta => {
    carta.className = "inicial";
    carta.innerHTML = "";
  });
}

function atualizaPlacar() {
  document.getElementById("resposta").innerHTML =
    `Vida: ${vida} | Tentativas: ${tentativas}`;
}

function revelaLeocadio(obj) {
  obj.className = "leocadio";
  const img = new Image();
  img.style.width = '100%';
  img.style.height = '100%';
  img.src = "https://sig.ifc.edu.br/shared/verFoto?idFoto=2920941&key=597bf61badb6dcbf083a9d70c27742b2";
  img.alt = "Leocádio";
  obj.appendChild(img);
}

function revelaSegura(obj) {
  obj.className = "seguro";
  obj.textContent = "✓";
}

function verifica(obj) {
    if (!jogar) {
        alert('Clique em "Jogar novamente"');
        return;
    }
    
    jogar = false;
    tentativas++;

    // A carta segura é sempre a de id "4"
    if (obj.id === "4") {
        revelaSegura(obj);
    } else {
        revelaLeocadio(obj);
        vida--;
        if (vida <= 0) {
            // Toca o som de game over
            const gameOverSound = document.getElementById("gameOverSound");
            gameOverSound.play().catch(e => console.log("Não foi possível tocar o áudio:", e));
            
            setTimeout(() => {
                alert("Game Over! Você encontrou Leocádio muitas vezes!");
                reiniciar();
            }, 500);
        }
    }

    if (tentativas >= 5) {
        btnJogarNovamente.classList.replace("visivel", "invisivel");
        btnReiniciar.classList.replace("invisivel", "visivel");
        
        // Toca o som de game over quando perde pelas 5 vezes
        const gameOverSound = document.getElementById("gameOverSound");
        gameOverSound.play().catch(e => console.log("Não foi possível tocar o áudio:", e));
    }

    atualizaPlacar();
}
btnJogarNovamente.addEventListener("click", jogarNovamente);
btnReiniciar.addEventListener("click", reiniciar);

// Inicializa o placar
atualizaPlacar();