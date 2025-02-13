$(window).on('load', function () {
  let embeddedVideoWrapper = document.querySelectorAll('.video-wrapper');

  if (embeddedVideoWrapper) {
    $(embeddedVideoWrapper).each(function () {
      let videoPlay = $(this).children('.video-play-wrapper');
      let videoItem = $(this).children('.video-wrapper video');

      $(videoPlay).click(function () {
        $(videoItem).trigger('play');
      });
      $(videoItem).on('play', function () {
        $(videoPlay).addClass('hide');
        $(videoItem).removeClass('hide');
      });
      $(videoItem).on('ended', function () {
        $(videoItem).addClass('hide');
        $(videoPlay).removeClass('hide');
      });
    });
  }
});
