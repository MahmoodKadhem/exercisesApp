"use strict";

// let index

// // Detect if user is on IE browser and load polyfills for fetching data
var isIE = !!window.MSInputMethodContext && !!document.documentMode;

if (isIE) {
   // Create Promise polyfill script tag
    var promiseScript = document.createElement("script");
    promiseScript.type = "text/javascript";
    promiseScript.src = "/assets/script/polyfill.min.js";
    // promiseScript.src =
    //     "https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js";

  // Create Fetch polyfill script tag
    var fetchScript = document.createElement("script");
    fetchScript.type = "text/javascript";
    fetchScript.src =
        "/assets/script/fetch.umd.min.js";

  // Add polyfills to head element
    document.head.appendChild(promiseScript);
    document.head.appendChild(fetchScript);

  // Wait for the polyfills to load and run the function. 
  // We could have done this differently, 
  // but I've found it to work well for my use-cases
    setTimeout(function () {
        window
            .fetch("../../data-index.json").then(function(response){return response.json()}).then(function(data) { index=data; } );
    }, 1000);
} else {
  // If fetch is supported, just run the fetch function
  fetch("../../data-index.json").then(function(response){return response.json()}).then(function(data) { index=data; } );
}

/////////////////////////////////////////////////////////////////////
///////////////////////// card loader////////////////////////////////
function creatCard(data){
  const cardContainer = document.querySelector(".card-container");
  const cardEle = document.createElement('div');
  const checkbox = document.createElement('div');
  const sliderEle = document.createElement('div');
  const lbtn = document.createElement('button');
  const rbtn = document.createElement('button');
  const dots = document.createElement('div');
  const contentEle = document.createElement('div');
  const titleEle = document.createElement('h3');
  const tagsEle = document.createElement('p');
  const cardBtns = document.createElement('div');
  const openBtn = document.createElement('a');
  const magnifyBtn = document.createElement('a');
  
  // checkbox element
  checkbox.classList.add('checkbox','card__checkbox');
  checkbox.innerHTML = `<label id="title" class="checkbox__label">
    <input name="title" type="checkbox">
    <span class="checkbox__mark"></span>
  </label>`
 
  // add classes to the created elements
  cardEle.classList.add('card');
  sliderEle.classList.add('card__slider');
  contentEle.classList.add('card__content');
  titleEle.classList.add('h-3');
  tagsEle.classList.add('p--tags');
  lbtn.classList.add('card__slider__btn','card__slider__btn--left');
  lbtn.innerHTML = '&lt;';
  rbtn.classList.add('card__slider__btn','card__slider__btn--right');
  rbtn.innerHTML = '&gt;';
  dots.classList.add('card__dots');
  cardBtns.classList.add('card__btns');
  openBtn.classList.add('card__btn');
  magnifyBtn.classList.add('card__btn');

  // create the imgs elements for each image in the array
  data.imgurls.forEach(function(img){
    let counter = 1
    const slideEle = document.createElement('div');
    slideEle.classList.add('card__slide');
    const imgEle = document.createElement('img');
    imgEle.src = img;
    imgEle.alt = data.title + counter
    counter = counter + 1
    slideEle.appendChild(imgEle);
    sliderEle.appendChild(slideEle);
  });

  // append the slider btns and dots to the slider element
  sliderEle.appendChild(lbtn);
  sliderEle.appendChild(rbtn);
  sliderEle.appendChild(dots);

  // create the content title and tages
  titleEle.textContent = data.title
  tagsEle.innerHTML = '<span class="p--b">Tags: </span>' + data.tags.join(', ');
  
  // card btns text content
  openBtn.textContent = "open file";
  magnifyBtn.textContent = "magnify";

  // add the btns urls
  openBtn.href="/"
  magnifyBtn.href="/"

  // append the card btns to the btns element
  cardBtns.appendChild(openBtn);
  cardBtns.appendChild(magnifyBtn);

  // add the title and tages to the content element
  contentEle.appendChild(titleEle);
  contentEle.appendChild(tagsEle);
  contentEle.appendChild(cardBtns);

  // append all elements to the card element
  cardEle.appendChild(checkbox);
  cardEle.appendChild(sliderEle);
  cardEle.appendChild(contentEle);
  

  // append the card element to the card container
  cardContainer.appendChild(cardEle);

  activateSlider(sliderEle)
}

