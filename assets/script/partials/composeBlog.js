"use strict";

//////////////////////////////////variables
const addBtn = document.querySelector("#addParagraph");
const langBtns = document.querySelectorAll(`input[name="lang"]`);
const subContent = document.querySelector("#subContent");
const displayBtn = document.querySelector('#displayParagraph');
let counter = 0;
let content = [];
let lang = "en"



// const composeBlogePage = {
//   arTextarea:,
//   displayImageSittings:,
//   imgSizeDisableFunction:,
//   addRemoveEventListenerToBtn:,
//   enableSubTitle:,
// }

// flip the text area function
const arTextarea = function(){
  const textareas = document.querySelectorAll('.form__input');
  if (lang === "ar"){
    textareas.forEach(textarea => {
      textarea.lang = "ar";
      textarea.dir = "rtl";
    });
  } else {
    textareas.forEach(textarea => {
      textarea.lang = "en";
      textarea.dir = "ltr";
    });
  }
};

// update lang when clicking the lang radio
langBtns.forEach(btn => {
  btn.addEventListener('click', function(){
    lang = btn.value
    arTextarea();
  })
});

// show the image sitting if used
const displayImageSittings = function() {
  const useImgBtn = document.querySelectorAll(`.useImg`);
  useImgBtn.forEach(btn => {
   btn.addEventListener('click', function(e){
    const formGroup = e.target.closest(".form__groupContainer");
    const location = formGroup.querySelector(".form__input--text").closest('div');
    const imgSittingEle = document.createElement('div');
    imgSittingEle.classList.add("imgSittings");
    imgSittingEle.classList.add("form__groupFull--row");

     const subImgSittings = `
      <div class="form__groupThired">
        <input
          id="${'sub' + counter}inputImg"
          type="file"
          accept="image/*"
          class="form__input"
          placeholder="Full Name"
          required
          autocomplete="false"
        />
        <label for="${'sub' + counter}inputImg" class="form__label">${'sub' + counter} paragraph Image</label>
      </div>

      <div class="form__groupThired imgSize">
        <h6 class="h-6 u-m-b-vs">${'sub' + counter} Image Size:</h6>
        <div class="form__groupFlex">
          <div class = "form__radio">
            <input
              id="${'sub' + counter}big"
              name="${'sub' + counter}img-size"
              type="radio"
              class="form__radio-input"
              value = "big"
              required
            />
            <label for="${'sub' + counter}big" class="form__radio-label">
              <span class="form__radio-button"></span>
              Big
            </label>
          </div>

          <div class = "form__radio">
            <input
              id="${'sub' + counter}medium"
              name="${'sub' + counter}img-size"
              type="radio"
              class="form__radio-input"
              value = "medium"
              required
            />
            <label for="${'sub' + counter}medium" class="form__radio-label">
              <span class="form__radio-button"></span>
              Medium
            </label>
          </div>

          <div class = "form__radio">
            <input
              id="${'sub' + counter}small"
              name="${'sub' + counter}img-size"
              type="radio"
              class="form__radio-input"
              value = "small"
              required
            />
            <label for="${'sub' + counter}small" class="form__radio-label">
              <span class="form__radio-button"></span>
              Small
            </label>
          </div>

        </div>
      </div>

      <div class="form__groupThired">
        <h6 class="h-6 u-m-b-vs">placment of the ${'sub' + counter} Image:</h6>
        <div class="form__groupFlex">
          <div class = "form__radio">
            <input
              id="${'sub' + counter}leftSide"
              name="${'sub' + counter}img-side"
              type="radio"
              class="form__radio-input"
              value="start"
              required
            />
            <label for="${'sub' + counter}leftSide" class="form__radio-label">
              <span class="form__radio-button"></span>
              Left
            </label>
          </div>

          <div class = "form__radio">
            <input
              id="${'sub' + counter}rightSide"
              name="${'sub' + counter}img-side"
              type="radio"
              class="form__radio-input"
              value="end"
              required
            />
            <label for="${'sub' + counter}rightSide" class="form__radio-label">
              <span class="form__radio-button"></span>
              Right
            </label>
          </div>

          <div class = "form__radio">
            <input
              id="${'sub' + counter}center"
              name="${'sub' + counter}img-side"
              type="radio"
              class="form__radio-input"
              value="center"
              required
            />
            <label for="${'sub' + counter}center" class="form__radio-label">
              <span class="form__radio-button"></span>
              Center
            </label>
          </div>
        </div>
      </div>`
    imgSittingEle.innerHTML = subImgSittings;
    const sittings = formGroup.querySelector(".imgSittings");
 
    if(e.target.value === "true" && !sittings){
      location.before(imgSittingEle)
      imgSizeDisableFunction();
    } else if(e.target.value === "false") {
      if(sittings) sittings.remove();
    }
  });
  });
};

