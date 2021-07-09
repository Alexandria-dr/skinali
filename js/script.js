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

const priceItem = document.querySelectorAll(".price__item");

priceItem.forEach(element => {
  element.addEventListener("mouseenter", ()=>{
      
    if(element.getAttribute("data-number") == "first"){
        let parentEl = element.parentElement;
        let broEl = parentEl.querySelector(".price__item[data-number=second]");
        broEl.querySelector(".price__item_img").style.height="160px";
    } else{
      let parentEl = element.parentElement;
        let broEl = parentEl.querySelector(".price__item[data-number=first]");
        broEl.querySelector(".price__item_img").style.height="160px";
    };
  })
  element.addEventListener("mouseleave", ()=>{
      
    if(element.getAttribute("data-number") == "first"){
        let parentEl = element.parentElement;
        let broEl = parentEl.querySelector(".price__item[data-number=second]");
        broEl.querySelector(".price__item_img").style.height="250px";
    } else{
      let parentEl = element.parentElement;
        let broEl = parentEl.querySelector(".price__item[data-number=first]");
        broEl.querySelector(".price__item_img").style.height="250px";
    };
  })
  
});