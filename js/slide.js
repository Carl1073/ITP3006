let slideIndex = 0;

// change slide by clicking on Next/previous button
function plusSlides(n) {
    slideIndex += n //n means jump to next n slides, -ve n means jump backward
    showSlides();
}

// or by clicking on the dots
function currentSlide(n) {
    slideIndex = n; //change to n-th slide
    showSlides();
}

//slide control, only 1 slide is shown at a time if the screen is larger than 1000px
function showSlides() {
    startAutoSlide(); // Reset the auto slide interval
    let slides = document.getElementsByClassName("slide-container");
    let dots = document.getElementsByClassName("slide-dot");
    slideIndex = slideIndex % slides.length; //to loop back to the first slide when reaching the last slide
    if (slideIndex < 0) { //if slideIndex is negative, loop back to the last slide
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) { //remove all slides first
        slides[i].className = slides[i].className.replace(" active", "");
    }
    for (let i = 0; i < dots.length; i++) {  //remove all active dots first
        dots[i].className = dots[i].className.replace(" active", "");
    }
    //display the current slide and set the active dot
    slides[slideIndex].className += " active";
    dots[slideIndex].className += " active";
}

// Auto slide show on page load and when the screen is larger than 1000px
let slideInterval = null;
document.addEventListener("DOMContentLoaded", () => {
    showSlides(slideIndex);
    if (document.body.clientWidth > 1000) {
        startAutoSlide();
    }
});

// Reset interval whenever user has click anywhere
document.addEventListener('click', startAutoSlide());

// start or reset the auto slide interval
function startAutoSlide() {
    clearInterval(slideInterval); // Clear the interval first to avoid multiple intervals
    // Restart the interval
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000); // Change slide every 5 seconds
}

// This function is called when the window is resized and it checks the screen width
window.onresize = function () {
    if (document.body.clientWidth < 1000) {
        clearInterval(slideInterval); // stop the auto slide
    } else {
        currentSlide(1); // start from the first slide
        startAutoSlide(); // Restart the interval
    }
}