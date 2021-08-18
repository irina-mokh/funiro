class Slider {
  constructor (slider, alignSide, i, gap) {
    this.sliderName = slider;
    this.slider = document.querySelector(slider + " .slider");

    this.slides = Array.prototype.slice.call(document.querySelectorAll(slider + " .slide:not(.slide_pseudo)"));
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
        //self.loop();
      };
      self.sliderRefresh();
    });
    
    this.btnNext.addEventListener("click", function(evt){
      evt.preventDefault();
      self.i++;
      if (self.i >= self.slides.length){
        self.i = 0;
        //self.loop();
      };
      self.sliderRefresh();
    });

    this.pseudoLast = this.slides[0].cloneNode(true);
    this.pseudoLast.classList.remove("slide_active", "slide");
    this.pseudoLast.classList.add("slide_pseudo");

    this.pseudoFirst = this.slides[this.slides.length-1].cloneNode(true);
    this.pseudoFirst.classList.remove("slide_active", "slide");
    this.pseudoFirst.classList.add("slide_pseudo");

    this.slider.appendChild(this.pseudoLast);
    this.slider.insertBefore(this.pseudoFirst, this.slides[0]);
    
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
      this.slider.style.marginRight = -slideWidth * (this.slides.length + 1 - this.i - 1) + 'px';
    } else if (this.alignSide === "left") {
      this.slider.style.marginLeft = -slideWidth * (this.i + 1)  + 'px';
    };
  }; 

  /*loop() {
    let that = this;
    let size = this.slideWidth;
    this.slider.addEventListener("transitionend", function() {
      that.slides[that.i] === that.pseudoLast ? that.i = 0:that.i;
      that.slider.style.transition = "none";
      that.slider.style.transform = "translateX(" + (-that.i*size) + 'px)';
    }); 
  };*/
};

const heroSlider = new Slider (".hero-slider", "right", 1, 32);
const roomSlider = new Slider (".rooms-slider", "left", 0, 24);
const tipsSlider = new Slider (".tips-slider", "left", 1, 32);


window.addEventListener("resize", function() {
  heroSlider.sliderRefresh();
  roomSlider.sliderRefresh();
  tipsSlider.sliderRefresh();
});

heroSlider.sliderRefresh();
roomSlider.sliderRefresh();
tipsSlider.sliderRefresh();

  
//Header fill for scroll
let header = document.querySelector(".header");

window.addEventListener('scroll', function() {
    if(window.pageYOffset > 50) {
        header.classList.add("header_fill");
    } else {
       header.classList.remove("header_fill");
    }
});

//Gallery
let gallery = document.querySelector(".gallery__body");
let galCols = document.querySelectorAll(".gallery__col"); 
let galItems = document.querySelector(".gallery__items");

let speed = gallery.dataset.speed;

let positionX = 0;
let coordXpercentage = 0;

function scrollGallery() {
  let galItemsWidth = 0;
  galCols.forEach(element => {
    galItemsWidth += element.offsetWidth;
  });
  
  let widthDiff = galItemsWidth - gallery.offsetWidth;
  let distX = Math.floor(coordXpercentage - positionX);

  positionX = positionX + (distX * speed);
  let position = widthDiff / 200 * positionX;

  galItems.style.transform = `translate3d(${-position}px,0,0)`;

  if (Math.abs(distX) > 0) {
    requestAnimationFrame(scrollGallery);
  } else {
    gallery.classList.remove('_init');
  };
}

gallery.addEventListener("mousemove", function (e) {
  let galWidth = gallery.offsetWidth;
  let coordX = e.pageX - galWidth / 2;
  coordXpercentage = coordX / galWidth * 200;

  if (!gallery.classList.contains("_init")) {
    requestAnimationFrame(scrollGallery);
    gallery.classList.add("_init");
  }
});