// // disable the selection of img side if size big is selected.
const imgSizeDisableFunction = function (){

const imgSize = document.querySelectorAll(".imgSize");

imgSize.forEach( img => img.addEventListener("click", function(e){
    // let id,imgSide,nextElementRadio

    if (e.target.closest('input')){
        const id = e.target.closest('input').value,
        imgSide = e.target.closest('.imgSize'),
        nextElementRadio = imgSide.nextElementSibling.querySelectorAll(".form__radio");
        
        // console.log(id);
        // console.log(imgSide);
        // console.log(nextElementRadio);

        if(id === "big"){
            nextElementRadio.forEach(radio => {
                radio.querySelector('input').disabled = true;
                radio.querySelector('input').checked = false;

                radio.querySelector('.form__radio-button').classList.add('form__radio-button--disabled');
            });
            
        } else {
            nextElementRadio.forEach(radio => {
                radio.querySelector('input').disabled = false;
                radio.querySelector('.form__radio-button').classList.remove('form__radio-button--disabled');
            });
        }
    }
}));
}

// //Add RemoveEventListener To remove Btn.
const addRemoveEventListenerToBtn = function(){
  const removeBtns = document.querySelectorAll(".removeParagraph");


  removeBtns.forEach(btn => {
      btn.addEventListener('click', function(e){
          e.target.closest('.form__groupContainer').remove();
      })
  });
}

// enable and disable the subTitle input
const enableSubTitle = function(){
  const radio = document.querySelectorAll(`.subtitle`);
  radio.forEach( btn => {
    btn.addEventListener('click', function(e){
      const subTitleInput = e.target.closest('.form__groupThired').nextElementSibling.querySelector('input');
      if(e.target.value === "true"){
        subTitleInput.disabled = false;
      } else {
        subTitleInput.disabled = true;
        subTitleInput.value = ""
      }
    });
  });
}

