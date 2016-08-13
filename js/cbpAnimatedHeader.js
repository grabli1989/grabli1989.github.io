/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-fixed-top' ),
		didScroll = false,
		changeHeaderOn = 300;
		toggletime = 150;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 150 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
						$(header).slideUp(toggletime);
						$('.toggleshortcut').animate({"top" : "0"}, toggletime);
						// $('.toggleshortcut').css("position" , "absolute");
    			}
		else {
						$(header).slideDown(toggletime);
						$('#wrapper').animate({marginTop : 120}, toggletime);
						$('.toggleshortcut').animate({"top" : "120"}, toggletime);
						// $('.toggleshortcut').css("position" , "fixed");
					}
		didScroll = false;
	}

		wrapper = $('#wrapper');
		drawerTop = $('.navbar-fixed-top');

		///////////////////////////////
		// SlideNav
		///////////////////////////////

		function setSlideNav(){
			$(".toggleDrawer").click(function(e){
				e.preventDefault();
				display = $(drawerTop).css('display');

				$('.navbar-fixed-top').slideToggle(toggletime);

				var sy = scrollY();
				if(display == 'none'){
					$('.toggleshortcut').animate({"top" : "120"}, toggletime);
					// $('.toggleshortcut').css("position" , "absolute");
					if ( sy == 0 ) {
						$('#wrapper').animate({marginTop : 120 }, toggletime);
					}
				}	else {
						$('.toggleshortcut').animate({"top" : "0"}, toggletime);
						// $('.toggleshortcut').css("position" , "fixed");
						if ( sy == 0 ) {
							$('#wrapper').animate({marginTop : -120 }, toggletime);
							// $('#drawerTop').animate({marginTop : -120 }, toggletime);
						}
				}

			});
		}

		// function setHeaderBackground() {
		// 	var scrollTop = $(window).scrollTop(); // our current vertical position from the top
		//
		// 	if (scrollTop > 500) {
		// 		$(drawerTop).fadeOut();
		// 	}
		// }

		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}

		///////////////////////////////
		// Initialize
		///////////////////////////////

		setSlideNav();
		init();
		//setHeaderBackground()


})();
