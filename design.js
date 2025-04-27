// When the user scrolls down more than 20px away from the top of the web, make the button appear
window.onscroll = function () { scrollFunction() };
let scrollPosition = document.documentElement.scrollTop;
const root = document.documentElement; // This is the root element
let bgCircle = document.getElementsByClassName("bgCircle");

function scrollFunction() {
    let topBtn = document.getElementById("topBtn");
    if (root.scrollTop > 20) {
        //scrollTop refers to get or set the number of pixels of the screen away from the top
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// Go back to top of the screen
function goToTop() {
    //to scroll back to top smoothly
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

// To display or not display in less than 1000px
function headerToggle() {
    let nav = getComputedStyle(root).getPropertyValue("--nav-toggle") //This method returns the value of --nav-toggle in root element.
    if (nav == "block") {
        root.style.setProperty("--nav-toggle", `none`); //This can change the value of variable of --nav-toggle in CSS
    } else {
        root.style.setProperty("--nav-toggle", `block`);
    }
}

// randomly generate the position, size, time of the background circles
for (let i = 0; i < bgCircle.length; i++) {
    let randomPos = Math.random() * 97;
    let randomSec = Math.random() * 5;
    let randomSize = Math.random() * 30 + 70;
    bgCircle[i].style.left = randomPos + "%";
    bgCircle[i].style.animationDelay = randomSec + "s";
    bgCircle[i].style.width = randomSize + "px";
    bgCircle[i].style.height = randomSize + "px";
}

// set the theme and save it in sessionStorage
function setTheme(themeName) {
    // remember the theme in sessionStorage
    sessionStorage.setItem('theme', themeName);
    // set the theme on the root element
    root.setAttribute('data-theme', themeName);
    // change the icon based on the theme
    if (themeName == 'dark') {
        document.getElementById("themeIcon").src = "images/icons/icon_dark_mode.png";
    } else {
        document.getElementById("themeIcon").src = "images/icons/icon_light_mode.png";
    }
}

// Initialize theme on page load from previously saved theme in sessionStorage
document.addEventListener("DOMContentLoaded", () => {
    // if the user has not saved a theme in sessionStorage yet, use the system preference
    if (sessionStorage.getItem('theme') == null) {
        // a method to check if the user has a preference for dark mode in their system
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkScheme) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }else{
        // if the user has saved a theme in sessionStorage, use that theme
        if (sessionStorage.getItem('theme') == 'dark') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

});

// this event listener will work when the user changes the system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// when the user clicks on the theme toggle button, toggle the theme
function themeToggle() {
    if (sessionStorage.getItem('theme') === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
    // fix the background image to avoid it from scrolling
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
}