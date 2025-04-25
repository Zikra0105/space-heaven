const slider = document.querySelector('.slider');
let scrollAmount = 0;

function autoSlide() {
    const slideWidth = document.querySelector('.slide').offsetWidth + 20; // Include margin
    if (scrollAmount < (slider.scrollWidth - slider.clientWidth)) {
        scrollAmount += slideWidth;
    } else {
        scrollAmount = 0;
    }
    slider.style.transform = `translateX(${-scrollAmount}px)`;
}

setInterval(autoSlide, 3000); // Slide every 3 seconds
