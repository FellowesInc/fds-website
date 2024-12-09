$(window).on('load', function () {
  const mediaQuery992 = window.matchMedia('(min-width: 992px)');
  const mediaQueryMax992 = window.matchMedia('(max-width: 991.99px)');

  let videoPlay = document.querySelector('.video-play-wrapper');

  if (videoPlay) {
    let designVid = document.querySelector('#effortless-install-vid');
    $(videoPlay).click(function () {
      $(designVid).trigger('play');
    });
    $(designVid).on('play', function () {
      $(videoPlay).addClass('hide');
      $(designVid).removeClass('hide');
    });
    $(designVid).on('ended', function () {
      $(designVid).addClass('hide');
      $(videoPlay).removeClass('hide');
    });
  }

  const titanSlides = document.querySelectorAll('.titanSliderGrid.carousel-item');

  $(titanSlides).each(function () {
    let highlightTrigger = this.querySelectorAll('.design-details-wrapper');

    $(highlightTrigger).each(function () {
      let dataSlideTrigger = $(this).data('highlight-trigger');
      let highlightImg = $(this)
        .closest('.titanSliderGrid')
        .find('.titanHighlightImg[data-highlight-id="' + dataSlideTrigger + '"]');

      if (mediaQueryMax992.matches) {
        $(this).on('click', function () {
          if ($(highlightImg).hasClass('show')) {
            $('.titanHighlightImg').removeClass('show');
          } else {
            $('.titanHighlightImg').removeClass('show');
            $(highlightImg).addClass('show');
          }
        });
      }

      if (mediaQuery992.matches) {
        $(this).hover(
          function () {
            $('.titanHighlightImg').removeClass('show');
            $(highlightImg).addClass('show');
          },
          function () {
            $('.titanHighlightImg').removeClass('show');
          }
        );
      }
    });
  });

  menu = $('.custom-section-nav-section');

  if (menu.length) {
    menu1 = $('#evolve');
    thatheight = $('#evolve').height() / 4;

    menu2 = $('.sticky-start');

    origOffsetY = menu2.offset().top;
    origOffsetY1 = menu1.offset().top + thatheight;

    $(window).scroll(function () {
      if ($(window).scrollTop() > origOffsetY && $(window).scrollTop() < origOffsetY1) {
        menu.addClass('fixed-top');
        $('.navbar').addClass('d-none');
      } else {
        menu.removeClass('fixed-top');
        $('.navbar').removeClass('d-none');
      }
    });

    $(window).on('scroll', function () {
      section5 = $('#evolve');
      section5offsetY = section5.offset().top;
      if ($(window).scrollTop() > origOffsetY1) {
        var htmltomove = $('.htmltomove').html();
        $('.movedhtml').html(htmltomove);
      } else {
        $('.movedhtml').html('');
      }
    });
  }
});
