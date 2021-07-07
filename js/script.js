const navButton = document.querySelector(".nav__burger-button");
const burgerMenu = document.querySelector(".nav__burger-menu")

navButton.addEventListener("click", ()=>{
    navButton.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    document.querySelector("nav").classList.toggle("active");
    document.querySelector("body").classList.toggle("lock");
    document.querySelector(".nav__left-content").classList.toggle("active")
})