///////////////////////////////////////////////////////////////////////
///////////////// lazy loading to inchance preformance ////////////////
///////////////////////// base on the data-src ////////////////////////

/////////////////// Object Oriented programing /////////////////
// const lazyLoadingImages = {
//     targets : document.querySelectorAll("img[data-src]"),
//     obsOptions: {
//       root: null,
//       threshold: 0,
//       rootMargin: "200px",
//     },
//     imgObserver: new IntersectionObserver(function (entries, observer) {
//       const [entry] = entries;
//       if (!entry.isIntersecting) return;
//       entry.target.src = entry.target.dataset.src;
//       entry.target.addEventListener("load", function () {
//         entry.target.classList.remove("lazy-img");
//       });
//       observer.unobserve(entry.target);
//     }, this.obsOptions),
//     start : function() {
//       const images = this.targets;
//       images.forEach((img) => 
//       this.imgObserver.observe(img)
//       );
//     }
// }

// lazyLoadingImages.start()



////////////////// Functional programing ///////////////////////
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