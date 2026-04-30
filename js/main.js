// ==========================================
// LOADING COLORS FROM LOCAL STORAGE
// ==========================================

let savedColors = localStorage.getItem("siteColors");
if (savedColors) {
  let colorsObj = JSON.parse(savedColors);
  document.documentElement.style.setProperty(
    "--main-color",
    colorsObj.mainColor,
  );
  document.querySelector(".settings-box").style.backgroundColor =
    colorsObj.settingsColor;
}
//loading the background from local storage if the user choose the static option before

// ==========================================
// ENDING LOCAL STORAGE
// ==========================================

// Grab the main landing page element from the HTML so we can change its background
const landingPage = document.querySelector(".landing-page");
// An array containing the file paths for all the possible background images
const imagesArray = [
  "url('../images/1.jpg')",
  "url('../images/2.jpg')",
  "url('../images/3.jpg')",
  "url('../images/4.jpg')",
  "url('../images/5.jpg')",
  "url('../images/6.png')",
  "url('../images/7.jpeg')",
];

// 1. Put the background changing logic inside a named function so it can be reused

function randomizeBackground() {
  landingPage.style.backgroundImage =
    imagesArray[Math.floor(Math.random() * imagesArray.length)];
}

// 2. Start the timer immediately and save the receipt
let imageIntraval = setInterval(randomizeBackground, 10000);

// ==========================================
// STARTING SETTINGS BOX EFFECTS
// ==========================================

// Listen for a click on the gear icon inside the toggle-settings div
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle the 'fa-spin' class on the gear itself to make it start/stop spinning
  this.classList.toggle("fa-spin");
  // Toggle the 'open' class on the settings box to slide it in or out of the screen
  document.querySelector(".settings-box").classList.toggle("open");
  // Hiding the logo when the setting box is open to stop the underflow/overlap
  // Check if the settings box currently has the "open" class
  if (document.querySelector(".settings-box").classList.contains("open")) {
    // If it is open, add the "open" class to the logo (which likely hides it via CSS)
    document
      .querySelector(".landing-page .header-section .logo")
      .classList.add("open");
  } else {
    // If the settings box is closed, remove the "open" class so the logo reappears
    document
      .querySelector(".landing-page .header-section .logo")
      .classList.remove("open");
  }
};

// changing the site main colors function
let colorList = document.querySelectorAll(".settings-box .options ul li");

// Loop through every single color circle element one by one
colorList.forEach((li) => {
  // Grab the settings box element so we can change its background color later
  let box = document.querySelector(".settings-box");

  // Adding a click event to the specific color circle we are currently looping over
  li.addEventListener("click", (e) => {
    //saving the colors info inside an object to be stored in local storage
    let colorsObj = {
      mainColor: e.target.dataset.color,
      settingsColor: e.target.dataset.settings,
    };
    // Removing the border from ALL the color circles to reset them
    colorList.forEach(function (li) {
      li.style.border = "none";
    });
    // Change the root CSS variable (--main-color) to match the clicked circle's data-color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color,
    );
    localStorage.setItem("siteColors", JSON.stringify(colorsObj));
    // Changing the settings box background color to match the clicked circle's data-settings
    box.style.backgroundColor = e.target.dataset.settings;
    // Adding a white border ONLY to the circle that was just clicked
    li.style.border = "2px solid white";
  });
});

// ==========================================
// STARTING BACKGROUND EFFECTS
// ==========================================

let backGrOp = document.querySelectorAll(
  ".settings-box .options .background-container .background-options span",
);
// searching inside the local storgae to find the active class to take the needed actions
let backgroundImg;
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
// the action of clicking on the background options to choose between static and random background
backGrOp.forEach((span) => {
  span.addEventListener("click", (e) => {
    //  if u choose the static option
    if (e.target.dataset.background === "static") {
      localStorage.setItem("backgroundOption", "static");
      backgroundImg = landingPage.style.backgroundImage;
      localStorage.setItem("chosenBackground", backgroundImg);
      clearInterval(imageIntraval);
      //removing the active class logic
      backGrOp.forEach((span) => {
        span.classList.remove("active");
      });
      backGrOp[0].classList.add("active");
    }
    // if u choose the random option
    else if (e.target.dataset.background === "random") {
      localStorage.setItem("backgroundOption", "random");
      backgroundImg = landingPage.style.backgroundImage;
      localStorage.setItem("chosenBackground", backgroundImg);
      clearInterval(imageIntraval);
      imageIntraval = setInterval(randomizeBackground, 10000);
      // removing the active class logic
      backGrOp.forEach((span) => {
        span.classList.remove("active");
      });
      backGrOp[1].classList.add("active");
    }
  });
});

// ==========================================
// ENDING BACKGROUND EFFECTS
// ==========================================

// ==========================================
// ENDING SETTINGS BOX EFFECTS
// ==========================================

// ==========================================
// STARTING HAM EFFECTS
// ==========================================
let hamIcon = document.querySelector(".hidden-ham i");
let hamLinks = document.querySelector(".hidden-ham .links");
hamIcon.onclick = function (e) 
{
  e.stopPropagation();

  hamLinks.classList.toggle("open");
};

// 2. Clicking anywhere inside the open menu keeps it open (stops the click from spreading)
hamLinks.onclick = function (e) 
{
  e.stopPropagation();
  
};

// 3. Clicking anywhere else on the document closes the menu
document.addEventListener("click", (e) => {
  if (hamLinks.classList.contains("open")) {
    hamLinks.classList.remove("open");
    
  }

});

// ==========================================
// ENDING HAM EFFECTS
// ==========================================

// hoho
// ==========================================
// STARTING SKILLS SECTION EFFECTS
// ==========================================
let skillsList=document.querySelectorAll(".skills .skills-progress .skill span");
console.log(skillsList)
skillsList.forEach((span)=>{
  console.log(span);
   span.style.width=span.dataset.precentage;
})


// ==========================================
// ENDING SKILLS SECTION EFFECTS
// ==========================================