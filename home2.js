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

// PASTE THIS AT THE BOTTOM OF home2.js

window.addEventListener("load", function () {
    const music = document.getElementById("bgMusic");

    if (!music) {
        console.log("Audio element not found");
        return;
    }

    function startMusic() {
        music.volume = 1;
        music.muted = false;

        music.play()
            .then(() => {
                console.log("Music started successfully");
            })
            .catch((error) => {
                console.log("Playback blocked:", error);
            });

        // Remove after first interaction
        window.removeEventListener("click", startMusic);
        window.removeEventListener("scroll", startMusic);
        window.removeEventListener("touchstart", startMusic);
    }

    // First user interaction triggers music
    window.addEventListener("click", startMusic);
    window.addEventListener("scroll", startMusic);
    window.addEventListener("touchstart", startMusic);
});
