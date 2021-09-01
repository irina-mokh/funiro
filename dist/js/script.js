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

// Catalog "show more"
const moreBtn = document.querySelector('.show-more-btn');

moreBtn.addEventListener("click", function(evt){
  evt.preventDefault();
  getProducts(moreBtn);
});

async function getProducts(btn) {
  if(!btn.classList.contains("_hold")) {
    btn.classList.add("_hold");
    const file = "json/products.json";
    let response = await fetch(file);
    if (response.ok) {
      let result = await response.json();
      loadProducts(result);
      btn.classList.remove("_hold");
      btn.remove();
    } else {
      alert ("error");
    }
  }
}

function loadProducts(data) {
  const catalog = document.querySelector(".catalog__list");

  data.products.forEach(item => {
    console.log(item.id);
    const productID = item.id;
    const productURL = item.url;
    const productImg = item.image;
    const productTitle = item.title;
    const productText = item.text;
    const productPrice = item.price;
    const productOldPrice= item.priceOld;
    const productShareURL = item.shareUrl;
    const productLikeURL = item.likeUrl;
    const productLabels = item.labels;

    let productTemplateStart = `<li data-id="${productID}" class="product">`;
			let productTemplateEnd = `</li>`;

			let productTemplateLabels = '';
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				productLabels.forEach(labelItem => {
					productTemplateLabelsContent += `<span class="label label_${labelItem.type}">${labelItem.value}</span>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
	    	<img class="product__img"src="img/products/${productImg}" alt="${productTitle}">
	    `;

			let productTemplateContent = `
		    <div class="product__text">
			    <h3 class="product__title">${productTitle}</h3>
			    <p class="product__desc">${productText}</p>
          <p class="product__price">${productPrice}</p>
          <span class="product__price_old">${productOldPrice}</span>
		    </div>
    	`;

			let productTemplateActions = `
        <div class="product__layout"></div>
        <div class="product__btns">
          <button class="btn btn_white btn_buy">Add to cart</button>
          <a href="${productShareURL}" class="btn btn_share   _icon-share"><span class="btn__text">Share</  span></a>
          <a href="${productLikeURL}" class="btn btn_fvrt   _icon-favorite"><span class="btn__text">Like</  span></a>
        </div>
	    `;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateContent;
      productTemplate += productTemplateActions;
			productTemplate += productTemplateEnd;


      catalog.insertAdjacentHTML("beforeend", productTemplate);
  })
}

// cart
const products = document.querySelectorAll(".product");
const cart = document.querySelector(".cart");
const cartCounter = document.querySelector(".cart__counter");
const cartList = document.querySelector(".cart__list");

updateCartCounter(parseInt(cartCounter.innerHTML));
cart.addEventListener("click", (evt)=>{
  evt.preventDefault();
  let counter = parseInt(cartCounter.innerHTML);
  if (counter > 0) {
    cartList.classList.add("cart__list_active");
  } else {
    cartList.classList.remove("cart__list_active");
  }
});

products.forEach(prod => {
  const btnBuy = prod.querySelector(".btn_buy")
  btnBuy.addEventListener("click", (evt) => {
    evt.preventDefault();
    addToCart(prod, btnBuy);
  });
})

function addToCart(prod, btnBuy) {
  const prodImg = prod.querySelector(`.product__img`);

  if (!btnBuy.classList.contains("_hold")) {
    btnBuy.classList.add("_hold");
    
    const prodClone = prodImg.cloneNode(true);
    prodClone.classList.add("fly");
    prodClone.style.cssText = 
    `
    width: ${prodImg.offsetWidth}px;
    height: ${prodImg.offsetHeight}px;
    top: ${prodImg.getBoundingClientRect().top}px;
    left: ${prodImg.getBoundingClientRect().left}px;
    `;
    document.body.append(prodClone);
    prodClone.style.cssText = 
    `
    width: 1px;
    height: 1px;
    top: ${cart.getBoundingClientRect().top}px;
    left: ${cart.getBoundingClientRect().left}px;
    opacity: 0;
    `;

    prodClone.addEventListener("transitionend", function(){
      if(prodClone.classList.contains("fly")) {
        prodClone.remove();
      }
    });

    btnBuy.classList.remove("_hold");
  }
  createCartItem(prod);
  updateCartCounter(parseInt(cartCounter.innerHTML)+1);
}

function createCartItem (prod){
  const prodImg = prod.querySelector(`.product__img`);
  const prodTitle = prod.querySelector(`.product__title`); 
  let cartProduct = document.createElement("li");
  cartProduct.classList.add("cart-product");
  cartProduct.innerHTML = 
  `
    <a href="#" class="cart-product__image">${prodImg.outerHTML}</a>
    <div class="cart-product__content">
      <a href="#" class="cart-product__title"> ${prodTitle.innerHTML}</a>
      <div class="cart-product__quantity">Quantity:<span>1</span></div>
      <a href="#"class="cart-product__delete">Delete</a>
    </div>
  `;
  cartList.appendChild( cartProduct);

  let deleteBtn = cartProduct.querySelector(".cart-product__delete");
  deleteBtn.addEventListener("click", evt=>{
    evt.preventDefault();
    deleteBtn.closest(".cart-product").remove();
    updateCartCounter(parseInt(cartCounter.innerHTML)-1);
  })
}

function updateCartCounter (counter) {
  cartCounter.innerHTML = counter;
  
  if (counter == 0) {
    cartCounter.style.cssText = 
    'opacity: 0;'
  } else {
    cartCounter.style.cssText = 
    'opacity: 1;'
  };
}

// Footer menu

let accordArrows = document.querySelectorAll(".footer__arrow");

accordArrows.forEach(accordArrow=>{
   accordArrow.addEventListener("click", (evt)=>{
    evt.preventDefault();
    accordArrow.classList.toggle("footer__arrow_active");
     accordArrow.nextElementSibling.classList.toggle("footer__menu_active");
   })
 })