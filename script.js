// ==========================
// ======= FASE 1: PÁGINAS INICIAIS
// ==========================
document.getElementById("btnSim1").addEventListener("click", function () {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "flex";
});

document.getElementById("btnNao1").addEventListener("click", function () {
  location.reload();
});

document.getElementById("btnSim2").addEventListener("click", function () {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "flex";
});

document.getElementById("btnNao2").addEventListener("click", function () {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page1").style.display = "flex";
});

document.getElementById("btnSim3").addEventListener("click", function () {
  document.getElementById("page3").style.display = "none";
  document.getElementById("page4").style.display = "flex";
  const audio = new Audio("./audio_dignicima.MP3");
  audio.play();
  setTimeout(function () {
    document.getElementById("page4").style.display = "none";
    document.getElementById("page5").style.display = "flex";
    showOverlay()
  }, 5000);
});

// Botão que foge
const button = document.getElementById("btnNao3");
button.addEventListener("mouseover", function () {
  const posY = Math.random() * (window.innerHeight - button.offsetHeight);
  const posX = Math.random() * (window.innerWidth - button.offsetWidth);
  button.style.position = "absolute";
  button.style.top = `${posY}px`;
  button.style.left = `${posX}px`;
});

// ==========================
// ======= FASE 2: BOLHAS ANIMADAS
// ==========================
function getRandomColor() {
  var colors = [
      "#e03a3a",
      "#e03a3a",
      "#e03a3a",
      "#e03a3a",
      "#e03a3a",
      "#e03a3a",
    ],
    idx = Math.floor(colors.length * Math.random());
  return colors[idx];
}

