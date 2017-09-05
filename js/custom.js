
$(window).load(function() {
    jQuery('#all').click();
    return false;
});

var window_h = $( window ).height();
var window_h1 = window_h - 3;

$('.hero_section').height(window_h1);
$('.hero_wrapper').height(window_h1);

$( window ).resize(function() {

      var window_h = $( window ).height();
    var window_h1 = window_h - 3;
    var window_p1 = window_h1/2;

    $('.hero_section').height(window_h1);
    $('.hero_wrapper').height(window_h1);


});

$(document).ready(function() {

    setTimeout( function() {
    $('.pl__r').addClass('loaded_pl__r');
    } , 2500);

    setTimeout( function() {
    $('.body').addClass('visible_body_pre');
    } , 2500);

    setTimeout( function() {
    $('.pl__l').addClass('loaded_pl__l');
    } , 2500);

    setTimeout( function() {
    $('#round').addClass('loaded_round');
      // new WOW().init();
    } , 1500);

    setTimeout( function() {
    $('#round').removeClass('round');
    $('.pl').addClass('pl_loaded');
    showMenu();
    } , 3500);


        particlesJS.load('particles', 'js/particles.json', function() {
      console.log('callback - particles.js config loaded');
      });



    $('#header_wrapper').scrollToFixed();
    $('.res-nav_click').click(function() {
        $('.main-nav').slideToggle();
        return false

    });

    function resizeText() {
        var preferredWidth = 767;
        var displayWidth = window.innerWidth;
        var percentage = displayWidth / preferredWidth;
        var fontsizetitle = 25;
        var newFontSizeTitle = Math.floor(fontsizetitle * percentage);
        $(".divclass").css("font-size", newFontSizeTitle)
    }
    if ($('#main-nav ul li:first-child').hasClass('active')) {
        $('#main-nav').css('background', 'none');
    }
    $('#mainNav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 950,
        scrollThreshold: 0.2,
        filter: '',
        easing: 'swing',
        begin: function() {
        },
        end: function() {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }

        },
        scrollChange: function($currentListItem) {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }
        }
    });

    var container = $('#portfolio_wrapper');


    container.isotope({
        animationEngine: 'best-available',
        animationOptions: {
            duration: 200,
            queue: false
        },
        layoutMode: 'fitRows'
    });

    $('#filters a').click(function() {
        $('#filters a').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        container.isotope({
            filter: selector
        });
        setProjects();
        return false;
    });

    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;


        if (winWidth > 1440) {
            columnNumb = 4;
        } else if (winWidth > 956) {
            columnNumb = 3;
        } else if (winWidth > 640) {
            columnNumb = 2;
        }

        return columnNumb;
    }

    function setColumns() {
        var winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);

        container.find('.portfolio-item').each(function() {
            $(this).css({
                width: postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
        container.isotope('reLayout');
    }

    container.imagesLoaded(function() {
        setColumns();
    });


    $(window).bind('resize', function() {
        setProjects();
    });

   $(".fancybox").fancybox();
});

wow = new WOW({
    animateClass: 'animated',
    offset: 100
});
wow.init();
document.getElementById('').onclick = function() {
    var section = document.createElement('section');
    section.className = 'wow fadeInDown';
    section.className = 'wow shake';
    section.className = 'wow zoomIn';
    section.className = 'wow lightSpeedIn';
    this.parentNode.insertBefore(section, this);
};

function openCharPage1(){
    location = 'char/1.html';
}
function openCharPage2(){
    location = 'char/2.html';
}
function openCharPage3(){
    location = 'char/3.html';
}
function openCharPage4(){
    location = 'char/4.html';
}
function openCharPage5(){
    location = 'char/5.html';
}

function locateBack(){

    setTimeout( function() {
    $('.pl').removeClass('pl_loaded');
    $('.pl__r').addClass('full_red');
    $('.pl__l').addClass('full_red');
    $('#round').removeClass('loaded_round');
    $('#round').removeClass('round');
    } , 200);

    setTimeout( function() {
    $('.pl__r').removeClass('loaded_pl__r');
    } , 300);
    setTimeout( function() {
    $('.pl__l').removeClass('loaded_pl__l');
    } , 300);

    setTimeout("location='#Portfolio';", 2500 );

    setTimeout( function() {
    $('.pl__r').addClass('loaded_pl__r');
    } , 2500);

    setTimeout( function() {
    $('.body').addClass('visible_body_pre');
    } , 2500);

    setTimeout( function() {
    $('.pl__l').addClass('loaded_pl__l');
    } , 2500);

    setTimeout( function() {
    $('.pl').addClass('pl_loaded');
    showMenu();
    } , 3500);

}
