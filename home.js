window.addEventListener("scroll", function () {
    let logo = document.querySelector(".logo");

    if (window.scrollY > 200) {
        logo.classList.add("hide");
    } else {
        logo.classList.remove("hide");
    }
});

let toggle = document.querySelector(".menu-toggle");
let menu = document.querySelector(".navbar ul");

toggle.addEventListener("click", function () {
    menu.classList.toggle("active");
});
