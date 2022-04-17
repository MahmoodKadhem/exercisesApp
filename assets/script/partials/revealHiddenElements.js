///////////////////////////////////////////////////////////////
///////////////////// Functional programing ///////////////////

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
//   console.log(hidden)
//   hiddenObserver.observe(hidden);
//   hidden.classList.add("show-on-scroll");
//   hidden.style.transition = "all 1.5s";
// });


///////////////////////////////////////////////////////////////
////////////////// Object oriented programing /////////////////


const revealHiddenEleObj = {
  allHiddens : document.querySelectorAll(".scroll-hidden"),
  hiddenObserver: new IntersectionObserver(
    function (entries, observer){
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("show-on-scroll");
      observer.unobserve(entry.target);
    }, {
      root: null,
      threshold: 0.1,
    }),
  start: function(){
    const eles = this.allHiddens;
    const obs = this.hiddenObserver;
    eles.forEach((ele) => {
      obs.observe(ele);
      ele.classList.add("show-on-scroll");
      ele.style.transition = "all 1.5s";
    }) 
  }
}

revealHiddenEleObj.start()
