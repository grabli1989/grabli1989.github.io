var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-fixed-top' ),
		didScroll = false,
		changeHeaderOn = 120;
		toggletime = 150;
		scrolltoup = 900;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 150 );
				setTimeout( showButtonScrollToUp, 150 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
						$(header).slideUp(toggletime);
						$('.toggleshortcut').animate({"top" : "0"}, toggletime);
						$('#drawer-top').css("display" , "none");
    			}
		else {
						$(header).slideDown(toggletime);
						$('#wrapper').animate({marginTop : 120}, toggletime);
						$('.toggleshortcut').animate({"top" : "120"}, toggletime);
						$('#drawer-top').css("display" , "block");
					}
		didScroll = false;
	}

	function showButtonScrollToUp() {
		var sy = scrollY();
		if ( sy >= scrolltoup ) {
			$('.scrolltoup').fadeIn(600);
    }	else {
			$('.scrolltoup').fadeOut(600);
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
					$('#drawer-top').css("display" , "block");
					if ( sy == 0 ) {
						$('#wrapper').animate({marginTop : 120 }, toggletime);
					}
				}	else {
						$('.toggleshortcut').animate({"top" : "0"}, toggletime);
						$('#drawer-top').css("display" , "none");
						if ( sy == 0 ) {
							$('#wrapper').animate({marginTop : -120 }, toggletime);
						}
				}

			});
		}

		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}

		///////////////////////////////
		// Initialize
		///////////////////////////////

		setSlideNav();
		init();

})();
