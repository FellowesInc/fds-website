document.addEventListener('DOMContentLoaded', function () {

  const mediaQuerymax768 = window.matchMedia('(max-width: 767.98px)');

  if (mediaQuerymax768.matches) {
    var tabdropdown = document.getElementsByClassName('tab-dropdown');
    var navtabs = document.getElementsByClassName('season-tabs');
    var tabboxlinks = document.getElementsByClassName('seasons-tab-link');
    for (let tbd = 0; tbd < tabdropdown.length; tbd++) {
      tabdropdown[tbd].addEventListener('click', function () {
        navtabs[0].classList.toggle('show');
      });
    }
    for (let tbl = 0; tbl < tabboxlinks.length; tbl++) {
      tabboxlinks[tbl].addEventListener('click', function () {
        var tabinnerhtml = tabboxlinks[tbl].innerHTML;
        tabdropdown[0].innerHTML = tabinnerhtml;
        navtabs[0].classList.remove('show');
      });
    }
  }

});