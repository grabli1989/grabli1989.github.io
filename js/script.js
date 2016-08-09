(function(){

	$wrapper = $('#wrapper');
	$drawerTop = $('#drawer-top');

	///////////////////////////////
	// Set Home Slideshow Height
	///////////////////////////////

	function setHomeBannerHeight() {
		var windowHeight = jQuery(window).height();
		jQuery('#header').height(windowHeight);
	}

	///////////////////////////////
	// Center Home Slideshow Text
	///////////////////////////////

	function centerHomeBannerText() {
			var bannerText = jQuery('#header > .center');
			var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header > .center').actual('height')/2) - 40;
			bannerText.css('padding-top', bannerTextTop+'px');
			bannerText.show();
	}



	///////////////////////////////
	// SlideNav
	///////////////////////////////

	function setSlideNav(){
		jQuery(".toggleDrawer").click(function(e){
			//alert($wrapper.css('marginRight'));
			e.preventDefault();

			if($drawerTop.css('marginTop')=='-120px'){
				$drawerTop.animate({marginTop : 0},200);
        $wrapper.animate({marginTop : 120}, 200);
			}
			else{
				$drawerTop.animate({marginTop : -120},200);
        $wrapper.animate({marginTop : 0}, 200);
			}

		})
	}

	function setHeaderBackground() {
		var scrollTop = jQuery(window).scrollTop(); // our current vertical position from the top

		if (scrollTop > 300 || jQuery(window).width() < 700) {
			jQuery('#header .top').addClass('solid');
		} else {
			jQuery('#header .top').removeClass('solid');
		}
	}




	///////////////////////////////
	// Initialize
	///////////////////////////////

	jQuery.noConflict();
	setHomeBannerHeight();
	centerHomeBannerText();
	setSlideNav();
	setHeaderBackground();

	//Resize events
	jQuery(window).smartresize(function(){
		setHomeBannerHeight();
		centerHomeBannerText();
		setHeaderBackground();
	});


	//Set Down Arrow Button
	jQuery('#scrollToContent').click(function(e){
		e.preventDefault();
		jQuery.scrollTo("#portfolio", 1000, { offset:-(jQuery('#header .top').height()), axis:'y' });
	});

	jQuery('nav > ul > li > a').click(function(e){
		e.preventDefault();
		jQuery.scrollTo(jQuery(this).attr('href'), 400, { offset:-(jQuery('#header .top').height()), axis:'y' });
	})

	jQuery(window).scroll( function() {
	   setHeaderBackground();
	});

})();
