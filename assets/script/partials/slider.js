///////////////////////////////////////////////////////////
////////////////////// slider /////////////////////////////
///////////////////////////////////////////////////////////
const sliderContainer = document.querySelector(".slider");

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
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

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
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

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
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
  sliderContainer.querySelectorAll("img").forEach((img, i) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
    img.addEventListener("touchstart", (e) => touchStart(e, i));
    img.addEventListener("touchend", touchEnd);
    img.addEventListener("touchmove", (e) => touchMove(e, i));
  });

  ////////////////////////////////////////////////////////////////////
};

if(sliderContainer){
  slider();
}
