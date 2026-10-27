
document.addEventListener('DOMContentLoaded', () => {

    const desktopQuery = window.matchMedia('(min-width: 992px)');

    document.querySelectorAll('.centro-color-group').forEach(group => {

        const swatches = [...group.querySelectorAll('.centro-swatch')];
        const source = group.querySelector('.centro-color-picture source');
        const image = group.querySelector('.centro-active-image');

        if (!swatches.length || !image) return;

        let selected = swatches.find(swatch =>
            swatch.classList.contains('is-selected')
        ) || swatches[0];

        let hovered = null;

        // Preload images for the current viewport
        function preloadImages() {
            swatches.forEach(swatch => {
                const src = desktopQuery.matches
                    ? swatch.dataset.desktop
                    : swatch.dataset.mobile;

                if (!src) return;

                const preload = new Image();
                preload.src = src;
            });
        }

        // Display the requested color
        function showColor(swatch) {
            if (!swatch) return;

            const desktop = swatch.dataset.desktop;
            const mobile = swatch.dataset.mobile;

            if (source && desktop && source.getAttribute('srcset') !== desktop) {
                source.setAttribute('srcset', desktop);
            }

            if (mobile && image.getAttribute('src') !== mobile) {
                image.setAttribute('src', mobile);
            }

            image.alt = `Centro product in ${swatch.dataset.color} finish`;
        }

        // Preview priority: hover, focus, selected
        function updatePreview() {
            const focused = swatches.find(swatch =>
                swatch === document.activeElement
            );

            showColor(hovered || focused || selected);
        }

        // Permanently select a color
        function selectColor(swatch) {
            selected = swatch;

            swatches.forEach(button => {
                const isSelected = button === swatch;

                button.classList.toggle('is-selected', isSelected);
                button.setAttribute('aria-pressed', String(isSelected));
            });

            updatePreview();
        }

        // Swatch events
        swatches.forEach(swatch => {

            swatch.addEventListener('mouseenter', () => {
                hovered = swatch;
                updatePreview();
            });

            swatch.addEventListener('mouseleave', () => {
                if (hovered === swatch) hovered = null;
                updatePreview();
            });

            swatch.addEventListener('focus', updatePreview);

            swatch.addEventListener('blur', () => {
                requestAnimationFrame(updatePreview);
            });

            swatch.addEventListener('click', () => {
                selectColor(swatch);
            });

        });

        // Initialize
        selectColor(selected);
        preloadImages();

        // Preload alternate sizes if viewport crosses breakpoint
        desktopQuery.addEventListener('change', preloadImages);

    });


const slider = document.querySelector('#centro-collections-slider');

if (!slider || typeof Splide === 'undefined') return;

new Splide(slider, {
  type: 'slide',
  mediaQuery: 'min',
  autoWidth: true,
  perMove: 1,
  flickMaxPages: 1,

  gap: '20px',
  padding: {
    left: '20px',
    right: 0
  },

  arrows: false,
  pagination: false,

  drag: true,
  snap: true,
  speed: 500,
  rewind: false,
  keyboard: 'focused',

  reducedMotion: {
    speed: 0,
    rewindSpeed: 0
  },

  breakpoints: {
    768: {
      gap: '25px',
      padding: {
        left: '30px',
        right: 0
      }
    },

    992: {
      gap: '50px',
      padding: {
        left: '4vw',
        right: 0
      }
    }
  }
}).mount();


});
