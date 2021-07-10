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

// spoilers

const spoilersArray = document.querySelectorAll("[data-spoilers]");
if (spoilersArray.length > 0){
  const spoilersRegular = Array.from(spoilersArray).filter(function(item, index, self){
    return !item.dataset.spoilers.split(",")[0];
  });
  if(spoilersRegular.length > 0) {
    initSpoilers(spoilersRegular);
  }
}

function initSpoilers(spoilersArray, matchMedia = false) {
  spoilersArray.forEach(spoilersBlock => {
    spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
    if(matchMedia.matches || !matchMedia){
      spoilersBlock.classList.add('_init');
      initSpoilerBody(spoilersBlock);
      spoilersBlock.addEventListener("click", setSpoilerAction);
    }else{
      spoilersArray.forEach(spoilersBlock => {
        spoilersBlock.classList.remove('_init');
        initSpoilerBody(spoilersBlock, false);
        spoilersBlock.removeEventListener("click", setSpoilerAction);
      })
    }
  }
  )
}

function initSpoilerBody(spoilerBlock, hideSpoilerBody = true) {
  const spoilerTitles = spoilerBlock.querySelectorAll('[data-spoiler]');
  if (spoilerTitles.length > 0){
    spoilerTitles.forEach(spoilerTitle => {
      if (hideSpoilerBody) {
        spoilerTitle.removeAttribute('tabindex');
        if (!spoilerTitle.classList.contains("_active")){
          spoilerTitle.nextElementSibling.hidden = true;
        }
      } else{
        spoilerTitle.setAttribute('tabindex', '-1');
        spoilerTitle.nextElementSibling.hidden = false;
        
      }
    })
  }
}

function setSpoilerAction(e) {
  const el = e.target;
  if(el.hasAttribute("data-spoiler") || el.closest("[data-spoiler]")){
    const spoilerTitle = el.hasAttribute("data-spoiler") ? el : el.closest("[data-spoiler]");
    const spoilersBlock = spoilerTitle.closest("[data-spoilers]");
    const oneSpoiler = spoilersBlock.hasAttribute("data-one-spoiler") ? true : false;
    if(!spoilersBlock.querySelectorAll("._slide").length){
      if(oneSpoiler && !spoilerTitle.classList.contains("_active")){
        hideSpoilerBody(spoilersBlock);
      }
      spoilerTitle.classList.toggle("_active");
      _slideToggle(spoilerTitle.nextElementSibling, 500);
    }
    e.preventDefault();
  }
}

function hideSpoilerBody(spoilersBlock) {
  const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
  if(spoilerActiveTitle){
    spoilerActiveTitle.classList.remove('_active');
    _slideUp(spoilerActiveTitle.nextElementSibling, 500);
  }
}

let _slideUp = (target, duration = 500) =>{
  if(!target.classList.contains('_slide')){
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(()=> {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration)
  }
}
let _slideDown = (target, duration = 500) =>{
  if(!target.classList.contains('_slide')){
    target.classList.add('_slide');
    if(target.hidden){
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(()=> {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration)
  }
}
let _slideToggle = (target, duration = 500) => {
  if(target.hidden){
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }

}
// spoilers end

const exempleItem = document.querySelectorAll(".exemple__img");

exempleItem.forEach(element => {
  element.addEventListener("mouseenter", ()=>{
      
    if(element.getAttribute("data-order") == "before"){
        let parentEl = element.parentElement;
        let broEl = parentEl.querySelector(".exemple__img[data-order=after]");
        broEl.style.width="40%";
        element.style.width="60%"
    } else{
      let parentEl = element.parentElement;
        let broEl = parentEl.querySelector(".exemple__img[data-order=before]");
        broEl.style.width="40%";
        element.style.width="60%"
    };
  })
  element.addEventListener("mouseleave", ()=>{
      
    if(element.getAttribute("data-order") == "before"){
        let parentEl = element.parentElement;
        let broEl = parentEl.querySelector(".exemple__img[data-order=after]");
        broEl.style.width="50%";
        element.style.width="50%"
    } else{
      let parentEl = element.parentElement;
        let broEl = parentEl.querySelector(".exemple__img[data-order=before]");
        broEl.style.width="50%";
        element.style.width="50%"
    };
  })
  
});

const swiper = new Swiper('.swiper-container', {
 
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },})