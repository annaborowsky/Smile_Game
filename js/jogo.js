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
  btnJogarNovamente.className = "visivel";
  btnReiniciar.className = "invisivel";
}

function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");

  for (let i = 0; i < divis.length; i++) {
    if (["0", "1", "2", "3"].includes(divis[i].id)) {
      divis[i].className = "inicial";
      divis[i].innerHTML = ""; // Limpa conteúdo anterior
    }
  }

  const imagem = document.getElementById("imagem");
  if (imagem) imagem.remove();

  const imageme = document.getElementById("imageme");
  if (imageme) imageme.remove();
}

function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " +
    acertos +
    " Tentativas: " +
    tentativas +
    " Desempenho: " +
    Math.round(desempenho) +
    "%";
}

function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src =
    "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  obj.appendChild(img);
}

function errou(obj) {
  obj.className = "errou";
  const imge = new Image(100);
  imge.id = "imageme";
  imge.src ="https://cdn.pixabay.com/photo/2020/02/08/00/40/emoji-4828792_1280.png";
  obj.appendChild(imge);
}

function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas === 4) {
      btnJogarNovamente.className = "invisivel";
      btnReiniciar.className = "visivel";
    }

    let sorteado = Math.floor(Math.random() * 4);

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
      errou(obj);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

btnJogarNovamente.addEventListener("click", jogarNovamente);
btnReiniciar.addEventListener("click", reiniciar);
