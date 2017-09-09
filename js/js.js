$(document).ready(function() {

    particlesJS.load('particles', 'js/particles.json', function() { 
      console.log('callback - particles.js config loaded');
      });


    setTimeout( function() {
    showMenu();
    } , 3000);

    setTimeout( function() {
    $('.pl__r').addClass('loaded_pl__r');
    } , 2500);
    setTimeout( function() {
    $('.pl__l').addClass('loaded_pl__l');
    } , 2500);

    setTimeout( function() {
    $('#round').addClass('loaded_round');
      new WOW().init();
    } , 1500);

    setTimeout( function() {
    $('#round').removeClass('loaded_round');
    $('#round').removeClass('round');
    $('.pl').addClass('pl_loaded');
    } , 4000);

    $('#fullpage').fullpage({
        anchors:['main', 'page2', 'page3', 'page4', 'page5'],
        menu: '#siteMenu',
        showActiveTooltip: true,
        autoScrolling: true,
        slidesNavigation: false,
        controlArrows: true
    });

});

document.onkeydown = function checkKeycode(event)
{
var keycode;
if(!event) var event = window.event;
if (event.keyCode) keycode = event.keyCode; // IE
else if(event.which) keycode = event.which; // all browsers

if(keycode == 13){
        alert(location.hash);
}

}

function showMenu(){
    $('#showMenu').addClass('showMenu');
    $('#showMenu').removeClass('hideMenu');
    $('.hideBlock').addClass('z-index-up');
    $('.p1_name').addClass('white_p1');
    $('#blur').addClass('blur');

    setTimeout( function() {
    $('.menu-icon').addClass('novisible_pre');
    } , 100);

    setTimeout( function() {
        $('.hidenPhoto').addClass('visiblePhoto');
    } , 500);


}
function hideMenu(){
    setTimeout( function() {
    $('#showMenu').removeClass('showMenu');
    $('#showMenu').addClass('hideMenu');
    $('.hideBlock').removeClass('z-index-up');
    $('.p1_name').removeClass('white_p1');
    $('#blur').removeClass('blur');
        } , 0);
     setTimeout( function() {
    $('.menu-icon').removeClass('novisible_pre');
    } , 100);

    setTimeout( function() {
        $('.hidenPhoto').removeClass('visiblePhoto');
    } , 0);
}

function locate(loc){
    location='#' + loc;
    setTimeout( function() {
        hideMenu();
    } , 1000);
}
