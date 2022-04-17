"use strict";

// //////////////////global page smooth scrolling link using the href attribute
document.querySelectorAll(".scroll__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const targetID = this.getAttribute("href");
    document.querySelector(targetID).scrollIntoView({ behavior: "smooth" });
  });
});

///////////////////////////////////////////////////////////////////////
/////////// reveal hidden elements. class show-on-scroll //////////////
///////////////////////////////////////////////////////////////////////


  

// const allHiddens = document.querySelectorAll(".scroll-hidden");

// const revealHiddens = function (entries, observer) {
//   const [entry] = entries;
//   // console.log(entry.target);

//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove("show-on-scroll");
//   observer.unobserve(entry.target);
// };

// const hiddenObserver = new IntersectionObserver(revealHiddens, {
//   root: null,
//   threshold: 0.1,
// });

// allHiddens.forEach((hidden) => {
//   hiddenObserver.observe(hidden);
//   hidden.classList.add("show-on-scroll");
//   hidden.style.transition = "all 1.5s";
// });

///////////////////////////////////////////////////////////////////////
//////////// lazy loading to inchance preformance /////////////////////
//////////// base on the data-src /////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  // we only need to do somting when they are intersecting
  if (!entry.isIntersecting) return;
  // replace dats-src wtih src
  entry.target.src = entry.target.dataset.src;
  // remove the lazy-img class
  // entry.target.classList.remove("lazy-img"); //like this it will remove the blur filter before finishing downloading the big img.

  // we need to remove the class after the Img finished loading.
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  // once finished remove the observer
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

////////////////////////////////////////////////////////////////////
//////////////////////nav menu///////////////////////

const navBtn = document.querySelector(".nav-menu__btn");
const navBg = document.querySelector(".nav-menu__background");
const navMenu = document.querySelector(".nav-menu__nav");

navBtn.addEventListener("click", function (e) {
  e.preventDefault();
  navBtn.classList.toggle("nav-menu__btn--active");
  navBg.classList.toggle("nav-menu__background--active");
  navMenu.classList.toggle("nav-menu__nav--active");
});

// ///////// intersecting observer for nav bar ////////////

const header = document.querySelector("header");
const navBar = document.querySelector(".nav");
const navHeight = navBar.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    navBar.classList.remove("nav--sticky--show");
  } else {
    navBar.classList.add("nav--sticky--show");
  }

  if (entry.intersectionRatio > 0.1) {
    navBar.classList.remove("nav--sticky");
  } else {
    navBar.classList.add("nav--sticky");
  }
};

const navObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: [0, 0.1],
  rootMargin: `-${navHeight}px`,
});
navObserver.observe(header);

//////////////////////////////////////////////////////////////////

// // ////////////scroll using even delegation for nav //////////////
// document.querySelector(".nav").addEventListener("click", function (e) {
//   e.preventDefault;

//   // matching strategy
//   if (e.target.classList.contains("nav__link")) {
//     const targetID = e.target.getAttribute("href");
//     document.querySelector(targetID).scrollIntoView({ behavior: "smooth" });
//   }
// });
//////////////////////////////////////////////////////////////////

// // //////////////////home scroll btn ////////////////////////
// selectors
// const homeheaderCta = document.querySelector("#headerCta");
// const homeFormSection = document.querySelector("#homeFormCta");
// const homeScrollbtn = document.querySelector("#homeScrollBtn");
// const homeAboutSection = document.querySelector("#homeAboutSection");
// // the function
// const scrollFunction = function (btn, target) {
//   btn.addEventListener("click", function (e) {
//     const formCoords = target.getBoundingClientRect();
//
//     window.scrollTo({
//       left: formCoords.left + window.pageXOffset,
//       top: formCoords.top + window.pageYOffset,
//       behavior: "smooth",
//     });
//     // only modren browser support
//     // target.scrollIntoView({behavior: "smooth"});
//   });
// };
//
// scrollFunction(homeheaderCta, homeFormSection);
// scrollFunction(homeScrollbtn, homeAboutSection);
//////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
////////////////////////////home page////////////////////////////////
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//////////////////////// building a testimonial function ////////////////
const testImgs = document.querySelectorAll(".circuar-img-btn");
const testImgsContainer = document.querySelector(".test__imgs");
const testContent = document.querySelectorAll(".test__content");
const bubble = document.querySelector(".test__bubble-shad");
// const bubbleActive = document.querySelector(".test__bubble-shad");

