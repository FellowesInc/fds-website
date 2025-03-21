$(document).ready(function () {

const formCheckContainers = document.querySelectorAll('.form-check');

if (formCheckContainers) {

    $.each(formCheckContainers, function () {
    let container = $(this);
    let checkbox = $(this).find('.form-check-input');


    $(checkbox).on('change', function() {
        if (this.checked) {
        $(container).addClass('checked');
        } else {
        $(container).removeClass('checked');
        }
    });
    });

}

});