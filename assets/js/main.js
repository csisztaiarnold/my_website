// Initial resize of the header
function resizeHeader() {
    var windowHeight = window.innerHeight;
    var topBar = document.getElementById("top-bar");
    var topBarHeight = topBar.clientHeight;
    var header = document.getElementById("masthead");
    header.setAttribute("style","height:" + (windowHeight-topBarHeight) + "px");
    var stroke = document.getElementById("stroke_1");
    stroke.setAttribute("style","height:" + (windowHeight-topBarHeight-40) + "px");
}

document.addEventListener("DOMContentLoaded", function(event) {
    resizeHeader();
});

$(document).ready(function() {

    // Check if an element is in the viewport
    (function($) {
        $.fn.visible = function(partial) {

            var $t            = $(this),
                $w            = $(window),
                viewTop       = $w.scrollTop(),
                viewBottom    = viewTop + $w.height(),
                _top          = $t.offset().top,
                _bottom       = _top + $t.height(),
                compareTop    = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;

            return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
        };
    })(jQuery);

    // The random circles in the header
    function drawCircleRandomPosition() {
        opacity = (Math.floor((Math.random()*3)));
        borderOpacity = (Math.floor((Math.random()*5)));
        borderWidth = (Math.floor((Math.random()*5)));
        duration = (Math.floor((Math.random()*50)));
        widthHeight = (Math.floor((Math.random()*500)));
        randomX = (Math.floor((Math.random()*100)));
        randomY = (Math.floor((Math.random()*100)));

        var circle ='<div class="element" style="' +
            'top: ' + randomX + '%; ' +
            'left: ' + randomY + '%; ' +
            'width: ' + widthHeight + 'px; ' +
            'height: ' + widthHeight + 'px; ' +
            '-webkit-animation: grow ' + duration + 's normal forwards; ' +
           // 'border: ' + borderWidth + 'px dashed rgba(255, 255, 255, 0.' + borderOpacity + '); ' +
            'background: rgba(255, 255, 255, 0.' + opacity +
            ');"></div>';
        $('#graphics-layer').append(circle);
    }

    drawCircleRandomPosition();

    setInterval(function(){
        var element = document.getElementById('graphics-layer');
        var numberOfChildren = element.getElementsByTagName('*').length;
        if(numberOfChildren > 20) {
            $('#graphics-layer').find('.element').first().remove();
        }
        drawCircleRandomPosition();
    }, 2000);

    // Fades in the stuff when they reach the viewport
    $(window).scroll(function(event) {

        $(".top, .line, .separator, .year, #profile-image, p, h1, h2, h3, form").each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("fade-in");
            }
        });

        $(".arrow").each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("arrow-fade-in");
            }
        });

    });

    window.onresize = function() {
        resizeHeader();
    }

});