console.log(data);
let testdata = {
      "id": "01",
      "title":"angry face",
      "imgurls":["Exercises Daigram/Exercises Images/Face/Angry.gif","Exercises Daigram/Exercises Images/Lower limb/Foot and Ankle/Strengthening/Ankle DF with Theraband.gif"],
      "tags":[ "ACL", "PCL", "knee", "hamstring", "shoulder", "head", "knees", "toes"]
   }

creatCard(testdata);


/////////////////////////////////////////////////////////////////////
///////////////////////// side navigation////////////////////////////


const sideNavMenu = document.querySelector(".side-nav");

if (sideNavMenu) {
  const sideNavBtn = document.querySelector(".side-nav__btn");

  sideNavBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sideNavBtn.classList.toggle("side-nav__btn--active");
    sideNavMenu.classList.toggle("side-nav--active");
  });
}


/////////////////////////////////////////////////////////////////////
//////////////////////////// side bar ///////////////////////////////


const sideBarMenu = document.querySelector(".sidebar");

if (sideBarMenu) {
  const sideBarBtn = document.querySelector("#sidebarBtn");

  sideBarBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sideBarMenu.classList.toggle("sidebar--active");
  });
}

/////////////////////////////////////////////////////////////////////
////////////////////// activate slider for the created cards ///////////////////////////////////////

function activateSlider(slider) {
  var slides = Array.prototype.slice.call(slider.querySelectorAll(".card__slide"), 0);
  var btnLeft = slider.querySelector(".card__slider__btn--left");
  var btnRight = slider.querySelector(".card__slider__btn--right");
  var dotContainer = slider.querySelector(".card__dots");
  var curSlide = 0,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    isDragging = false;
  var maxSlide = slides.length; // ///////////////touch screen slider//////////
  // remove the left click

  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }; // creating the dots Functions

  var createDots = function createDots() {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        '<button class="card__dots__dot" data-slide="' + i + '"></button>'
      );
    });
  };

  var activateDot = function activateDot(slide) {
    Array.prototype.slice.call(slider.querySelectorAll(".card__dots__dot"), 0).forEach(function (dot) {
      dot.classList.remove("card__dots__dot--active");
    });
    slider
      .querySelector('.card__dots__dot[data-slide="' + slide + '"]')
      .classList.add("card__dots__dot--active");
  };

  var goToSlide = function goToSlide(slide, translate) {
    if (translate === void 0) {
      translate = 0;
    }

    slides.forEach(function (s, i) {
      return (s.style.transform =
        "translateX(" + (translate + 100 * (i - slide)) + "%)");
    });
  }; // Next slide

  var nextSlide = function nextSlide() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  var prevSlide = function prevSlide() {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  var init = function init() {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init(); // Event handlers

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  slider.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("card__dots__dot")) {
      var slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  }); // ///touch screen slider functions

  var touchStart = function touchStart(event, index) {
    isDragging = true;
    curSlide = index;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
  };

  var touchEnd = function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    var movedBy = currentTranslate - prevTranslate;
    console.log(movedBy);

    if (movedBy < -80) {
      nextSlide();
    } else if (movedBy > 80) {
      prevSlide();
    }

    setPositionByIndex();
  };

  var touchMove = function touchMove(event) {
    if (isDragging) {
      var currentPosition = getPositionX(event);
      var Translate = prevTranslate + currentPosition - startPos;

      if (Translate < 100 && Translate > -100) {
        currentTranslate = Translate;
      } else if (Translate > 100) {
        currentTranslate = 100;
      } else if (Translate < -100) {
        currentTranslate = -100;
      }
    }
  };

  var getPositionX = function getPositionX(event) {
    return event.touches[0].clientX;
  };

  var animation = function animation() {
    setCardPosition();

    if (isDragging) {
      requestAnimationFrame(animation);
    }
  };

  var setCardPosition = function setCardPosition() {
    goToSlide(curSlide, currentTranslate);
    activateDot(curSlide);
  };

  var setPositionByIndex = function setPositionByIndex() {
    goToSlide(curSlide);
    activateDot(curSlide);
    currentTranslate = 0;
    prevTranslate = currentTranslate;
    setCardPosition();
  }; // remove the drag effect on the team section

  Array.prototype.slice.call(slider.querySelectorAll("img"), 0).forEach(function (img, i) {
    img.addEventListener("dragstart", function (e) {
      return e.preventDefault();
    });
    img.addEventListener("touchstart", function (e) {
      return touchStart(e, i);
    });
    img.addEventListener("touchend", touchEnd);
    img.addEventListener("touchmove", function (e) {
      return touchMove(e, i);
    });
  });
};


