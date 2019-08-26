/******************************************************************************************************************************
COMMING SOON PAGE
*******************************************************************************************************************************/
(function($) {
    /**
    * Set your date here  (YEAR, MONTH (0 for January/11 for December), DAY, HOUR, MINUTE, SECOND)
    * according to the GMT+0 Timezone
    **/
    var launch = new Date(2019, 07, 26, 24, 00, 00);
    /**
    * The script
    **/
    var message = $('#message');
    var days = $('#days');
    var hours = $('#hours');
    var minutes = $('#minutes');
    var seconds = $('#seconds');
    
    setDate();
    function setDate(){
        var now = new Date();
        if( launch < now ){
            days.html('<h1>0</H1><p>Дней</p>');
            hours.html('<h1>0</h1><p>Часов</p>');
            minutes.html('<h1>0</h1><p>Минут</p>');
            seconds.html('<h1>0</h1><p>Секунд</p>');
            message.html('Специально для лорикека, который лох');
        }
        else{
            var s = -now.getTimezoneOffset() * 60 + (launch.getTime() - now.getTime()) / 1000;
            var d = Math.floor(s / 86400);
            if (d == 1 || d == 21 || d == 31) days.html('<h1>' + d + '</h1><p>День', '</p>');
            else if ((d % 10) == 2 && (d != 12) || (d % 10) == 3 && (d != 13) || (d % 10) == 4 && (d != 14)) days.html('<h1>' + d + '</h1><p>Дня', '</p>');
            else days.html('<h1>' + d + '</h1><p>Дней', '</p>');
            s -= d * 86400;

            var h = Math.floor(s / 3600);
            var h1 = h - 6;
            switch (h1) {
                case -1:
                    h1 = 23;
                    break;
                case -2:
                    h1 = 22;
                    break;
                case -3:
                    h1 = 21;
                    break;
                case -4:
                    h1 = 20;
                    break;
                case -5:
                    h1 = 19;
                    break;
                case -6:
                    h1 = 18;
                    break;
            }
            if (h1 == 1 || h1 == 21 || h1 == 31) hours.html('<h1>' + h1 + '</h1><p>Час', '</p>');
            else if (h1 == 2 || h1 == 3 || h1 == 4 || h1 == 22 || h1 == 23 || h1 == 24) hours.html('<h1>' + h1 + '</h1><p>Часа', '</p>');
            else hours.html('<h1>' + h1 + '</h1><p>Часов', '</p>');
            s -= h * 3600;

            var m = Math.floor(s / 60);
            if (m == 1 || m == 21 || m == 31 || m == 41 || m == 51) minutes.html('<h1>' + m + '</h1><p>Минута', '</p>');
            else if (m == 2 || m == 3 || m == 4 || m == 22 || m == 23 || m == 24 || m == 34 || m == 32 || m == 33 || m == 42 || m == 43 || m == 44 || m == 52 || m == 53 || m == 54) minutes.html('<h1>' + m + '</h1><p>Минуты', '</p>');
            else minutes.html('<h1>' + m + '</h1><p>Минут', '</p>');

            s = Math.floor(s - m * 60);
            if (s == 1 || s == 21 || s == 31 || s == 41 || s == 51) seconds.html('<h1>' + s + '</h1><p>Секунда', '</p>');
            else if (s == 2 || s == 3 || s == 4 || s == 22 || s == 23 || s == 24 || s == 34 || s == 32 || s == 33 || s == 42 || s == 43 || s == 44 || s == 52 || s == 53 || s == 54) seconds.html('<h1>' + s + '</h1><p>Секунды', '</p>');
            else seconds.html('<h1>' + s + '</h1><p>Секунд', '</p>');
            setTimeout(setDate, 1000);

            message.html('<b> Специально для лорикека, который лох</b>');
        }
    }
})(jQuery);
/******************************************************************************************************************************
ANIMATIONS
*******************************************************************************************************************************/
(function($) {
    "use strict";
    var isMobile = false;
    if (navigator.userAgent.match(/Android/i) || 
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i)|| 
        navigator.userAgent.match(/iPod/i) || 
        navigator.userAgent.match(/BlackBerry/i)) {                 
        isMobile = true;            
    }
    if (isMobile == true) {
        $('body').removeClass('nomobile');
        $('.animated').removeClass('animated');
    }
    $(function() {
        if (isMobile == false) {
            $('*[data-animated]').addClass('animated');
        }
        function animated_contents() {
            $(".animated:appeared").each(function (i) {
                var $this    = $(this),
                    animated = $(this).data('animated');

                setTimeout(function () {
                    $this.addClass(animated);
                }, 50 * i);
            });
        }
        animated_contents();
        $(window).scroll(function () {
            animated_contents();
        });
    });
})(jQuery);
/******************************************************************************************************************************
SLIDER
*******************************************************************************************************************************/
(function($) {
    "use strict";
    $("body.nomobile #slider").revolution(
    {
            delay:9000,
            startheight:450,
            startwidth:890,

            thumbWidth:100,
            thumbHeight:50,
            thumbAmount:5,

            onHoverStop:"on",
            hideThumbs:200,
            navigationType:"bullet",
            navigationStyle:"round",
            navigationArrows:"none",

            touchenabled:"on",

            navOffsetHorizontal:0,
            navOffsetVertical:80,
            shadow:undefined,
            fullWidth:"on",
            fullScreen:"on"
    });
})(jQuery);
/******************************************************************************************************************************
BOOTSTRAP
*******************************************************************************************************************************/
(function($) {
    "use strict";
        $('[data-rel=tooltip]').tooltip();
        $(".alert").alert();
})(jQuery);
/******************************************************************************************************************************
PROGRESS BAR
*******************************************************************************************************************************/
(function($) {
    "use strict";
    $("a.btn-progress").click(function(){
        $('#bar-container').slideToggle(); 
    });
})(jQuery);
