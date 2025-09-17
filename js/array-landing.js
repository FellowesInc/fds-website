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

  // On page load, check if a hash is in the URL
  var hash = window.location.hash;
  if (hash) {
    var $tabTrigger = $('a[data-mdb-toggle="tab"][href="' + hash + '"]');
    if ($tabTrigger.length) {
      var tabInstance = new mdb.Tab($tabTrigger[0]);
      tabInstance.show();
    }
  }

});
