$(window).on('load', function () {
    const searchTrigger = document.getElementsByClassName('search-dropdown');
    const searchInput = document.getElementById('txtSearch');

    for (let st = 0; st < searchTrigger.length; st++) {
        searchTrigger[st].addEventListener('click', function () {
            setTimeout(function () {
                searchInput.focus();
            }, 100); // small delay to allow dropdown to render
        });
    }
});