$(window).on('load', function () {

  const $slider = $('.custom-slider');
  let $slides = $slider.children('.custom-slide');
  const $prev = $('.prev-arrow');
  const $next = $('.next-arrow');

  let isAnimating = false;
  let slideCount = $slides.length;

  // Clone first and last
  const $firstClone = $slides.first().clone().addClass('clone');
  const $lastClone = $slides.last().clone().addClass('clone');

  $slider.prepend($lastClone);
  $slider.append($firstClone);

  $slides = $slider.children('.custom-slide');

  let currentIndex = 1; // start on real first slide

  function updateARIA() {
    $slides.attr('aria-hidden', 'true').removeClass('active');
    $slides.eq(currentIndex)
           .attr('aria-hidden', 'false')
           .addClass('active');
  }

  function centerSlide(animate = true) {

    if (!animate) {
      $slider.css('transition', 'none');
    } else {
      $slider.css('transition', 'transform 0.4s ease');
    }

    const sliderWidth = $slider.parent().outerWidth();
    const slideLeft = $slides.eq(currentIndex)[0].offsetLeft;
    const slideWidth = $slides.eq(currentIndex).outerWidth(true);

    const offset = slideLeft - (sliderWidth / 2 - slideWidth / 2);

    $slider.css('transform', `translateX(-${offset}px)`);

    updateARIA();
  }

  function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex++;
    centerSlide(true);
  }

  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex--;
    centerSlide(true);
  }

  $slider.on('transitionend', function () {

    // If we hit clone at end
    if ($slides.eq(currentIndex).hasClass('clone')) {

      $slider.css('transition', 'none');

      if (currentIndex === slideCount + 1) {
        currentIndex = 1;
      }

      if (currentIndex === 0) {
        currentIndex = slideCount;
      }

      centerSlide(false);
    }

    isAnimating = false;
  });

  // Arrows
  $next.on('click', nextSlide);
  $prev.on('click', prevSlide);

  // Keyboard accessibility
  $next.add($prev).on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).hasClass('next-arrow') ? nextSlide() : prevSlide();
    }
  });

  // Swipe support
  let startX = 0;
  let dragging = false;

  $slider.on('touchstart', function (e) {
    startX = e.originalEvent.touches[0].clientX;
    dragging = true;
  });

  $slider.on('touchmove', function (e) {
    if (!dragging) return;

    const currentX = e.originalEvent.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 60) {
      dragging = false;
      diff > 0 ? nextSlide() : prevSlide();
    }
  });

  $slider.on('touchend', function () {
    dragging = false;
  });

  // Recenter on resize
  $(window).on('resize', function () {
    centerSlide(false);
  });

  // Initial position
  centerSlide(false);

});
