/////////////////////////////////////////////////////////////////////
////////////////////// full screen image grow ///////////////////////
/////////////////////////////////////////////////////////////////////

const imgs = document.querySelectorAll('.img-btn-fscreen');
const closeBtn = document.querySelector('.close-btn');

if(img-btn-fscreen){
    function addElement (e) {
        // Create a <button> element
        var btn = document.createElement("BUTTON");
        // Insert text
        btn.innerHTML = '<span class="close-btn__icon"></span>';
        btn.classList.add("close-btn")
        // Append <button> to <body>
        e.appendChild(btn);
        // e.insertAdjacentElement('beforeend', btn);
        btn.addEventListener("click",closeImage)
      }
    
    function closeImage(){
        // ele.classList.remove('img-btn--active');
        // ele.querySelector("button").remove();
        const activeBtn = document.querySelector('.img-btn-fscreen--active');
        activeBtn.classList.remove('img-btn-fscreen--active');
        activeBtn.querySelector("button").remove();
    }
    
    imgs.forEach(img => {
        img.addEventListener("click", function(e){
            const clicked = e.target.closest(".img-btn-fscreen");
            const clickedBtn = e.target;
            if(clicked && !clicked.classList.contains('img-btn-fscreen--active')){
                clicked.classList.add('img-btn-fscreen--active');
                addElement(clicked)
            } else {
                if(clickedBtn.classList.contains('img-btn-fscreen')){
                    closeImage()
                }
            }
        })
    })
}


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
