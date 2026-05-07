window.addEventListener("scroll", function () {
    let logo = document.querySelector(".logo");

    if (window.scrollY > 200) {
        logo.classList.add("hide");
    } else {
        logo.classList.remove("hide");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("bgMusic");

    function startMusic() {
        music.muted = false;
        music.volume = 1;

        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("Music started");
                })
                .catch((error) => {
                    console.log("Playback blocked:", error);
                });
        }

        document.removeEventListener("click", startMusic);
        document.removeEventListener("scroll", startMusic);
        document.removeEventListener("touchstart", startMusic);
    }

    // Mobile + Desktop
    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("scroll", startMusic, { once: true });
    document.addEventListener("touchstart", startMusic, { once: true });
});
