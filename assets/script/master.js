"use strict";



// const { addLocale } = require("core-js");

// // Detect if user is on IE browser and load polyfills for fetching data
// var isIE = !!window.MSInputMethodContext && !!document.documentMode;

// if (isIE) {
//    // Create Promise polyfill script tag
//     var promiseScript = document.createElement("script");
//     promiseScript.type = "text/javascript";
//     promiseScript.src = "/assets/script/polyfill.min.js";
//     // promiseScript.src =
//     //     "https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js";

//   // Create Fetch polyfill script tag
//     var fetchScript = document.createElement("script");
//     fetchScript.type = "text/javascript";
//     fetchScript.src =
//         "/assets/script/fetch.umd.min.js";

//   // Add polyfills to head element
//     document.head.appendChild(promiseScript);
//     document.head.appendChild(fetchScript);

//   // Wait for the polyfills to load and run the function. 
//   // We could have done this differently, 
//   // but I've found it to work well for my use-cases
//     setTimeout(function () {
//         window
//             .fetch("../../data-index.json").then(function(response){return response.json()}).then(function(data) { index=data; } );
//     }, 1000);
// } else {
//   // If fetch is supported, just run the fetch function
//   fetch("../../data-index.json").then(function(response){return response.json()}).then(function(data) { index=data; } );
// }





/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////////// data handler /////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

let messageList = {
}

const selectedData = data.exercisesGif.face;
// console.log(selectedData);
selectedData.forEach(entry => creatCard(entry));

// creating a card based on given data
function creatCard(data){
  const cardContainer = document.querySelector(".card-container");
  const cardEle = document.createElement('div');
  const checkbox = document.createElement('div');
  const sliderEle = document.createElement('div');
  const contentEle = document.createElement('div');
  const titleEle = document.createElement('h3');
  const tagsEle = document.createElement('p');
  const cardBtns = document.createElement('div');
  const openBtn = document.createElement('a');
  const qrBtn = document.createElement('button');
  const langBtn = document.createElement('label');

  // if messageList containes the card data check the checkbox 
  let checkboxStatus = checkcheckboxStatus(data.id);

  // checkbox element
  checkbox.classList.add('checkbox','card__checkbox');
  checkbox.innerHTML = `<label id="card${data.id}" class="checkbox__label">
    <input name="card${data.id}" type="checkbox" ${checkboxStatus}>
    <span class="checkbox__mark"></span>
  </label>`

  // check if the data is arabic or english or both
  let langStatus;
  if(!data.araQRCode){
    langStatus = "disabled";
  } else if (!data.engQRCode) {
    langStatus = "checked disabled";
  }

  // lang checkbox element
  langBtn.classList.add('switch-btn__switch', 'switch-btn__switch--card');
  langBtn.innerHTML = `<input id="lang${data.id}" type="checkbox" ${!langStatus ? '' : langStatus}>
  <span class="switch-btn__slider switch-btn__round"></span>
  <div class="switch-btn__labels">
      <span class="switch-btn__label--1">Ara</span>
      <span class="switch-btn__label--2">Eng</span>
  </div>`
 
  langBtn.querySelector('input').addEventListener('click', (e) => langBtnEventListener(e,data));

  // add classes to the created elements
  cardEle.classList.add('card');
  sliderEle.classList.add('card__slider');
  contentEle.classList.add('card__content');
  titleEle.classList.add('h-3');
  tagsEle.classList.add('p--tags');
  cardBtns.classList.add('card__btns');
  openBtn.classList.add('btn', 'card__btn');
  qrBtn.classList.add('btn', 'card__btn');

  // create the imgs elements for each image in the array
  data.tumbUrl.forEach(function(img,i){
    const slideEle = document.createElement('div');
    slideEle.classList.add('card__slide');
    const imgEle = document.createElement('img');
    imgEle.src = img;
    imgEle.alt = data.title + i;
    slideEle.appendChild(imgEle);
    sliderEle.appendChild(slideEle);
  });

  // create the slider navigation btns
  if (data.tumbUrl.length > 1){
    const lbtn = document.createElement('button');
    const rbtn = document.createElement('button');
    const dots = document.createElement('div');

    lbtn.classList.add('card__slider__btn','card__slider__btn--left');
    lbtn.innerHTML = '&lt;';
    rbtn.classList.add('card__slider__btn','card__slider__btn--right');
    rbtn.innerHTML = '&gt;';
    dots.classList.add('card__dots');

    // append the slider btns and dots to the slider element
    sliderEle.appendChild(lbtn);
    sliderEle.appendChild(rbtn);
    sliderEle.appendChild(dots);

    // activate the slider function
    activateSlider(sliderEle);
  }

  // the zoom btn handler
  const zoomBtn = document.createElement('a');
  
  zoomBtn.classList.add('card__zoom');
  // zoom button innter html
  zoomBtn.innerHTML = 
  `<svg class="card__zoom--icon">
    <use
    xlink:href="assets/img/icomoon/symbol-defs.svg#icon-screen-full"
    ></use>
  </svg>`
  // add the event listener to the btn
  fullscreenSlider(zoomBtn);
  
  // append the zoom button to the slider element
  sliderEle.appendChild(zoomBtn);



  // create the content title and tages
  titleEle.textContent = data.title
  tagsEle.innerHTML = '<span class="p--b">Tags: </span>' + data.tags.join(', ');
  
  // card btns text content
  openBtn.textContent = "open";
  openBtn.target = "_blank"
  qrBtn.textContent = "QR";

  // append the card btns to the btns element
  cardBtns.appendChild(langBtn);
  cardBtns.appendChild(openBtn);
  cardBtns.appendChild(qrBtn);

  // add the title and tages to the content element
  contentEle.appendChild(titleEle);
  contentEle.appendChild(tagsEle);
  contentEle.appendChild(cardBtns);

  // append all elements to the card element
  cardEle.appendChild(checkbox);
  cardEle.appendChild(sliderEle);
  cardEle.appendChild(contentEle);

  cardEle.dataset.obj = JSON.stringify(data);
  cardEle.id = data.id

  // append the card element to the card container
  cardContainer.appendChild(cardEle);

  // checkbox function
  checkbox.querySelector("input").addEventListener("click",(e) => checkboxhandler(e))

  // create the QR code image
  if (!data.araQRCode && !data.engQRCode){
    qrBtn.disabled = true;
    qrBtn.classList.add('card__btn--disabled');
  } else if (!data.araQRCode){
    createFullScreenImgEle(qrBtn, data.engQRCode);
  } else {
    createFullScreenImgEle(qrBtn, data.araQRCode);
  }

  // add the btns urls
  if(!data.araDir){
    openBtn.href= data.engDir;
  } else {
    openBtn.href= data.araDir;
  }

}

