// const sideNavMenu = document.querySelector(".side-nav");

// if(sideNavMenu){
//   const sideNavBtn = document.querySelector(".side-nav__btn");
//   const sideNavTitles = document.querySelectorAll(".side-nav__link--title");
  
//   sideNavBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//     sideNavBtn.classList.toggle("side-nav__btn--active");
//     sideNavMenu.classList.toggle("side-nav--active");
//     sideNavTitles.forEach((title) => title.classList.toggle("hidden-text"));
//   });
// }

///////////////////////////////////////////////////

// const servicesSideNav = document.querySelector('#servicesSideNav');
// let servicesInitID = 'checkups';

// // console.log(servicesSideNav);
// if(servicesSideNav){
//   const services = document.querySelector(`#${servicesInitID}`);

//   if(services){
//     services.classList.add('side-nav__link--active');
//     document.querySelector(`#${servicesInitID}Article`).classList.add('article--active');
//   }

//   const links = servicesSideNav.querySelectorAll('.side-nav__link');
//   const contents = document.querySelectorAll('.article')

//   links.forEach(link => {
//     link.addEventListener('click',function(e){
//       e.preventDefault();
//       const targetLink = e.target.closest("button");
//       const targetID = e.target.closest("button").id;
      

//       const targetArticle = document.querySelector(`#${targetID}Article`);
//       const activeContnet = document.querySelector('.article--active');

//       links.forEach(link => link.classList.remove('side-nav__link--active'));


//       targetLink.classList.add('side-nav__link--active');

//       activeContnet.style.display = "none";
//       setTimeout(function(){ 
//         activeContnet.style.display = "block";
//        }, 600);

//       contents.forEach(content => {
//         content.classList.remove('article--active');
      
//       } );

//       targetArticle.classList.add('article--active');

//     })
//   })
// }

