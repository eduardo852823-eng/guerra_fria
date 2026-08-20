// ===================== FULLSCREEN TOGGLE =====================
const fsBtn = document.getElementById('fullscreenBtn');

function toggleFullscreen(){
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

fsBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('fullscreenchange', () => {
  fsBtn.setAttribute('title', document.fullscreenElement ? 'Sair da tela cheia' : 'Tela cheia');
});

// ===================== QUIZ =====================
const quizData = [
  {
    question: "O que a Doutrina Truman (1947) estabeleceu?",
    options: [
      "A contenção do comunismo em qualquer parte do mundo",
      "A reunificação imediata da Alemanha",
      "O fim da corrida armamentista",
      "A criação da ONU"
    ],
    correct: 0,
    feedback: "A Doutrina Truman marcou o compromisso dos EUA em conter a expansão comunista globalmente, servindo de base ideológica para décadas de intervenções."
  },
  {
    question: "O que simbolizou a construção do Muro de Berlim em 1961?",
    options: [
      "O fim da Guerra Fria",
      "A divisão física e ideológica entre os blocos capitalista e socialista",
      "Uma aliança entre EUA e URSS",
      "A independência da Alemanha Oriental"
    ],
    correct: 1,
    feedback: "O Muro de Berlim se tornou o símbolo mais concreto da Cortina de Ferro, separando famílias e materializando a divisão entre os dois blocos."
  },
  {
    question: "Qual evento levou o mundo mais perto de uma guerra nuclear direta entre EUA e URSS?",
    options: [
      "O lançamento do Sputnik",
      "A Guerra da Coreia",
      "A Crise dos Mísseis de Cuba (1962)",
      "A Queda do Muro de Berlim"
    ],
    correct: 2,
    feedback: "Em 1962, a instalação de mísseis soviéticos em Cuba levou os EUA e a URSS a treze dias de tensão extrema, o momento mais próximo de um confronto nuclear direto."
  },
  {
    question: "Como a Guerra Fria influenciou a América Latina a partir dos anos 1960?",
    options: [
      "A região ficou isolada dos conflitos ideológicos",
      "Os EUA apoiaram ditaduras militares anticomunistas na região",
      "A URSS anexou territórios latino-americanos",
      "A América Latina se uniu politicamente sob um único governo"
    ],
    correct: 1,
    feedback: "Temendo 'novas Cubas', os EUA apoiaram, treinaram e financiaram regimes militares anticomunistas em países como Brasil, Chile e Argentina."
  },
  {
    question: "O que foi a Operação Condor?",
    options: [
      "Uma missão espacial conjunta EUA-URSS",
      "Um acordo de desarmamento nuclear",
      "Uma rede de cooperação entre ditaduras do Cone Sul para perseguir opositores",
      "Um plano de reconstrução econômica da América Latina"
    ],
    correct: 2,
    feedback: "A Operação Condor articulou ditaduras sul-americanas em uma rede secreta de repressão transnacional, com apoio de inteligência dos Estados Unidos."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const quizContainer = document.getElementById('quizContainer');
const quizResult = document.getElementById('quizResult');
const quizScoreText = document.getElementById('quizScoreText');
const quizRestart = document.getElementById('quizRestart');
const quizProgressBar = document.getElementById('quizProgressBar');

function renderQuestion(){
  answered = false;
  const q = quizData[currentQuestion];
  quizProgressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;

  quizContainer.innerHTML = `
    <div class="quiz-question">
      <span class="quiz-count">Pergunta ${currentQuestion + 1} de ${quizData.length}</span>
      <h3>${q.question}</h3>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button class="quiz-option" data-index="${i}">${opt}</button>`).join('')}
      </div>
      <div class="quiz-feedback" id="quizFeedback"></div>
      <div class="quiz-nav">
        <button class="btn-primary" id="quizNextBtn" disabled>${currentQuestion === quizData.length - 1 ? 'Ver resultado' : 'Próxima'}</button>
      </div>
    </div>
  `;

  const optionButtons = quizContainer.querySelectorAll('.quiz-option');
  const nextBtn = document.getElementById('quizNextBtn');
  const feedbackEl = document.getElementById('quizFeedback');

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if(answered) return;
      answered = true;
      const chosen = parseInt(btn.dataset.index, 10);
      const isCorrect = chosen === q.correct;

      optionButtons.forEach(b => {
        b.disabled = true;
        const idx = parseInt(b.dataset.index, 10);
        if(idx === q.correct){
          b.classList.add('correct');
        } else if(idx === chosen){
          b.classList.add('incorrect');
        }
      });

      feedbackEl.textContent = q.feedback;
      feedbackEl.classList.add('show', isCorrect ? 'ok' : 'no');

      if(isCorrect) score++;
      nextBtn.disabled = false;
    });
  });

  nextBtn.addEventListener('click', () => {
    if(currentQuestion < quizData.length - 1){
      currentQuestion++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  });
}

function finishQuiz(){
  quizProgressBar.style.width = '100%';
  quizContainer.classList.add('hidden');
  quizResult.classList.remove('hidden');
  const pct = Math.round((score / quizData.length) * 100);
  let msg = '';
  if(pct === 100) msg = 'Perfeito! Domínio total sobre a Guerra Fria.';
  else if(pct >= 60) msg = 'Muito bom! Você entende bem o período.';
  else msg = 'Vale revisar o material acima e tentar de novo.';
  quizScoreText.textContent = `Você acertou ${score} de ${quizData.length} perguntas (${pct}%). ${msg}`;
}

quizRestart.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;
  quizResult.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  renderQuestion();
});

renderQuestion();
