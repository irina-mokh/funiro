 /*//Hero-slider
window.addEventListener("resize", function() {
  const slider = document.querySelector(".slider");
  const sliderItems = document.querySelectorAll(".slide");
  let i = 1;
  const btnPrev = document.querySelector(".arrow-prev");
  const btnNext = document.querySelector(".arrow-next");
  let sliderControls = document.querySelectorAll(".slider-dot");

  let width = document.querySelector(".hero-slider__img").offsetWidth + 32;
  let position = -width;

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
});
*/
class Slider {
  constructor (slider, alignSide, i, gap) {
    this.sliderName = slider;
    this.slider = document.querySelector(slider + " .slider");
    this.slides = Array.prototype.slice.call(document.querySelectorAll(slider + " .slide"));
    this.gap = gap;
    

    this.sliderDots = Array.prototype.slice.call(
    document.querySelectorAll(slider + " .slider-dot"));
    let self = this;
        
    this.alignSide = alignSide;
    this.i = i;

    this.sliderDots.forEach((index) =>{
      index.addEventListener("click", (evt) => {
        evt.preventDefault;
        this.i = this.sliderDots.indexOf(index); 
        this.sliderRefresh();
      })
    });
  
    this.btnNext = document.querySelector(slider + " .arrow-next");
    this.btnPrev = document.querySelector(slider + " .arrow-prev");

  
    this.btnPrev.addEventListener("click", function(evt){
      evt.preventDefault();
      self.i--;
      if (self.i < 0) {
        self.i = self.slides.length - 1;
      };
      self.sliderRefresh();
    });
    
    this.btnNext.addEventListener("click", function(evt){
      evt.preventDefault();
      self.i++;
      if (self.i >= self.slides.length){
        self.i = 0;
      };
      self.sliderRefresh();
    });
  }

  sliderRefresh() {
    this.activeDot = document.querySelector(this.sliderName + " .slider-dot_active");
    this.activeDot.classList.remove("slider-dot_active");
    this.sliderDots[this.i].classList.add("slider-dot_active");

    this.activeSlide = document.querySelector(this.sliderName + " .slide_active");
    this.activeSlide.classList.remove("slide_active");
    this.slides[this.i].classList.add("slide_active");

    let slideWidth = document.querySelector(this.sliderName + " .slide:not(.slide_active)").offsetWidth + this.gap;

    if (this.alignSide === "right") {
      this.slider.style.marginRight = -slideWidth * (this.slides.length - this.i - 1) + 'px';
    } else if (this.alignSide === "left") {
      this.slider.style.marginLeft = -slideWidth * (this.i) + 'px';
    };
  }; 
};

const heroSlider = new Slider (".hero-slider", "right", 1, 32);
const roomSlider = new Slider (".rooms-slider", "left", 0, 24);


window.addEventListener("resize", function() {
  heroSlider.sliderRefresh();
  roomSlider.sliderRefresh();
});

heroSlider.sliderRefresh();
roomSlider.sliderRefresh();

  
//Header fill for scroll
let header = document.querySelector(".header");

window.addEventListener('scroll', function() {
    if(window.pageYOffset > 50) {
        header.classList.add("header_fill");
    } else {
       header.classList.remove("header_fill");
    }
});