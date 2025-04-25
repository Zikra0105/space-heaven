let currentIndex = 0;
    const slidesToShow = 3; // Adjust this for different screen sizes
    const totalSlides = document.querySelectorAll('.card').length;
    const carousel = document.querySelector('.carousel');
    const slideWidth = document.querySelector('.card').offsetWidth + 20; // Adjusting for gap

    function moveSlide(step) {
        currentIndex += step;
        if (currentIndex < 0) {
            currentIndex = totalSlides - slidesToShow;
        } else if (currentIndex >= totalSlides - slidesToShow + 1) {
            currentIndex = 0;
        }
        carousel.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    }

    // Make sure it resizes properly on different screen sizes
    window.addEventListener('resize', () => {
        const newSlideWidth = document.querySelector('.card').offsetWidth + 20;
        carousel.style.transform = `translateX(${-currentIndex * newSlideWidth}px)`;
    });