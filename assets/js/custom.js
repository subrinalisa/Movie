(function ($) {
    'use strict';
    // Preloader
    jQuery(window).on('load', function () {
        jQuery("#preloader").delay(250).fadeOut(250);
    });
    // Scroll up
    $(function () {
        $.scrollUp({
            scrollName: 'scrollUp',
            scrollText: 'Up',
            activeOverlay: false
        });
    });
    // Restrict Inspect
    document.onkeydown = function (e) {
        if (e.ctrlKey &&
            (e.keyCode === 67 ||
                e.keyCode === 86 ||
                e.keyCode === 85 ||
                e.keyCode === 117)) {
            return false;
        } else {
            return true;
        }
    };
    $(document).keypress("u", function (e) {
        if (e.ctrlKey) {
            return false;
        } else {
            return true;
        }
    });
    // Navigation menu
    const loc = location.href;
    const navLink = document.querySelectorAll('#navigation .nav-link');
    for (let i = 0; i < navLink.length; i++) {
        if (navLink[i].href == loc) {
            navLink[i].classList.add('active');
        }
    }
})(jQuery);