// make the slider fullscreen
function fullscreenSlider(btn){
  btn.addEventListener('click', function(e){
    const btn = e.target;
    const slider = btn.closest('.card__slider');
    slider.classList.add('card__slider--fullscreen');
    creatCloseBtn(slider,returnSliderEle)
  });
}

// return the slider from full screen
function returnSliderEle(){
  const ele = document.querySelector('.card__slider--fullscreen');
  ele.classList.remove('card__slider--fullscreen');
  ele.querySelector('.qr__btn').remove();
}

// create a close btn 
function creatCloseBtn(Container,callback){
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('qr__btn');
  closeBtn.textContent = "X";
  closeBtn.addEventListener("click", callback);
  Container.appendChild(closeBtn);
}

// activate slider for the created card images
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

// build and show the qr code when the btn is clicked 
function createFullScreenImgEle(ele, img){
  ele.addEventListener("click", function(){
      const qrContainer = document.createElement('div');
      const qrImg = document.createElement('img');

      qrContainer.classList.add('qr__container');
      qrImg.classList.add('qr__img');

      qrImg.src = img;
      qrContainer.appendChild(qrImg);

      creatCloseBtn(qrContainer, removeTheFullScreenEle)
      document.querySelector(".card-container").appendChild(qrContainer);
  })
}

// change the dir and qrcode based on the lang switch.
function langBtnEventListener(e, data){
  // const value = e.target.checked;
  const lang = e.target.checked? "eng" : "ara";
  const cardCheckbox = e.target.closest('.card').querySelector('.checkbox').querySelector('input');
  const btnsEle = e.target.closest('.card__btns');
  const openBtn = btnsEle.querySelector('a');
  const qrCodeBtn = btnsEle.querySelector('button');

  if (lang === "eng"){
    openBtn.href = data.engDir;
    resetEventOnQRBtn(qrCodeBtn, data.engQRCode);
  } else {
    openBtn.href = data.araDir;
    resetEventOnQRBtn(qrCodeBtn, data.araQRCode);
  }

  if(cardCheckbox.checked){
    checkboxLangSwetchHandler(cardCheckbox,lang);
  } 
}

// clear the event listener on the QR button by cloning and replacing it.
function resetEventOnQRBtn(ele,img){
  const new_ele = ele.cloneNode(true);
  ele.parentNode.replaceChild(new_ele, ele);
  createFullScreenImgEle(new_ele, img);
}

// close the full screen image when shown 
function removeTheFullScreenEle(){
  document.querySelector(".qr__container").remove();
}

// handling the check box 
function checkboxhandler(e){
  const checkbox = e.target.checked;
  const card = e.target.closest(".card")
  const dataObj = JSON.parse(card.dataset.obj);
  const listID = "li" + dataObj.id
  const lang = card.querySelector(`#lang${dataObj.id}`).checked? "eng" : "ara";
  
  if (checkbox === true){
    selectedItem(dataObj,lang)
  } else {
    deSelectedItem(dataObj.id,listID)
  }
}

