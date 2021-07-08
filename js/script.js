const navButton = document.querySelector(".nav__burger-button");
const burgerMenu = document.querySelector(".nav__burger-menu")

navButton.addEventListener("click", ()=>{
    navButton.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    document.querySelector("nav").classList.toggle("active");
    document.querySelector("body").classList.toggle("lock");
    document.querySelector(".nav__left-content").classList.toggle("active")
})

const menuLinks = document.querySelectorAll(".menu-link[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
      
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector("nav").offsetHeight;
        navButton.click();


      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

const likeButton = document.querySelectorAll(".like")

likeButton.forEach(element => {
element.addEventListener("click", ()=>{
    element.classList.toggle("active")
})})