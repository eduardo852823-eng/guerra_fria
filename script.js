
function toggleFullscreen() {
    const btn = document.querySelector('.btn-fs');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        btn.classList.add('hidden');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

document.addEventListener("fullscreenchange", () => {
    const btn = document.querySelector('.btn-fs');
    if (!document.fullscreenElement) {
        btn.classList.remove('hidden');
    }
});
