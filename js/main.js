







// ==========================================
// LOCAL STORAGE: COLORS & BACKGROUND
// ==========================================

let savedColors = localStorage.getItem("siteColors");

// Applies saved theme colors if they exist in local storage
if (savedColors) {
  let colorsObj = JSON.parse(savedColors);
  document.documentElement.style.setProperty("--main-color", colorsObj.mainColor);
  document.querySelector(".settings-box").style.backgroundColor = colorsObj.settingsColor;
}
















// ==========================================
// LANDING PAGE: BACKGROUND RANDOMIZATION
// ==========================================

const landingPage = document.querySelector(".landing-page");
const imagesArray = [
  "url('../images/1.jpg')",
  "url('../images/2.jpg')",
  "url('../images/3.jpg')",
  "url('../images/4.jpg')",
  "url('../images/5.jpg')",
  "url('../images/6.png')",
  "url('../images/7.jpeg')",
];

// Changes the background image to a random file from the array
function randomizeBackground() {
  landingPage.style.backgroundImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
}

let imageIntraval = setInterval(randomizeBackground, 10000);



















// ==========================================
// SETTINGS BOX: TOGGLE MENU & COLORS
// ==========================================

// Toggles the settings menu open/closed and hides the logo to prevent visual overlap
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");

  if (document.querySelector(".settings-box").classList.contains("open")) {
    document.querySelector(".landing-page .header-section .logo").classList.add("open");
  } else {
    document.querySelector(".landing-page .header-section .logo").classList.remove("open");
  }
};

let colorList = document.querySelectorAll(".settings-box .options ul li");
let box = document.querySelector(".settings-box");

// Handling  clicking on color swatches to update CSS variables and Local Storage
colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    let colorsObj = {
      mainColor: e.target.dataset.color,
      settingsColor: e.target.dataset.settings,
    };
    colorList.forEach((li) => { li.style.border = "none"; });
    e.target.style.border = "2px solid white";

    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    box.style.backgroundColor = e.target.dataset.settings;
    localStorage.setItem("siteColors", JSON.stringify(colorsObj));
  });
});




















// ==========================================
// SETTINGS BOX: BACKGROUND OPTIONS
// ==========================================

let backGrOp = document.querySelectorAll(".settings-box .options .background-type-container .background-options span");
let backgroundImg;

// Load previously saved background preferences
landingPage.style.backgroundImage = localStorage.getItem("chosenBackground");

if (localStorage.getItem("backgroundOption") === "static") {
  backGrOp[0].classList.add("active");
  clearInterval(imageIntraval);
} else {
  backGrOp[1].classList.add("active");
  clearInterval(imageIntraval);
  landingPage.style.backgroundImage = localStorage.getItem("chosenBackground");
  imageIntraval = setInterval(randomizeBackground, 10000);
}

// Handles switching between Static and Random background states
backGrOp.forEach((span) => {
  span.addEventListener("click", (e) => {
    backGrOp.forEach((span) => { span.classList.remove("active"); });
    e.target.classList.add("active");

    if (e.target.dataset.background === "static") {
      localStorage.setItem("backgroundOption", "static");
      backgroundImg = landingPage.style.backgroundImage;
      localStorage.setItem("chosenBackground", backgroundImg);
      clearInterval(imageIntraval);
    } 
    else if (e.target.dataset.background === "random") {
      localStorage.setItem("backgroundOption", "random");
      backgroundImg = landingPage.style.backgroundImage;
      localStorage.setItem("chosenBackground", backgroundImg);
      clearInterval(imageIntraval);
      imageIntraval = setInterval(randomizeBackground, 10000);
    }
  });
});
















// ==========================================
// MOBILE HAMBURGER MENU
// ==========================================

let hamIcon = document.querySelector(".hidden-ham i");
let hamLinks = document.querySelector(".hidden-ham .links");

// Toggles the mobile menu
hamIcon.onclick = function (e) {
  e.stopPropagation();
  hamLinks.classList.toggle("open");
};

// Stops clicks inside the menu from closing it
hamLinks.onclick = function (e) {
  e.stopPropagation();
};

// Closes the menu if the user clicks anywhere else on the document
document.addEventListener("click", (e) => {
  if (hamLinks.classList.contains("open")) {
    hamLinks.classList.remove("open");
  }
});

















// ==========================================
// SKILLS SECTION: SCROLL ANIMATION
// ==========================================

let skillSpan = document.querySelectorAll(".skills .skills-progress .skill span");
let skillSection = document.querySelector(".skills");

