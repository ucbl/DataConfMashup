$(document).bind("mobileinit", function () {
    console.log('mobileinit');
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
	$.mobile.defaultPageTransition = "slidefade";
});