window.addEventListener("scroll", function () {
    let logo = document.querySelector(".logo");

    if (window.scrollY > 200) {
        logo.classList.add("hide");
    } else {
        logo.classList.remove("hide");
    }
});