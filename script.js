
function toggleFullscreen() {
    const btn = document.querySelector('.btn-fs');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        btn.classList.add('hidden');
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}
document.addEventListener("fullscreenchange", () => {
    const btn = document.querySelector('.btn-fs');
    if (!document.fullscreenElement) btn.classList.remove('hidden');
});

function checkAnswer(isCorrect) {
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.innerText = "Correto! A Guerra Fria impulsionou ditaduras e regimes militares em diversos países latino-americanos alinhados aos blocos.";
        feedback.style.color = "#48bb78";
    } else {
        feedback.innerText = "Incorreto. Tente novamente!";
        feedback.style.color = "#f56565";
    }
}
