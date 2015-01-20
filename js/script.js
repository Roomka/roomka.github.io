(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
	
	
	// Toggle with hitting of ESC
	$(document).keyup(function(e) {
    if ((e.keyCode == 27) && classie.has( overlay, 'open' )) {
        toggleOverlay();
				$("#trigger-overlay").show();
				$("#mainMenu").removeClass("open");
        // $('body').removeClass('show-nav');
    }
});
	$("#closeMenu li a").click(function() {
		$("#trigger-overlay").show();
		$("#mainMenu").removeClass("open");
	});
	$("#trigger-overlay").click(function() {
		$("#trigger-overlay").hide();
	});
	$(".overlay-close").click(function() {
		$("#trigger-overlay").show();
		$("#mainMenu").removeClass("open");
	});
})();