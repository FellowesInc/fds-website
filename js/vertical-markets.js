$(window).on('load', function () {

    const triggerEls = document.querySelectorAll('.vert-markets-nav-link ');

    if (triggerEls) {
        triggerEls.forEach((triggerEl) => {
            mdb.Tab.getInstance(triggerEl).show();
        })
    }
    
});