function animateIt(el, dur, delay) {
  var animateEl = el.animate(
    [
      { opacity: 0, transform: "translate(-50%, -50%) scale(0)" },
      { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
      { opacity: 0, transform: "translate(-50%, -50%) scale(1.1)" },
    ],
    {
      duration: dur,
      easing: "ease-out",
      fill: "forwards",
      delay: delay || 0,
    }
  );
  return animateEl;
}

function createBubble() {
  var ns = "http://www.w3.org/2000/svg",
    bubble = document.createElement("div"),
    bubbleDummy = document.createElement("div"),
    heart = document.createElementNS(ns, "svg"),
    heartPath = document.createElementNS(ns, "path");

  heart.setAttribute("viewBox", "0 0 600 500");
  heartPath.setAttribute(
    "d",
    "M300,150 C500,10 600,300 300,400 C0,300 100,10 300,150"
  );
  bubble.classList.add("bubble");
  bubble.style.color = getRandomColor();
  bubbleDummy.classList.add("bubble-dummy");
  heart.classList.add("heart");

  heart.appendChild(heartPath);
  bubble.appendChild(bubbleDummy);
  bubble.appendChild(heart);
  document.body.appendChild(bubble);

  return {
    setPosition: function (x, y) {
      bubble.style.left = x + "px";
      bubble.style.top = y + "px";
    },
    _animate: function () {
      var animateBubble = animateIt(bubbleDummy, 1200),
        animateHeart = animateIt(heart, 2000);
      return {
        bubbleDur: 1200,
        heartDur: 2000,
      };
    },
    remove: function () {
      bubble.remove();
    },
  };
}

document.body.addEventListener("touchstart", handleDown, false);

function handleDown(e) {
  var _x = e.pageX,
    _y = e.pageY;

  var bubble = createBubble();
  bubble.setPosition(_x, _y);
  var animation = bubble._animate(),
    totalDelay = animation.bubbleDur + animation.heartDur;
  if (e.type) {
    createSound(20, 5000, 1, "sawtooth", 1);
  }
  setTimeout(() => {
    bubble.remove();
  }, totalDelay);
}

var w = document.body.clientWidth,
  h = document.body.clientHeight;

function bubbleUp() {
  var de = {
    pageX: Math.random() * w,
    pageY: Math.random() * h,
  };
  handleDown(de);
  setTimeout(bubbleUp, 200);
}
bubbleUp();

window.addEventListener(
  "resize",
  function () {
    w = document.body.clientWidth;
    h = document.body.clientHeight;
  },
  false
);

// ==========================
// ======= FASE 3: MENSAGENS POR SCROLL E BOTÕES SIM/NÃO
// ==========================
const messages = [
  "Hoje, se você soubesse de todos os momentos, bons e ruins que passamos jutos, teria assinado o contrato pela primeira vez?",
  "Quando vc assinou o contrato sabia das responsabilidades?",
  "Você assinaria de novo esse contrato hoje sabendo que as responsabilidades irão aumentar com o tempo?",
  "Entre todas as responsabilidades do produto, mesmo assim ele te faz bem?",
  "Vamos renovar esse contrato e garantir esse produto por mais 1 ano?",
];
let currentIndex = 0;
const textMessageEl = document.getElementById("textMessage");
const scrollArea = document.getElementById("scrollArea");
scrollArea.addEventListener("scroll", handleScroll);

function handleScroll() {
  const scrollTop = scrollArea.scrollTop;
  const viewportHeight = window.innerHeight;
  let newIndex = Math.floor(scrollTop / viewportHeight);
  if (newIndex >= messages.length) {
    newIndex = messages.length - 1;
  }
  if (newIndex !== currentIndex) {
    currentIndex = newIndex;
    fadeMessage(messages[newIndex]);
  }
}

function fadeMessage(newText) {
  textMessageEl.classList.add("opacity-0");
  setTimeout(() => {
    textMessageEl.textContent = newText;
    textMessageEl.classList.remove("opacity-0");
  }, 300);
}
fadeMessage(messages[0]);

const btnSimMessage = document.getElementById("btnSimMessage");
const btnNaoMessage = document.getElementById("btnNaoMessage");
btnSimMessage.addEventListener("click", function () {
  if (currentIndex < messages.length - 1) {
    currentIndex++;
    fadeMessage(messages[currentIndex]);
    scrollArea.scrollTop = currentIndex * window.innerHeight;
  } else {
    // Se já está na última pergunta, vai para a página 6
    document.getElementById("page5").style.display = "none";
    document.getElementById("page6").style.display = "flex";
  }
});
btnNaoMessage.addEventListener("click", function () {
  currentIndex = 0;
  fadeMessage(messages[currentIndex]);
  scrollArea.scrollTop = 0;
  console.log("Usuário clicou em Não, voltando ao início das perguntas.");
});

function runTests() {
  console.log("\n===== TESTES: Mensagens e Botões =====");
  console.log("Mensagem inicial =>", textMessageEl.textContent);
  console.log("Clicar Sim...");
  btnSimMessage.click();
  console.log("Agora deve ser a pergunta 2 =>", textMessageEl.textContent);
  console.log("Clicar Não...");
  btnNaoMessage.click();
  console.log(
    "Agora deve ter voltado para pergunta 1 =>",
    textMessageEl.textContent
  );
}
window.onload = runTests;

function showOverlay() {
  // Cria o elemento overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // branco com 80% de opacidade
  overlay.style.backdropFilter = 'blur(5px)'; // efeito de desfoque
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.transition = 'opacity 1s ease-out';
  overlay.style.opacity = '1';

  // Cria o elemento de mensagem
  const message = document.createElement('div');
  message.style.fontSize = '54px';
  message.style.fontWeight = 'bold';
  message.style.color = '#000';
  message.textContent = "Vamos relembra um pouco como foi esse 1 anos que estamos juntos?";

  // Adiciona a mensagem ao overlay
  overlay.appendChild(message);
  document.body.appendChild(overlay);

  // Após 10 segundos, inicia o fade-out e remove o overlay do DOM
  setTimeout(() => {
    overlay.style.opacity = '0';
    overlay.addEventListener('transitionend', () => {
      if (overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
      }
    });
  }, 8000);
}