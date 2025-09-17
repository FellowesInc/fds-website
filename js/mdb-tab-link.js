document.addEventListener("DOMContentLoaded", function () {
    // On page load, check if a hash is in the URL
    var hash = window.location.hash;
    if (hash) {
      var tabTrigger = document.querySelector(
        'a[data-mdb-toggle="tab"][href="' + hash + '"]'
      );

      if (tabTrigger) {
        var tabInstance = new mdb.Tab(tabTrigger);
        tabInstance.show();
      }
    }

    // Optional: Update the URL hash as tabs are changed
    var tabLinks = document.querySelectorAll('a[data-mdb-toggle="tab"]');
    tabLinks.forEach(function (tabLink) {
      tabLink.addEventListener("shown.mdb.tab", function (e) {
        history.replaceState(null, null, e.target.getAttribute("href"));
      });
    });
  });