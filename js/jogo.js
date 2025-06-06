let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const btnReiniciar = document.getElementById("reiniciar");
const btnJogarNovamente = document.getElementById("joganovamente");

function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.classList.add("visivel");
  btnJogarNovamente.classList.remove("invisivel");
  btnReiniciar.classList.add("invisivel");
  btnReiniciar.classList.remove("visivel");
}

function jogarNovamente() {
  jogar = true;
  document.querySelectorAll('div[id="0"], div[id="1"], div[id="2"], div[id="3"]').forEach(div => {
    div.className = "inicial";
    div.innerHTML = "";
  });

  document.getElementById("imagem")?.remove();
  document.getElementById("imageme")?.remove();
}

function atualizaPlacar(acertos, tentativas) {
  desempenho = tentativas ? (acertos / tentativas) * 100 : 0;
  document.getElementById("resposta").textContent = 
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

function setResultado(obj, className, imgId, imgSrc) {
  obj.className = className;
  const img = new Image(100);
  img.id = imgId;
  img.src = imgSrc;
  obj.appendChild(img);
}

function verifica(obj) {
  if (!jogar) return alert('Clique em "Jogar novamente"');
  
  jogar = false;
  tentativas++;

  if (tentativas === 4) {
    btnJogarNovamente.classList.add("invisivel");
    btnJogarNovamente.classList.remove("visivel");
    btnReiniciar.classList.add("visivel");
    btnReiniciar.classList.remove("invisivel");
  }

  const sorteado = Math.floor(Math.random() * 4);
  const objSorteado = document.getElementById(sorteado);

  if (obj.id == sorteado) {
    setResultado(obj, "acertou", "imagem", "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg");
    acertos++;
  } else {
    setResultado(objSorteado, "acertou", "imagem", "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg");
    setResultado(obj, "errou", "imageme", "https://cdn.pixabay.com/photo/2020/02/08/00/40/emoji-4828792_1280.png");
  }

  atualizaPlacar(acertos, tentativas);
}

btnJogarNovamente.addEventListener("click", jogarNovamente);
btnReiniciar.addEventListener("click", reiniciar);