//////////////////////////////////////////////////////////////////////
////////////// just for testing the card slider //////////////////////
/////delete this code because it's going to be dynamiclly created/////

const sliderContainers = document.querySelectorAll(".card__slider");

sliderContainers.forEach(slider => {
    const slides = slider.querySelectorAll(".card__slide");
    const btnLeft = slider.querySelector(".card__slider__btn--left");
    const btnRight = slider.querySelector(".card__slider__btn--right");
    const dotContainer = slider.querySelector(".card__dots");
    let curSlide = 0,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        animationID = 0,
        isDragging = false;
    const maxSlide = slides.length;

    // ///////////////touch screen slider//////////

    // remove the left click
    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    // creating the dots Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            "beforeend",
            '<button class="card__dots__dot" data-slide="' +  i + '"></button>'
        );
        });
    };

    const activateDot = function (slide) {
        slider
          .querySelectorAll(".card__dots__dot")
          .forEach(function(dot){dot.classList.remove("card__dots__dot--active")});
    
        slider
          .querySelector('.card__dots__dot[data-slide="' + slide + '"]')
          .classList.add("card__dots__dot--active");
      };

    const goToSlide = function (slide, translate = 0) {
        slides.forEach(
            (s, i) =>
            (s.style.transform = `translateX(${translate + 100 * (i - slide)}%)`)
        );
    };

    // Next slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
        curSlide = 0;
        } else {
        curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
          curSlide = maxSlide - 1;
        } else {
          curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
      };
    
    const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
    };
    init();
    
    // Event handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    slider.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
    });

    dotContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("card__dots__dot")) {
          const { slide } = e.target.dataset;
          goToSlide(slide);
          activateDot(slide);
        }
      });
    
    // ///touch screen slider functions
    const touchStart = function (event, index) {
    isDragging = true;
    curSlide = index;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    };

    const touchEnd = function () {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;
    console.log(movedBy);
    if (movedBy < -80) {
        nextSlide();
    } else if (movedBy > 80) {
        prevSlide();
    }
    setPositionByIndex();
    };

    const touchMove = function (event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        const Translate = prevTranslate + currentPosition - startPos;
        if (Translate < 100 && Translate > -100) {
        currentTranslate = Translate;
        } else if (Translate > 100) {
        currentTranslate = 100;
        } else if (Translate < -100) {
        currentTranslate = -100;
        }
    }
    };

    const getPositionX = function (event) {
    return event.touches[0].clientX;
    };

    const animation = function () {
    setCardPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
    };

    const setCardPosition = function () {
    goToSlide(curSlide, currentTranslate);
    activateDot(curSlide);
    };

    const setPositionByIndex = function () {
    goToSlide(curSlide);
    activateDot(curSlide);
    currentTranslate = 0;
    prevTranslate = currentTranslate;
    setCardPosition();
    };

    // remove the drag effect on the team section
    
    slider.querySelectorAll("img").forEach((img, i) => {
      img.addEventListener("dragstart", (e) => e.preventDefault());
      img.addEventListener("touchstart", (e) => touchStart(e, i));
      img.addEventListener("touchend", touchEnd);
      img.addEventListener("touchmove", (e) => touchMove(e, i));
      });

});