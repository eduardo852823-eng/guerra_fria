
function requestFS() {
    const btn = document.querySelector('.btn-fs');
    btn.classList.add('hidden');
    document.documentElement.requestFullscreen();
}

document.addEventListener("keydown", (e) => { 
    if(e.key === "f") requestFS(); 
});

// Detectar saída do modo tela cheia para mostrar o botão novamente
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        document.querySelector('.btn-fs').classList.remove('hidden');
    }
});
