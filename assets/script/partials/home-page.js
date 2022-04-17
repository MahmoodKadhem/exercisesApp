"use strict";

/////////////////////////////////////////////////////////////////////////
//////////////////////// building a testimonial function ////////////////
const testImgs = document.querySelectorAll(".circuar-img-btn");
const testImgsContainer = document.querySelector(".test__imgs");
const testContent = document.querySelectorAll(".test__content");
const bubble = document.querySelector(".test__bubble-shad");
// const bubbleActive = document.querySelector(".test__bubble-shad");

if(testImgsContainer){
  testImgsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".circuar-img-btn");
    const dataImg = e.target.closest(".circuar-img-btn").dataset.img;
    // console.log(testImgs);
    // Guard clauser
    if (!clicked) return;
  
    // remove the active class from the btn and img
    testImgs.forEach(function (btn) {
      btn.classList.remove("circuar-img-btn--active");
      btn.firstElementChild.classList.remove("test__img--active");
    });
  
    // add the active class to the btn and img
    clicked.classList.add("circuar-img-btn--active");
    clicked.firstElementChild.classList.add("test__img--active");
  
    // transform the bubble shape
    const prevNum = bubble.classList[1].slice(-1);
    // console.log(prevNum);
    bubble.classList.remove(`test__bubble-shad--${prevNum}`);
    bubble.firstElementChild.classList.remove(`test__bubble--${prevNum}`);
    bubble.classList.add(`test__bubble-shad--${dataImg}`);
    bubble.firstElementChild.classList.add(`test__bubble--${dataImg}`);
  
    // remove the content active from all
    testContent.forEach((content) =>
      content.classList.remove("test__content--active")
    );
  
    // using the data-set attribute to link the img with the card
    document
      .querySelector(`.test__content--${dataImg}`)
      .classList.add("test__content--active");
  });
}


//////////////////////////////////////////////////////////////////
//////////////////////// building a team function ////////////////
const teamImgs = document.querySelectorAll(".img-btn"),
  teamContainer = document.querySelector(".team__container"),
  infoCard = document.querySelectorAll(".team__info-card"),
  teamSlider = document.querySelector(".team__slider"),
  teamImg = document.querySelectorAll(".team__img-card"),
  maxCards = teamImgs.length,
  teamImgContaier = document.querySelector(".team__imgs-container");
let currentCard = 0,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  isDragging = false;

if(teamContainer){

// ////////////////////// global animations functions

// remove the left click
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

//  remove the displayed info card and the active class from all Imgs
const removeInfoCardAndImgs = function () {
  // fixing the counter rotation with timeout
  document.querySelector(
    ".team__info-card--active"
  ).style.transform = `translate(-50%, -50%) rotateX(180deg)`;

  setTimeout(
    () => infoCard.forEach((card) => card.style.removeProperty("transform")),
    500
  );

  // remove the active class from the cards
  infoCard.forEach((card) => card.classList.remove("team__info-card--active"));

  // remove the active class from the Imgs
  teamImgs.forEach((img) => img.classList.remove("img-btn--active"));
};

// change the translation of all Img according to there index and current transition
const translateImgs = function (ct = 0) {
  teamImg.forEach((img, i) => {
    img.style.transform = `translateX(${ct + 110 * (i - currentCard)}%)`;
  });
};

// display the acitve info card
const setTheInfoCard = function (currentCard) {
  document
    .querySelector(`.team__info-card--${currentCard + 1}`)
    .classList.add("team__info-card--active");
};

// increase the currentCard counter go to next slide
const increaseCounter = function () {
  currentCard < maxCards - 1 ? currentCard++ : (currentCard = 0);
};

// decrease the currentCard counter go to prev slide
const decreaseCounter = function () {
  currentCard > 0 ? currentCard-- : (currentCard = maxCards - 1);
};

// grow the clicked Img in window
const clickedImgGrow = function (clicked) {
  // the clicked img grow
  teamImgs.forEach((img) => img.classList.remove("team__img-card--active"));
  clicked.classList.add("team__img-card--active");

  // time for the card to grow
  setTimeout(() => clicked.classList.remove("team__img-card--active"), 4000);
};

// ///////////////touch screen slider//////////
// ///touch screen slider functions
const touchStart = function (event, index) {
  const displaySlider = window.getComputedStyle(teamSlider).display;
  if (displaySlider !== "none") {
    isDragging = true;
    currentCard = index;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
  }
};

const touchEnd = function () {
  isDragging = false;
  cancelAnimationFrame(animationID);
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100) {
    increaseCounter();
  } else if (movedBy > 100) {
    decreaseCounter();
  }
  setPositionByIndex();
};

