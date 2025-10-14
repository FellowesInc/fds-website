$(document).ready(function () {
  menu = $('.steps-menu');
  menu1 = $('#optimize');
  thatheight = $('#optimize').height() / 4;
  menu2 = $('.sticky-start');
  if (menu2.length) {
    origOffsetY = menu2.offset().top;
  }
  if (menu1.length) {
    origOffsetY1 = menu1.offset().top + thatheight;
    console.log(origOffsetY1);
  }

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
    section5 = $('#optimize');
    section5offsetY = section5.offset().top;
    if ($(window).scrollTop() > origOffsetY1) {
      var htmltomove = $('.htmltomove').html();
      $('.movedhtml').html(htmltomove);
    } else {
      $('.movedhtml').html('');
    }
  });
});