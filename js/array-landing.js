$(document).ready(function () {

  // Setup Media Queries
  var mqMax992 = window.matchMedia('(max-width: 991.98px)');

  if (mqMax992.matches) {
    const tabLists = document.querySelectorAll('.purifiers-inner-wrapper');

    if (tabLists) {

      $.each(tabLists, function() {
        let tabDropdown = $(this).find('.mobile-tab-dropdown');
        let tabList = $(this).find('.purifiers-tabs');
        let tabItems = $(this).find('.purifiers-tab-item');

        $(tabDropdown).click(function () {
          $(tabList).toggleClass('show');
        });

        $.each(tabItems, function () {
          $(this).click(function () {
            $(tabDropdown).html($(this).children().text());
            $(tabList).removeClass('show');
          });
        });

      })
    }
  }

});
