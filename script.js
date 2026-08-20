// ===================== SCROLL REVEAL =====================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

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
    question: "Como a Guerra Fria transformou a história da América Latina?",
    options: [
      "Promovendo a estabilidade democrática e o livre comércio através de alianças pacíficas entre os governos locais e a União Soviética",
      "Consolidando acordos de cooperação humanitária e financeira que erradicaram a pobreza e a desigualdade social na região",
      "Estimulando a criação de governos socialistas pacíficos e estáveis em todo o Cone Sul com o apoio direto dos Estados Unidos",
      "Causando a instauração de ditaduras militares violentas alinhadas à Doutrina de Segurança Nacional e a repressão política coordenada (como a Operação Condor)",
      "Isolando completamente o continente de qualquer conflito ideológico global, mantendo a soberania política intacta durante todo o século XX"
    ],
    correct: 3,
    feedback: "Temendo 'novas Cubas', os EUA apoiaram ditaduras militares anticomunistas alinhadas à Doutrina de Segurança Nacional, incluindo a repressão coordenada da Operação Condor."
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
