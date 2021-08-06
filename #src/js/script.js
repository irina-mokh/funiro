//Slider
const slider = document.querySelector(".slider");
const sliderItems = document.querySelectorAll(".slide");
let i = 1;
const btnPrev = document.querySelector(".arrow-prev");
const btnNext = document.querySelector(".arrow-next");
let sliderControls = document.querySelectorAll(".slider-dot");

let slideWidth = document.querySelector(".hero-slider__img").offsetWidth + 32;
let position = -slideWidth;
let width = slideWidth;

btnPrev.addEventListener("click", function(evt){
  evt.preventDefault();
  i--;
  if (i < 0) {
    i = sliderItems.length - 1;
  }
  sliderRefresh(i);
});

btnNext.addEventListener("click", function(evt){
  evt.preventDefault();
  i++;
  if (i >= sliderItems.length){
    i = 0;
  }
  sliderRefresh(i);
});

function sliderRefresh(i) {
  slider.style.marginRight = (position + width * (i-1)) + 'px';
  let sliderDot = document.querySelector(".slider-dot_active");
  sliderDot.classList.remove("slider-dot_active");
  sliderControls[i].classList.add("slider-dot_active");
};

sliderControls.forEach((dot) =>{
  dot.addEventListener("click", (evt) => {
    evt.preventDefault;
    let arr = Array.prototype.slice.call(sliderControls);
    let i = arr.indexOf(dot); 
    sliderRefresh(i);
  })
});

sliderRefresh(i);
window.addEventListener("resize", function() {
  sliderRefresh(i)
});

//Header fill for scroll
let header = document.querySelector(".header");

window.addEventListener('scroll', function() {
    if(window.pageYOffset > 50) {
        header.classList.add("header_fill");
    } else {
       header.classList.remove("header_fill");
    }
});