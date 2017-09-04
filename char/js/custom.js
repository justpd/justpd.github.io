/*
Author URI: http://webthemez.com/
Note: 
Licence under Creative Commons Attribution 3.0 
Do not remove the back-link in this web template 
-------------------------------------------------------*/

$(window).load(function() {
    jQuery('#all').click();
    return false;
});

$(document).ready(function() {
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