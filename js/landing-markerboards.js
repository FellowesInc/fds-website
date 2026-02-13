$(window).on('load', function () {

  const $slider = $('.custom-slider');
  const $viewport = $slider.parent();
  const $prev = $('.prev-arrow');
  const $next = $('.next-arrow');

  let $originalSlides = $slider.children('.custom-slide');
  const slideCount = $originalSlides.length;

  const TRANSITION_SPEED = 400;
  let isAnimating = false;

  /* ------------------------------------
     CLONE FIRST + LAST FOR TRUE INFINITE
  ------------------------------------ */

  const $firstClone = $originalSlides.first().clone(true).addClass('clone');
  const $lastClone  = $originalSlides.last().clone(true).addClass('clone');

  $slider.prepend($lastClone);
  $slider.append($firstClone);

  let $slides = $slider.children('.custom-slide');

  // Start at real first slide (index 1 because of prepended clone)
  let currentIndex = 1;

  /* ------------------------------------
     ARIA UPDATE
  ------------------------------------ */

  function updateARIA() {
    $slides
      .attr('aria-hidden', 'true')
      .removeClass('active');

    $slides.eq(currentIndex)
      .attr('aria-hidden', 'false')
      .addClass('active');
  }

  /* ------------------------------------
     CENTER ACTIVE SLIDE
  ------------------------------------ */

  function centerSlide(animate = true) {

    if (animate) {
      $slider.css('transition', `transform ${TRANSITION_SPEED}ms ease`);
    } else {
      $slider.css('transition', 'none');
    }

    const sliderWidth = $viewport.outerWidth();
    const $active = $slides.eq(currentIndex);

    const slideLeft = $active[0].offsetLeft;
    const slideWidth = $active.outerWidth(true);

    const offset = slideLeft - (sliderWidth / 2 - slideWidth / 2);

    $slider.css('transform', `translateX(-${offset}px)`);

    updateARIA();
  }

  /* ------------------------------------
     CORE NAVIGATION LOGIC
  ------------------------------------ */

  function goToSlide(index) {
    if (isAnimating) return;

    isAnimating = true;
    currentIndex = index;

    centerSlide(true);

    setTimeout(() => {

      // Hit cloned last
      if (currentIndex === slideCount + 1) {
        currentIndex = 1;
        centerSlide(false);
      }

      // Hit cloned first
      if (currentIndex === 0) {
        currentIndex = slideCount;
        centerSlide(false);
      }

      isAnimating = false;

    }, TRANSITION_SPEED);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  /* ------------------------------------
     ARROW EVENTS
  ------------------------------------ */

  $next.on('click', nextSlide);
  $prev.on('click', prevSlide);

  /* ------------------------------------
     KEYBOARD ACCESSIBILITY
  ------------------------------------ */

  $next.add($prev).on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      $(this).hasClass('next-arrow') ? nextSlide() : prevSlide();
    }
  });

  /* ------------------------------------
     MOBILE SWIPE (NO FREEZE VERSION)
  ------------------------------------ */

  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  $slider.on('touchstart', function (e) {
    if (isAnimating) return;

    startX = e.originalEvent.touches[0].clientX;
    isSwiping = true;
  });

  $slider.on('touchmove', function (e) {
    if (!isSwiping) return;
    currentX = e.originalEvent.touches[0].clientX;
  });

  $slider.on('touchend', function () {
    if (!isSwiping) return;

    const diff = startX - currentX;

    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isSwiping = false;
    startX = 0;
    currentX = 0;
  });

  /* ------------------------------------
     RESIZE SAFETY
  ------------------------------------ */

  $(window).on('resize', function () {
    centerSlide(false);
  });

  /* ------------------------------------
     INITIAL POSITIONING
  ------------------------------------ */

  centerSlide(false);

});