// when loading the cards check if the checkbox is checked
function checkcheckboxStatus(id){
  if (id in messageList) {
    return "checked"
  } else {
     return ""
  }
}

// hadling swetching the language
function checkboxLangSwetchHandler(input,lang){
  const dataObj = JSON. parse(input.closest(".card").dataset.obj);
  replaceLangLinks(dataObj,lang)
}

// add and remove the items from the messageList
function selectedItem(dataObj,lang){
  replaceLangLinks(dataObj,lang)
  // add the items from the side bar list
  const item = document.createElement('li');
  const btn = document.createElement('button');
  const title = document.createElement('span');
  const listID = "li" + dataObj.id
  btn.addEventListener("click", ()=> deSelectedItem(dataObj.id,listID))
  btn.textContent = "X"
  item.id = listID
  title.textContent = dataObj.title;

  item.appendChild(btn);
  item.appendChild(title);

  document.querySelector("#sideBarList").appendChild(item);

  // pupulate data
  populateMessageData();
  console.log(messageList);
}

function deSelectedItem(id,listID){
  // remove id and url to messageList
  delete messageList[id];
  document.getElementById(listID).remove();
  const card =  document.getElementById(id)
  // if the  card element is found uncheck it
  if (card) {
    card.querySelector('input').checked = false;
  }
  // pupulate data
  populateMessageData();
}

// replace the links in the messageList object
function replaceLangLinks(dataObj,lang){
  let link
  // add title and url to messageList
  if (lang === "ara"){
    link = dataObj.araLink
  } else {
    link = dataObj.engLink
  }
  messageList[dataObj.id] = link;
  // console.log(messageList);
}

// create the message and enable the whatsApp send ntm
function populateMessageData(){
  let links = Object.values(messageList).join('%0a')
  let mobile = document.getElementById("mobileNum").value;
  let message = `https://wa.me/973${mobile}/?text=${links}`
  const anchore = document.querySelector('#sendMessageBtn');
  

  if (Object.keys(messageList).length !== 0 && mobile.length == 8){
    anchore.href = message;
    anchore.classList.remove('sidebar__btn--disabled')
    anchore.removeEventListener('click',preventClick);

  } else {
    anchore.classList.add('sidebar__btn--disabled')
    anchore.addEventListener('click',preventClick);
  }
}

// prevent send messages before selection
function preventClick(e){
  e.preventDefault()
}

populateMessageData()

// filter navgation
function filterSearch(){
  console.log(document.querySelector('#filterSelectBox').value);
  clearCanvas();
}

// deleting all cards and selected items elements
function clearCanvas(){
  const cards = document.querySelectorAll('.card');
  cards.forEach( card => card.remove())
  document.querySelector('#filterSelectBox').reset();
}

// handling populate list and data
function populateData(e){
  let target = e.target.closest('a');
  let targetID = target.id;
  let selectBoxData = creatingLists(targetID);

  // deactivate the other links
  document.querySelectorAll('.side-nav__link').forEach(link => link.classList.remove('side-nav__link--active'));
  
  // activate the selected link
  target.classList.add('side-nav__link--active');

  // remove everything in the canvas
  clearCanvas();

  // toggle the filter-box is needed
  if (selectBoxData){
    // show the filter-box and create the list
    document.querySelector('.filter-nav').classList.remove('filter-nav--hide');
    document.querySelector('#filterSelectBox').setOptions(selectBoxData);
  } else {
    // hide the filter-box
    document.querySelector('.filter-nav').classList.add('filter-nav--hide');
    // show all the available cards
    data[targetID].forEach(entry => creatCard(entry));
  }
}

// only accept numbner in the mobile imput
function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
      return false;
  return true;
}


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////// side navigation////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


const sideNavMenu = document.querySelector(".side-nav");

const sideNavBtn = document.querySelector(".side-nav__btn");

sideNavBtn.addEventListener("click", function (e) {
  e.preventDefault();
  sideNavBtn.classList.toggle("side-nav__btn--active");
  sideNavBtn.classList.toggle("x-btn__btn--active");
  sideNavMenu.classList.toggle("side-nav--active");
});

sideNavMenu.addEventListener("focusout", function(e){
  sideNavBtn.classList.remove("side-nav__btn--active");
  sideNavBtn.classList.remove("x-btn__btn--active");
  sideNavMenu.classList.remove("side-nav--active");
});

// links function
const sideNavLink = document.querySelectorAll('.side-nav__link')

sideNavLink.forEach( link => {
  link.addEventListener('click', populateData);
})


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

sideBarMenu.addEventListener("focusout", function(e){
  sideBarMenu.classList.remove("sidebar--active");
});

//////////////////////////////////////////////////////////////////////
////////////// just for testing the card slider //////////////////////
/////delete this code because it's going to be dynamiclly created/////
function testingSlider(){
  
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
}
// testingSlider()