// Animates the skill progress bars only when the user scrolls down to them
window.onscroll = function () {
  let skillsOffsetTop = skillSection.offsetTop; 
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  let NeededScroll = skillsOffsetTop - windowHeight;

  if (windowScrollTop >= NeededScroll + 150) {
    skillSpan.forEach((span) => { span.style.width = span.dataset.precentage; });
  } else {
    skillSpan.forEach((span) => { span.style.width = "0px"; });
  }
};



















// ==========================================
// GALLERY SECTION: IMAGE POPUP
// ==========================================

let GalleryList = document.querySelectorAll(".gallery .gal-images img");

// Generates a full-screen overlay and high-res image popup when a gallery photo is clicked
GalleryList.forEach(function (image) {
  image.onclick = function (e) {
    
    let popUpOverlay = document.createElement("div");
    popUpOverlay.className = "popup-background";
    document.body.appendChild(popUpOverlay);

    let imageContainer = document.createElement("div");
    imageContainer.className = "popup-image-container";

    if (e.target.alt) {
      let imageHeading = document.createElement("h2");
      imageHeading.textContent = e.target.alt;
      imageContainer.appendChild(imageHeading);
    } 

    let closeButtonContainer = document.createElement("div");
    closeButtonContainer.className = "close-button-container";
    imageContainer.appendChild(closeButtonContainer);

    let closeButton = document.createElement("p");
    closeButton.textContent = "X";
    closeButton.className = "close-button";
    closeButtonContainer.appendChild(closeButton);

    let popUpImage = document.createElement("img");
    popUpImage.className = "popup-image";
    popUpImage.src = e.target.src;

    imageContainer.appendChild(popUpImage);
    popUpOverlay.appendChild(imageContainer);
    // Destroys the popup if the overlay background or the 'X' button is clicked
    popUpOverlay.addEventListener("click", function (e) {
      if (e.target === this || closeButtonContainer.contains(e.target)) {
        document.body.removeChild(popUpOverlay);
      }
    });
  };
});












// ==========================================
// SMOOTH SCROLLING NAVIGATION
// ==========================================

// Helper function to glide the window to a specific section based on data attributes
let sectionSelector = function (event) {
  let scrollSection = document.querySelector(event.target.dataset.section);
  if(scrollSection) {
    scrollSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// 1. Navigation from Side Bullets

let bullets = document.querySelectorAll(".navigation-bullets .bullet");

bullets.forEach((e) => {

  e.addEventListener("click", (event) => {
    sectionSelector(event);  
  });
});

// 2. Navigation from Desktop Menu Bar
let menuBar = document.querySelectorAll(".landing-page .header-section a");
menuBar.forEach((e) => {
  e.addEventListener("click", (event) => {
    event.preventDefault();
    sectionSelector(event);
  });
});

// 3. Navigation from Mobile Hamburger Menu
let hiddenMenuBar = document.querySelectorAll(".landing-page .overlay .hidden-ham a");
hiddenMenuBar.forEach((e) => {
  e.addEventListener("click", (event) => {
    event.preventDefault();
    sectionSelector(event);
  });
});

document.querySelector(".navigation-bullets").style.display = "block";







// ==========================================
//  NAVIGATION BULLETS VISIBILTY
// ==========================================
let bulletsVisbilty=document.querySelectorAll(".bullets-visablity .background-options span");
let navigationBullets=document.querySelector(".navigation-bullets");




// transferring the acitve class 
let activeHandling=function(clickedElement)
{
  let list=clickedElement.parentElement.querySelectorAll("span");

  list.forEach((e)=>
    { 
      e.classList.remove("active");
    })
// adding the acitve class to the clicked element
clickedElement.classList.add("active")
//saving to local storage concept

if(clickedElement.dataset.visibilty==="hidden")
{ 
  
  localStorage.setItem("bulletsVisbilty","hidden")
  //hiding the bullets
  navigationBullets.style.display="none";
}
else{
  localStorage.setItem("bulletsVisbilty","visable")
  //hiding the bullets
  navigationBullets.style.display="block";
}
}

//the active class logic
bulletsVisbilty.forEach((span)=>{
    if(localStorage.getItem("bulletsVisbilty")==="hidden"){
      bulletsVisbilty[0].classList.add("active");
      navigationBullets.style.display="none";
      
      
    }
    else
    {
      bulletsVisbilty[1].classList.add("active");
      navigationBullets.style.display="block";

      
    }
  span.onclick=function(event){
  activeHandling(event.target)
  }
 
  
})










// ==========================================
//  RESETING TO DEFAULT OPTIONS
// ==========================================
let resetBtn=document.querySelector(".resetting-btn button");
resetBtn.onclick=function(event){
  
  localStorage.removeItem("backgroundOption");
  localStorage.removeItem("bulletsVisbilty");
  localStorage.removeItem("siteColors");
  window.location.reload();

}