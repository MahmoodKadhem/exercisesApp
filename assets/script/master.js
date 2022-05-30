"use strict";
// parcal setup
// const data = require('../../data-index.json');


// if(module.hot){
//   module.hot.accept();
// }

// VirtualSelect.init({
//   ele: '#filterSelectBox',
//   options: creatingLists('exercisesGif'),
//   multiple: true,
//   search: true,
//   placeholder: 'Select Body Region',
//   // optionsCount: 5,
//   showValueAsTags: false,
//   // dropboxWidth: '30rem',
//   // tooltipAlignment: 'center',
//   // tooltipMaxWidth: '50rem',
//   showDropboxAsPopup: true,
//   popupDropboxBreakpoint: '280px',
//   useGroupValue: true,
//   markSearchResults: true,
// });


// console.log(data);

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
//////////////////// creating lists dynamicly ///////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// creating the Lists
function creatingLists(category){
  const list = data[category];
  const isListArray = list instanceof Array;

  if (!isListArray){
     let dataList =[];

     Object.entries(list).forEach(entry => {
        let entryObj = {};
        let alias = [];
        let subData = entry[1];
        let haveOptions = subData instanceof Array;
        entryObj.label = entry[0];
        entryObj.value = entry[0];
        
        if (!haveOptions) {
           let options = creatingOptionList(subData, entry[0]);
           entryObj.options = options;
        } else {
          entry[1].forEach( e => {
            e.tags.forEach( tag => {
              if (!alias.includes(tag)) alias.push(tag);
            })
          })
          entryObj.alias = alias;
        }

        dataList.push(entryObj);
     });
     return dataList;
  }
}

// creating the sub List options
function creatingOptionList(data,title){
  let subDataList =[]
  Object.entries(data).forEach(entry => {
    let entryObj = {};
    let alias = [];
    //  entryObj.label = title + " " + entry[0];
    entryObj.label = entry[0];
    entryObj.value = title + "->" + entry[0];
    entry[1].forEach( e => {
      e.tags.forEach( tag => {
        if (!alias.includes(tag)) alias.push(tag);
      })
    })
    entryObj.alias = alias;
    entryObj.description = alias.toString();
     subDataList.push(entryObj);
  });
  return subDataList
}



/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////////// data handler /////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

let messageList = {
}

///////////// Testing code delete it //////////////////////
// const selectedData = data.exercisesGif.face;
// console.log(selectedData);
// selectedData.forEach(entry => creatCard(entry));
///////////////////////////////////////////////////////////