const touchMove = function (event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    const Translate = prevTranslate + currentPosition - startPos;
    if (Translate < 110 && Translate > -110) {
      currentTranslate = Translate;
    } else if (Translate > 110) {
      currentTranslate = 110;
    } else if (Translate < -110) {
      currentTranslate = -110;
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
  translateImgs(currentTranslate);
  setTheInfoCard(currentCard);
};

const setPositionByIndex = function () {
  // check if the cards have style attribute
  const displaySlider = window.getComputedStyle(teamSlider).display;
  if (displaySlider !== "none") {
    translateImgs();
    removeInfoCardAndImgs();
    currentTranslate = 0;
    prevTranslate = currentTranslate;
    setCardPosition();
  }
};

// remove the drag effect on the team section

teamContainer.querySelectorAll("img").forEach((img, i) => {
  img.addEventListener("dragstart", (e) => e.preventDefault());
});


// ///touch screen slider event listeners
infoCard.forEach((card, i) => {
  card.addEventListener("touchstart", (e) => touchStart(e, i));
  card.addEventListener("touchend", touchEnd);
  card.addEventListener("touchmove", (e) => touchMove(e, i));
});

teamImgs.forEach((btn, i) => {
  btn.addEventListener("touchstart", (e) => touchStart(e, i));
  btn.addEventListener("touchend", touchEnd);
  btn.addEventListener("touchmove", (e) => touchMove(e, i));
});

/////////////////////////////////////////////////////////////////////
// //////////// windows click and mobile side btn function

teamContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".img-btn");
  const silderbtn = e.target.closest(".slider-btn");
  const sliderHidden = getComputedStyle(teamSlider).display;

  // Guard clauser
  if (!clicked && !silderbtn) return;

  // //////////// windows clicking on the img
  if (clicked && sliderHidden === "none") {
    // the clicked img grow for a short time
    clickedImgGrow(clicked);

    // if the active one clicked then don't chang the info card
    if (clicked.classList.contains("img-btn--active")) return;

    // add the active class to img
    clicked.classList.add("img-btn--active");

    // card-info animation and active class form img
    removeInfoCardAndImgs();

    // using the data-set attribute to link the img with the card
    const dataImg = clicked.dataset.img;
    currentCard = dataImg - 1;
    setTheInfoCard(currentCard);

    ////////////////// mobile clicking on the arrows///////////////////////
  } else if (silderbtn && sliderHidden !== "none") {
    // increase and decrease the counter go to next slide
    if (silderbtn.classList.contains("slider-btn--r")) {
      increaseCounter();
    } else {
      decreaseCounter();
    }

    // change the working img
    translateImgs();

    // card-info animation and active class form img
    removeInfoCardAndImgs();

    // add the active class to img
    document
      .querySelector(`.team__img-card--${currentCard + 1}`)
      .classList.add("img-btn--active");

    // using the currentCard counter to set the info card
    setTheInfoCard(currentCard);
  }
});

//////////////////////////////////////////////////////////////
///////// revert the img to there alingment in windows view ////////////

const teamCallback = function (entries) {
  entries.forEach((entry) => {
    // if isIntersecting is false remove inline-style from working imgs
    if (!entry.isIntersecting) {
      teamImg.forEach((img) => {
        if (img.style.removeProperty) {
          img.style.removeProperty("transform");
        } else {
          img.style.removeAttribute("transform");
        }
      });
    } else if (entry.isIntersecting) {
      translateImgs();
    }
  });
};

const teamObserver = new IntersectionObserver(teamCallback, {
  root: teamContainer,
  threshold: 0,
});

teamObserver.observe(teamSlider);

}