if (testImgsContainer) {
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

if (teamContainer) {
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
    infoCard.forEach((card) =>
      card.classList.remove("team__info-card--active")
    );

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

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
///////////////////////////side nav//////////////////////////////////
/////////////////////////////////////////////////////////////////////

const sideNavMenu = document.querySelector(".side-nav");

if (sideNavMenu) {
  const sideNavBtn = document.querySelector(".side-nav__btn");
  const sideNavTitles = document.querySelectorAll(".side-nav__link--title");

  sideNavBtn.addEventListener("click", function (e) {
    e.preventDefault();
    sideNavBtn.classList.toggle("side-nav__btn--active");
    sideNavMenu.classList.toggle("side-nav--active");
    sideNavTitles.forEach((title) => title.classList.toggle("hidden-text"));
  });
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
////////////////////// slider ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////
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

if (sliderContainer) {
  slider();
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
////////////////////// full screen image grow ///////////////////////
/////////////////////////////////////////////////////////////////////

const imgs = document.querySelectorAll(".img-btn-fscreen");
const closeBtn = document.querySelector(".close-btn");

if (imgs) {
  function addElement(e) {
    // Create a <button> element
    var btn = document.createElement("BUTTON");
    // Insert text
    btn.innerHTML = '<span class="close-btn__icon"></span>';
    btn.classList.add("close-btn");
    // Append <button> to <body>
    e.appendChild(btn);
    // e.insertAdjacentElement('beforeend', btn);
    btn.addEventListener("click", closeImage);
  }

  function closeImage() {
    // ele.classList.remove('img-btn--active');
    // ele.querySelector("button").remove();
    const activeBtn = document.querySelector(".img-btn-fscreen--active");
    activeBtn.classList.remove("img-btn-fscreen--active");
    activeBtn.querySelector("button").remove();
  }

  imgs.forEach((img) => {
    img.addEventListener("click", function (e) {
      const clicked = e.target.closest(".img-btn-fscreen");
      const clickedBtn = e.target;
      if (clicked && !clicked.classList.contains("img-btn-fscreen--active")) {
        clicked.classList.add("img-btn-fscreen--active");
        addElement(clicked);
      } else {
        if (clickedBtn.classList.contains("img-btn-fscreen")) {
          closeImage();
        }
      }
    });
  });
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
////////////////////// services side nav ////////////////////////////
/////////////////////////////////////////////////////////////////////
const servicesSideNav = document.querySelector("#servicesSideNav");
let servicesStoredID = sessionStorage.getItem('servicesStoredID');
let servicesInitID = servicesStoredID || "checkups";

console.log("servicesStoredID: " + servicesStoredID);

if (servicesSideNav) {
  const services = document.querySelector(`#${servicesInitID}`);

  if(services){
    services.classList.add('side-nav__link--active');
    document.querySelector(`#${servicesInitID}Article`).classList.add('article--active');
  }

  const links = servicesSideNav.querySelectorAll(".side-nav__link");
  const contents = document.querySelectorAll(".article");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetLink = e.target.closest("button");
      targetLink.preventDefault;
      const targetID = e.target.closest("button").id;
      const targetArticle = document.querySelector(`#${targetID}Article`);
      const activeContnet = document.querySelector(".article--active");

      links.forEach((link) => link.classList.remove("side-nav__link--active"));

      targetLink.classList.add("side-nav__link--active");

      activeContnet.style.display = "none";
      setTimeout(function () {
        activeContnet.style.display = "block";
      }, 600);

      contents.forEach((content) => {
        content.classList.remove("article--active");
      });

      targetArticle.classList.add("article--active");
    });
  });
}

/////////////////////////// home page links /////////////////////////

const servicesLinks = document.querySelectorAll(".services-box__btn");
if (servicesLinks) {
  servicesLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault
      alert("clicked")
      const clickedID = e.target.closest("a").id.slice(0, -4);
      servicesInitID = clickedID;
      
      sessionStorage.setItem("servicesStoredID",servicesInitID)
    });
  });
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
