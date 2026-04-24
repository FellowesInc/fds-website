document.addEventListener('DOMContentLoaded', function () {
  const breakpoint = 992;

  /* Outer surface switcher */
  document.querySelectorAll('[data-switcher]').forEach((switcher) => {
    const items = switcher.querySelectorAll('.surface-switcher__item');
    const desktopPanels = switcher.querySelectorAll('.surface-switcher__desktop-panel');

    function getTabId(item) {
      const trigger = item.querySelector('.surface-switcher__trigger');
      return trigger ? trigger.getAttribute('data-tab') : null;
    }

    function setActive(targetItem) {
      const targetTabId = getTabId(targetItem);

      items.forEach((item) => {
        const trigger = item.querySelector('.surface-switcher__trigger');
        const isActive = item === targetItem;

        item.classList.toggle('is-active', isActive);

        if (trigger) {
          trigger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
          trigger.setAttribute('aria-selected', isActive ? 'true' : 'false');
        }
      });

      desktopPanels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-desktop-panel') !== targetTabId;
      });
    }

    function clearActive() {
      items.forEach((item) => {
        const trigger = item.querySelector('.surface-switcher__trigger');

        item.classList.remove('is-active');

        if (trigger) {
          trigger.setAttribute('aria-expanded', 'false');
          trigger.setAttribute('aria-selected', 'false');
        }
      });

      desktopPanels.forEach((panel) => {
        panel.hidden = true;
      });
    }

    items.forEach((item) => {
      const trigger = item.querySelector('.surface-switcher__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', function () {
        const isMobile = window.innerWidth < breakpoint;
        const isActive = item.classList.contains('is-active');

        if (isMobile) {
          if (isActive) {
            clearActive();
          } else {
            setActive(item);

            // scroll to trigger with 70px offset
            setTimeout(() => {
              const offset = 70;
              const y = trigger.getBoundingClientRect().top + window.pageYOffset - offset;

              window.scrollTo({
                top: y,
                behavior: 'smooth'
              });
            }, 50);
          }
          return;
        }

        setActive(item);
      });
    });

    function syncOnResize() {
      const isDesktop = window.innerWidth >= breakpoint;
      const activeItem = switcher.querySelector('.surface-switcher__item.is-active');

      if (isDesktop) {
        setActive(activeItem || items[0]);
      } else {
        clearActive();
      }
    }

    syncOnResize();
    window.addEventListener('resize', syncOnResize);
  });

  /* Desktop product inner tabs */
  document.querySelectorAll('[data-product-tabs]').forEach((group) => {
    const triggers = group.querySelectorAll('[data-product-tab]');
    const panels = group.querySelectorAll('[data-product-panel]');

    function setActive(tabId) {
      triggers.forEach((trigger) => {
        const isActive = trigger.getAttribute('data-product-tab') === tabId;
        trigger.classList.toggle('is-active', isActive);
        trigger.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-product-panel') !== tabId;
      });
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', function () {
        setActive(trigger.getAttribute('data-product-tab'));
      });
    });

    const activeTrigger = group.querySelector('[data-product-tab].is-active') || triggers[0];
    if (activeTrigger) {
      setActive(activeTrigger.getAttribute('data-product-tab'));
    }
  });

  /* Mobile card sliders */
  document.querySelectorAll('[data-card-slider]').forEach(function (slider) {
    const viewport = slider.querySelector('[data-slider-viewport]');
    const slides = Array.from(slider.querySelectorAll('.mobile-card-slider__slide'));
    const prevBtn = slider.querySelector('[data-slider-prev]');
    const nextBtn = slider.querySelector('[data-slider-next]');

    if (!viewport || !slides.length) return;

    if (slides.length === 1) {
      slider.classList.add('mobile-card-slider--single');
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
      return;
    }

    let currentIndex = 0;
    let scrollTimer = null;

    function getSlideOffset(index) {
      return slides[index].offsetLeft;
    }

    function goToSlide(index, smooth = true) {
      currentIndex = Math.max(0, Math.min(index, slides.length - 1));

      viewport.scrollTo({
        left: getSlideOffset(currentIndex),
        behavior: smooth ? 'smooth' : 'auto'
      });

      updateButtons();
    }

    function updateButtons() {
      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
    }

    function updateIndexFromScroll() {
      let closestIndex = 0;
      let smallestDistance = Infinity;

      slides.forEach((slide, index) => {
        const distance = Math.abs(viewport.scrollLeft - getSlideOffset(index));

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      currentIndex = closestIndex;
      updateButtons();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToSlide(currentIndex + 1);
      });
    }

    viewport.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateIndexFromScroll, 60);
    });

    window.addEventListener('resize', function () {
      goToSlide(currentIndex, false);
    });

    goToSlide(0, false);
  });
});