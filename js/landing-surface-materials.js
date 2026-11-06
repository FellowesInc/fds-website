document.addEventListener('DOMContentLoaded', function () {
    const exploreCarousel = document.querySelector('.explore-carousel');

    if (!exploreCarousel) return;

    new Splide(exploreCarousel, {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        focus: 'center',
        fixedWidth: '90%',
        gap: '6px',
        arrows: true,
        pagination: false,
        drag: true,
        snap: true,
        speed: 600,
        easing: 'ease',
        pauseOnHover: true,
        keyboard: 'focused',
        breakpoints: {
            767: {
                fixedWidth: '90%',
                gap: '4px',
                speed: 450
            }
        }
    }).mount();
});