// creating a card based on given data
function creatCard(data){
  const cardContainer = document.querySelector(".card-container");
  const cardEle = document.createElement('div');
  const checkbox = document.createElement('div');
  const sliderEle = document.createElement('div');
  const contentEle = document.createElement('div');
  const titleEle = document.createElement('h3');
  const tagsEle = document.createElement('p');

  // if messageList containes the card data check the checkbox 
  let checkboxStatus = checkcheckboxStatus(data.id);

  // checkbox element
  checkbox.classList.add('checkbox','card__checkbox');
  checkbox.innerHTML = `<label id="card${data.id}" class="checkbox__label">
    <input name="card" type="checkbox" ${checkboxStatus}>
    <span class="checkbox__mark"></span>
  </label>`

  // checkbox function
  checkbox.querySelector("input").addEventListener("click",(e) => checkboxhandler(e))
  //////////////////////////////////////////////////////

  // add classes to the created elements
  cardEle.classList.add('card');
  sliderEle.classList.add('card__slider');
  contentEle.classList.add('card__content');
  titleEle.classList.add('h-3');
  tagsEle.classList.add('p--tags');


  // create the imgs elements for each image in the array
  data.tumbUrl.forEach(function(img,i){
    const slideEle = document.createElement('div');
    slideEle.classList.add('card__slide');
    const imgEle = document.createElement('img');
    imgEle.src = img;
    imgEle.alt = data.title + i;
    // imgEle.onerror =`this.onerror=null; this.src='${data["tumb-backup"]}'`
    imgEle.onerror = function(){this.onerror=null; this.src=data["tumb-backup"]};
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
    xlink:href="#icon-screen-full"
    ></use>
  </svg>`
  // add the event listener to the btn
  fullscreenSlider(zoomBtn);
  
  // append the zoom button to the slider element
  sliderEle.appendChild(zoomBtn);

  // create the content title and tages
  titleEle.textContent = data.title
  tagsEle.innerHTML = '<span class="p--b">Tags: </span>' + data.tags.join(', ');
  
   // add the title and tages to the content element
   contentEle.appendChild(titleEle);
   contentEle.appendChild(tagsEle);

  //////////////////////////////////////////////////////
  // if there is a Dir then create the Btns element
  if(data.araDir || data.engDir){
    // create the elements
    const cardBtns = document.createElement('div');
    const openBtn = document.createElement('a');
    const qrBtn = document.createElement('button');
    const langBtn = document.createElement('label');

    cardBtns.classList.add('card__btns');
    openBtn.classList.add('btn', 'card__btn');
    qrBtn.classList.add('btn', 'card__btn');

    // check if the data is arabic or english or both
    let langStatus;
    if(!data.araLink){
      langStatus = "checked disabled";
    } else if (!data.engLink) {
      langStatus = "disabled";
    } 

    // creat the lang checkbox element
    langBtn.classList.add('switch-btn__switch', 'switch-btn__switch--card');
    langBtn.innerHTML = `<input id="lang${data.id}" type="checkbox" ${!langStatus ? '' : langStatus}>
    <span class="switch-btn__slider switch-btn__round"></span>
    <div class="switch-btn__labels">
        <span class="switch-btn__label--1">Ara</span>
        <span class="switch-btn__label--2">Eng</span>
    </div>`

    langBtn.querySelector('input').addEventListener('click', (e) => langBtnEventListener(e,data));
  
    // card btns text content
    openBtn.textContent = "open";
    openBtn.target = "_blank"
    qrBtn.textContent = "QR";

    // append the card btns to the btns element
    cardBtns.appendChild(langBtn);
    cardBtns.appendChild(openBtn);
    cardBtns.appendChild(qrBtn);

    contentEle.appendChild(cardBtns);

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
  

  // append all elements to the card element
  cardEle.appendChild(checkbox);
  cardEle.appendChild(sliderEle);
  cardEle.appendChild(contentEle);

  cardEle.dataset.obj = JSON.stringify(data);
  cardEle.id = data.id

  // append the card element to the card container
  cardContainer.appendChild(cardEle);
}

// make the slider fullscreen
function fullscreenSlider(btn){
  btn.addEventListener('click', function(e){
    const btn = e.target;
    const slider = btn.closest('.card__slider');
    slider.classList.add('card__slider--fullscreen');
    creatCloseBtn(slider,returnSliderEle)
    switchImages(slider);
  });
}

// change the slider images from thum to big
function switchImages(ele){
  if (ele.classList.contains('card__slider--fullscreen')){
    ele.querySelectorAll('img').forEach(img => {
      const newSrc = img.src.replace('Thumbnail','Big');
      img.src = newSrc;
    });
  } else {
    ele.querySelectorAll('img').forEach(img => {
      const newSrc = img.src.replace('Big','Thumbnail');
      img.src = newSrc;
    });
  }
}

// return the slider from full screen
function returnSliderEle(){
  const ele = document.querySelector('.card__slider--fullscreen');
  ele.classList.remove('card__slider--fullscreen');
  ele.querySelector('.qr__btn').remove();
  switchImages(ele);
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
    checkboxLangSwitchHandler(cardCheckbox,lang);
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
  const listID = "li" + dataObj.id;
  const haveLang = card.querySelector(`#lang${dataObj.id}`);
  let lang
  if(haveLang){
    lang = haveLang.checked? "eng" : "ara";
  } else{
    lang = "";
  }

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

// hadling switching the language
function checkboxLangSwitchHandler(input,lang){
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

// filter navgation
function filterSearch(){
  let createdIDs = [];
  const selectedData = document.querySelector('#filterSelectBox').value;
  const active = document.querySelector(".side-nav__link--active").id;
  const mainCategory = data[active];
  clearCanvas();


  selectedData.forEach(selected => {
    if (selected.includes("->")) {
      const path = selected.split("->");
      // split the text
      const title = mainCategory[path[0]]
      const SubTitle = title[path[1]]
      SubTitle.forEach(entry =>{
        if(createdIDs.includes(entry.id)) return
        creatCard(entry)
        createdIDs.push(entry.id)
      });
    } else {
      const title = mainCategory[selected];
      // check if it is object or array
      if (title instanceof Array) {
        // if its an array just creat the cards
        title.forEach(entry => {
          if(createdIDs.includes(entry.id)) return
          creatCard(entry)
          createdIDs.push(entry.id)
        })
      } else {
        // if its an object collect the keys and creat cards for each object key
        const subTitles = Object.keys(title);
        subTitles.forEach( key => {
          title[key].forEach(entry => {
            if(createdIDs.includes(entry.id)) return
            creatCard(entry)
            createdIDs.push(entry.id)
          });
        })
      }
    }
  });

  //////////////////// get the search fild text ////////////////////
  // console.log(document.querySelector(".vscomp-search-input").value);
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
  let arr = []
  // toggle the filter-box is needed and get the cards
  if (selectBoxData){
    // show the filter-box  
    document.querySelector('.filter-nav').classList.remove('filter-nav--hide');
    document.querySelector('#filterSelectBox').setOptions(selectBoxData);

    ////////////////////// create all the cards for each option
    // const targetedData = Object.values(data[targetID])
    // targetedData.forEach(entry => {
    //   if(entry instanceof Array){
    //     // if entry is an array push them in the arr
    //     entry.forEach(e => arr.push(e));
    //   } else {
    //     // if entry is an object flat get the values then push them in the arr
    //     const objArr = Object.values(entry).flat();
    //     objArr.forEach(e=> arr.push(e));
    //   }
    // });
  } else {
    // hide the filter-box
    document.querySelector('.filter-nav').classList.add('filter-nav--hide');
    arr = data[targetID]
  }
  // show all the available cards
  arr.forEach(entry => creatCard(entry));
}

// only accept numbner in the mobile imput
function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
      return false;
  return true;
}

// replace the links in the messageList object
function replaceLangLinks(dataObj,lang){
  let link
  // add title and url to messageList
  if (lang === "ara"){
    link = dataObj.araLink
  } else if (lang === "eng"){
    link = dataObj.engLink
  } else {
    link = dataObj.link
  }
  messageList[dataObj.id] = link;
}

// create the message and enable the whatsApp send ntm
function populateMessageData(){
  // let links = Object.values(messageList).join('%0a');
  let links = Object.entries(messageList).map(x=>x.join(": ")).join("%0a");
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

function clearMessageList(){
  messageList = {};
  const checkedBoxes = document.querySelectorAll('input[name="card"]:checked');
  const sideBarList = document.getElementById('sideBarList');
  const MobileInput = document.getElementById('mobileNum');
  checkedBoxes.forEach(checkbox => checkbox.checked = false);
  sideBarList.innerHTML = '';
  MobileInput.value = '';
  sideBarMenu.classList.remove("sidebar--active");
  populateMessageData();
}

populateMessageData()


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

sideNavMenu.addEventListener("touchstart", function(){

});
sideNavMenu.addEventListener("touchstart", function(){

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

document.addEventListener('click', function(event) {
  const closestDivIsNotNull = event.target.closest('div')
  if(sideBarMenu.classList.contains("sidebar--active") && !event.target.isEqualNode(sideBarMenu) && !sideBarMenu.contains(event.target) && closestDivIsNotNull ){
    sideBarMenu.classList.remove("sidebar--active");
  }
});


/////////////////////////////////////////////////////////////////////////
//////////////////////// starting the dropbox ///////////////////////////
/////////////////////////////////////////////////////////////////////////


VirtualSelect.init({
    ele: '#filterSelectBox',
    // options: creatingLists('exercisesGif'),
    multiple: true,
    search: true,
    placeholder: 'Select Body Region',
    // optionsCount: 5,
    showValueAsTags: false,
    // dropboxWidth: '30rem',
    // tooltipAlignment: 'center',
    // tooltipMaxWidth: '50rem',
    showDropboxAsPopup: false,
    // popupDropboxBreakpoint: '400px',
    useGroupValue: true,
    markSearchResults: true,
    selectAllOnlyVisible:true,
});