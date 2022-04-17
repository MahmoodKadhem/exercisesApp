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


///////////// internet explorer compitable /////////////////////////


// var sliderContainers = Array.prototype.slice.call(document.querySelectorAll(".card__slider"), 0);
// sliderContainers.forEach(function (slider) {
//   var slides = Array.prototype.slice.call(slider.querySelectorAll(".card__slide"), 0);
//   var btnLeft = slider.querySelector(".card__slider__btn--left");
//   var btnRight = slider.querySelector(".card__slider__btn--right");
//   var dotContainer = slider.querySelector(".card__dots");
//   var curSlide = 0,
//     startPos = 0,
//     currentTranslate = 0,
//     prevTranslate = 0,
//     animationID = 0,
//     isDragging = false;
//   var maxSlide = slides.length; // ///////////////touch screen slider//////////
//   // remove the left click

//   window.oncontextmenu = function (event) {
//     event.preventDefault();
//     event.stopPropagation();
//     return false;
//   }; // creating the dots Functions

//   var createDots = function createDots() {
//     slides.forEach(function (_, i) {
//       dotContainer.insertAdjacentHTML(
//         "beforeend",
//         '<button class="card__dots__dot" data-slide="' + i + '"></button>'
//       );
//     });
//   };

//   var activateDot = function activateDot(slide) {
//     Array.prototype.slice.call(slider.querySelectorAll(".card__dots__dot"), 0).forEach(function (dot) {
//       dot.classList.remove("card__dots__dot--active");
//     });
//     slider
//       .querySelector('.card__dots__dot[data-slide="' + slide + '"]')
//       .classList.add("card__dots__dot--active");
//   };

//   var goToSlide = function goToSlide(slide, translate) {
//     if (translate === void 0) {
//       translate = 0;
//     }

//     slides.forEach(function (s, i) {
//       return (s.style.transform =
//         "translateX(" + (translate + 100 * (i - slide)) + "%)");
//     });
//   }; // Next slide

//   var nextSlide = function nextSlide() {
//     if (curSlide === maxSlide - 1) {
//       curSlide = 0;
//     } else {
//       curSlide++;
//     }

//     goToSlide(curSlide);
//     activateDot(curSlide);
//   };

//   var prevSlide = function prevSlide() {
//     if (curSlide === 0) {
//       curSlide = maxSlide - 1;
//     } else {
//       curSlide--;
//     }

//     goToSlide(curSlide);
//     activateDot(curSlide);
//   };

//   var init = function init() {
//     goToSlide(0);
//     createDots();
//     activateDot(0);
//   };

//   init(); // Event handlers

//   btnRight.addEventListener("click", nextSlide);
//   btnLeft.addEventListener("click", prevSlide);
//   slider.addEventListener("keydown", function (e) {
//     if (e.key === "ArrowLeft") prevSlide();
//     e.key === "ArrowRight" && nextSlide();
//   });
//   dotContainer.addEventListener("click", function (e) {
//     if (e.target.classList.contains("card__dots__dot")) {
//       var slide = e.target.dataset.slide;
//       goToSlide(slide);
//       activateDot(slide);
//     }
//   }); // ///touch screen slider functions

//   var touchStart = function touchStart(event, index) {
//     isDragging = true;
//     curSlide = index;
//     startPos = getPositionX(event);
//     animationID = requestAnimationFrame(animation);
//   };

//   var touchEnd = function touchEnd() {
//     isDragging = false;
//     cancelAnimationFrame(animationID);
//     var movedBy = currentTranslate - prevTranslate;
//     console.log(movedBy);

//     if (movedBy < -80) {
//       nextSlide();
//     } else if (movedBy > 80) {
//       prevSlide();
//     }

//     setPositionByIndex();
//   };

//   var touchMove = function touchMove(event) {
//     if (isDragging) {
//       var currentPosition = getPositionX(event);
//       var Translate = prevTranslate + currentPosition - startPos;

//       if (Translate < 100 && Translate > -100) {
//         currentTranslate = Translate;
//       } else if (Translate > 100) {
//         currentTranslate = 100;
//       } else if (Translate < -100) {
//         currentTranslate = -100;
//       }
//     }
//   };

//   var getPositionX = function getPositionX(event) {
//     return event.touches[0].clientX;
//   };

//   var animation = function animation() {
//     setCardPosition();

//     if (isDragging) {
//       requestAnimationFrame(animation);
//     }
//   };

//   var setCardPosition = function setCardPosition() {
//     goToSlide(curSlide, currentTranslate);
//     activateDot(curSlide);
//   };

//   var setPositionByIndex = function setPositionByIndex() {
//     goToSlide(curSlide);
//     activateDot(curSlide);
//     currentTranslate = 0;
//     prevTranslate = currentTranslate;
//     setCardPosition();
//   }; // remove the drag effect on the team section

//   Array.prototype.slice.call(slider.querySelectorAll("img"), 0).forEach(function (img, i) {
//     img.addEventListener("dragstart", function (e) {
//       return e.preventDefault();
//     });
//     img.addEventListener("touchstart", function (e) {
//       return touchStart(e, i);
//     });
//     img.addEventListener("touchend", touchEnd);
//     img.addEventListener("touchmove", function (e) {
//       return touchMove(e, i);
//     });
//   });
// });