// ADDING A NEW PARAGRAPH ON ADD CLICK
addBtn.addEventListener("click",function(e){
    e.preventDefault();
    counter++;
    
    const container = document.createElement('div');
    container.className = "form__groupContainer form__subParagraph";
    container.id = `${'sub' + counter}`

    const content = `
      <div class="form__header">
        <h6 class="h-6">${'sub' + counter} paragraph</h6>
      </div>

      <div class="form__groupThired">
            <h6 class="h-6 u-m-b-vs">use title:</h6>
            <div class="form__groupFlex">
              <div class = "form__radio">
                <input
                  id="${'sub'+ counter}noTitle"
                  name="${'sub'+ counter}Title"
                  type="radio"
                  class="form__radio-input subtitle"
                  value="false"
                  checked
                  required
                />
                <label for="${'sub'+ counter}noTitle" class="form__radio-label">
                  <span class="form__radio-button"></span>
                  No.
                </label>
              </div>

              <div class = "form__radio">
                <input
                  id="${'sub'+ counter}yesTitle"
                  name="${'sub'+ counter}Title"
                  type="radio"
                  class="form__radio-input subtitle"
                  value="true"
                  required
                />
                <label for="${'sub'+ counter}yesTitle" class="form__radio-label">
                  <span class="form__radio-button"></span>
                  Yes.
                </label>
              </div>

            </div>
          </div>

      <div class="form__groupThired">
              <input
              id="${'sub'+ counter}inputTitle"
              class="form__input"
              placeholder="${'sub'+ counter} Title"
              autocomplete="false"
              disabled
            />
            <label for="${'sub'+ counter}inputTitle" class="form__label"
              >${'sub'+ counter} Title</label
            >
            </div>
      
      <div class="form__groupThired">
        <h6 class="h-6 u-m-b-vs">Use Image:</h6>
        <div class="form__groupFlex">
          <div class = "form__radio">
            <input
              id="${'sub' + counter}useImageFalse"
              name="${'sub' + counter}useImage"
              type="radio"
              class="form__radio-input useImg"
              value="false"
              checked
              required
            />
            <label for="${'sub' + counter}useImageFalse" class="form__radio-label">
              <span class="form__radio-button"></span>
              No.
            </label>
          </div>

          <div class = "form__radio">
            <input
              id="${'sub' + counter}useImageTrue"
              name="${'sub' + counter}useImage"
              type="radio"
              class="form__radio-input useImg"
              value="true"
              selected
              required
            />
            <label for="${'sub' + counter}useImageTrue" class="form__radio-label">
              <span class="form__radio-button"></span>
              Yes.
            </label>
          </div>

        </div>
      </div>


      <div class="form__groupFull">
        <textarea
          id="${'sub' + counter}inputDescription"
          class="form__input form__input--text"
          placeholder="${'sub' + counter} paragraph"
          type="text"
          required
          rows="4"
          autocomplete="false"
        ></textarea>
        <label for="${'sub' + counter}inputDescription" class="form__label"
            >${'sub' + counter} paragraph</label>
      </div>

      <button type="button" id="removeParagraph${counter}" class="btn btn--white removeParagraph">Remove Paragraph</button>`
  container.innerHTML = content;
  // subContent.innerHTML += content;
  subContent.appendChild(container);
  imgSizeDisableFunction();
  addRemoveEventListenerToBtn();
  displayImageSittings(`${'sub' + counter}`);
  enableSubTitle(`${'sub' + counter}`);
  arTextarea();
});

// DISPLAY CONTENT BUTTON

// If img size is selected
const imgSizeFunction = function(imgSize){
  // console.log(imgSize);
  const radioSize = document.querySelector(`input[name="${imgSize}"]:checked`);
  // console.log(radioSize);
  if( radioSize.value ==="big" ){
    return "l"
  } else if( radioSize.value ==="medium" ){
    return "m"
  } else if( radioSize.value ==="small" ){
    return "s"
  } else{
    return ""
  }
};

// if Image side is selected
const imgSideFunction = function(imgSide){
  const radioSide = document.querySelector(`input[name="${imgSide}"]:checked`);
  // console.log(radioSide);
  if(radioSide){
    if(radioSide.value ==="start" ){
      return "s"
    } else if(radioSide.value ==="end" ){
      return "e"
    } else {
      return "c"
    }
  }else{
    return "c"
  }
};

// create image url for display
const createImgUrl = function(imgElement){
  // console.log(imgElement);
  const [img]= imgElement;
  // console.log(img);
  return URL.createObjectURL(img);
}

// preserve the skip line in text areas
const preserveSkipLine = function(textareaID){
  return document.querySelector(textareaID).value.replace(/\n\r?/g, '<br />');
}

// create the paragraph block element
const createImgAndParagraphEle = function(obj){
  const ele = document.createElement('div');
  ele.classList.add(`article__block`);
  let subTitleElement ="",
      imgElement ="",
      pElement ="";

  // if subTitle is used
  if(obj.subTitleValue){
    subTitleElement = 
    `<h3 class="h-3 h-3--d h-3--line article__title">
      ${obj.subTitleValue}
    </h3>`
  }

  // if I'm using an Image or not?
  if(obj.useImg === "true") {
    // creat url for the image for display
    const img = createImgUrl(obj.img);
    // adding the alignment to the block
    ele.classList.add(`article__block--${obj.imgSide}`);
    imgElement = 
    `<img
        src="${img}"
        alt="Check ups img"
        class="article__img--${obj.imgSize}"
      />`
  }

  pElement = 
  `<div class="article__content--${obj.imgSize}">
    ${subTitleElement}
    <p class="p p--j">
      ${obj.inputParagraph}
    </p>
  </div>`

  const content = imgElement + pElement;
  ele.innerHTML = content;
  const doc = ele
  return doc;
};

// create the the blog list for display 
const createBlogListEle = function(){
  const blogListEle = document.createElement('div');
  blogListEle.classList.add('blog-card');
  const sImg = createImgUrl(content[0].portray);
  const blogList = 
  `<div class="blog-card__date">
      <p class="p blog-card__date-p">${content[0].date}</p>
  </div>
  <img
    id = "listImage"
    src="${sImg}"
    alt="img title"
    class="blog-card__img"
  />
  <div class="blog-card__content">
    <h5 class="h-5 h-5--p-d">${content[0].title}</h5>
    <p class="p p--j">
    ${content[0].inputParagraph.slice(0,240)}
      <a class="btn-text btn-text--d" href="#"
        >${content[0].lang === "ar" ? 'عرض المقال' :'read more'}</a
      >
    </p>
  </div>`

  blogListEle.innerHTML = blogList
  return blogListEle
}

// create the article element for display
const createArticle = function(){
  const articleContainer = document.createElement('div');
  articleContainer.className = "article article--active";

  // the title and date
  const titleAndDate = `
  <div class="u-m-b-m">
    <h2 class="h-2 h-2--d">${content[0].title}</h2>
    <p class="p">
      ${content[0].lang === "ar" ? 'الكاتب:&nbsp' :'By:&nbsp'}
      <span>${content[0].author}</span>
      ${content[0].lang === "ar" ? '&nbsp,تاريخ التحرير:&nbsp' :',Date:&nbsp'}
      <span>${content[0].date}</span>
    </p>
  </div>
  `
  articleContainer.innerHTML = titleAndDate;


  content.forEach((block) => {
    articleContainer.appendChild(createImgAndParagraphEle(block));
  });
  return articleContainer
}

// creating the content Object
const collectData = function(){
  // clear the content
  content = []
  // collect the main group data
  const MainObj = {
    lang : document.querySelector('input[name="lang"]:checked').value,
    title: document.querySelector('#inputTitle').value,
    author: document.querySelector('#inputAuthor').value,
    date: document.querySelector('#inputDate').value,
    portray: document.querySelector('#inputSmallImg').files,
    inputParagraph: preserveSkipLine('#inputDescription'),
    useImg: document.querySelector('input[name="useImage"]:checked').value,
  }

  if(MainObj.useImg === "true"){
    MainObj.img = document.querySelector('#sub0inputImg').files,
    MainObj.imgSize = imgSizeFunction("sub0img-size"),
    MainObj.imgSide = imgSideFunction("sub0img-side");
  }
  content.push(MainObj);
  // collect the sub group data
  const subParagraphs = document.querySelectorAll(".form__subParagraph");

  subParagraphs.forEach( (paragraph) => {
    const subObj = {
      id: paragraph.id,
      useSubTitle: paragraph.querySelector(`input[name="${paragraph.id}Title"]:checked`).value,
      useImg : paragraph.querySelector(`input[name="${paragraph.id}useImage"]:checked`).value,
      subTitleValue : paragraph.querySelector(`#${paragraph.id}inputTitle`).value,
      inputParagraph : preserveSkipLine(`#${paragraph.id}inputDescription`),
    }

    if(subObj.useSubTitle === "true"){
      subObj.subTitle = paragraph.querySelector('.subtitle').value;
    }

    if(subObj.useImg === "true"){
      subObj.img = document.querySelector(`#${paragraph.id}inputImg`).files;
      subObj.imgSize = imgSizeFunction(`${paragraph.id}img-size`);
      subObj.imgSide = imgSideFunction(`${paragraph.id}img-side`);
    }
    content.push(subObj);
  });
  console.log(content);
}

// display before submiting
displayBtn.addEventListener("click",function(event){
  
  collectData();
  const blogListEle = createBlogListEle();
  const article = createArticle();

  const displayContainer = document.querySelector(".main__container");

  if (content[0].lang === "ar"){
    displayContainer.lang = "ar"
    displayContainer.dir = "rtl"
  };

  displayContainer.innerHTML =""
  displayContainer.appendChild(blogListEle);
  displayContainer.appendChild(article);

});

displayImageSittings();

imgSizeDisableFunction();




