/*
 * ===============================================================
 * Main script mainly responsible for generating components - Account Favourites External - popup.
 * Has to be inserted with HTML code of component. 
 * ===============================================================
 */

var aextern_doc = this.document;
var aextern_head = aextern_doc.getElementsByTagName('head')[0];

var aextern_cssUrl = aextern_homePageUrl + '/style/common/favourites-extern/';

var aextern_css = aextern_doc.createElement('link');
aextern_css.setAttribute('rel', 'stylesheet');
aextern_css.setAttribute('type', 'text/css');
aextern_css.setAttribute('id', 'aextern_css');
aextern_css.setAttribute('href',
		aextern_cssUrl + 'dlibra-favourites-extern.css');

var aextern_css_ie = aextern_doc.createElement('link');
aextern_css_ie.setAttribute('rel', 'stylesheet');
aextern_css_ie.setAttribute('type', 'text/css');
aextern_css_ie.setAttribute('id', 'aextern_css');
aextern_css_ie.setAttribute('href',
		aextern_cssUrl + 'dlibra-favourites-extern-ie.css');

if (typeof jQuery == 'undefined') {
	var aextern_jquerylib = aextern_doc.createElement('script');
	aextern_jquerylib.src = aextern_homePageUrl + '/style/common/js/jquery-1.3.2.js';
	aextern_jquerylib.type = 'text/javascript';
	aextern_head.appendChild(aextern_jquerylib);
	aextern_jquerylib.onload = ae_proceed;
} else {
	ae_proceed();
}

function ae_proceed(){
	ae_init();
	ae_popup();
}

function ae_init(){
$(document).ready( function() {
	if (jQuery.browser.msie) {
		aextern_head.appendChild(aextern_css_ie);
		var triggerImgSrc = $(".aextern_trigger").attr('src');
		var reg = /png$/;
		triggerImgSrc = triggerImgSrc.replace(reg, "gif");
		$(".aextern_trigger").attr( {
			src : triggerImgSrc
		});
	} else {
		aextern_head.appendChild(aextern_css);
	}
	aextern_firstRequest();
});
}

function aextern_firstRequest() {
	var querystring = 'login=' + aextern_login + '&key=' + aextern_key
			+ '&pageNr=1' + '&lang=' + aextern_lang;
	$('#aextern_asynchronousPagedPart').attr(
			'src',
			aextern_homePageServletUrl + '/account-faves-external?'
					+ querystring);
}

function ae_popup(){
$().ready(function() {
	$('.aextern_hintInfo').each( function() {
		// options
			if (jQuery.browser.msie) {
				var distance = 10;
			} else {
				var distance = 15;
			}
			var time = 250;
			var hideDelay = 500;

			var hideDelayTimer = null;

			// tracker
			var beingShown = false;
			var shown = false;

			var trigger = $('.aextern_trigger', this);
			var popup = $('.aextern_mainContainer', this).css('opacity', 0);

			// set the mouseover and mouseout on both element
			$( [ trigger.get(0), popup.get(0) ]).mouseover( function() {

				// stops the hide event if we move from the trigger to the popup element
					if (hideDelayTimer)
						clearTimeout(hideDelayTimer);

					// don't trigger the animation again if we're being shown,
					// or already visible
					if (beingShown || shown) {
						return;
					} else {
						beingShown = true;
						var pos = findRealPosition(document.getElementById("ae_trigger"));
						var rposX = pos[0] - $(window).scrollLeft();
						var rposY = pos[1] - $(window).scrollTop();
						var Xbound = $(window).scrollLeft() + $(window).width();
						var Ybound = $(window).scrollTop() + $(window).height();
						var tLeft = parseInt(popup.offset().width);
						var tTop = parseInt(popup.offset().height);
						if(rposX - 150 < 0){
							tLeft = 0;
						}
						else{
							tLeft = -125;
						}
						if(rposY - 150 < 0){
							tTop = 0;
						}
						else{
							tTop = -180;
						}
						popup.css({
							top : tTop,
							left : tLeft,
							display : 'block' // brings the popup back in to
												// view
						})
						// (we're using chaining on the popup) now animate it's
						// opacity and position
								.animate( {
									top : '-=' + distance + 'px',
									opacity : 1
								}, time, 'swing', function() {
									// once the animation is complete, set the tracker variables
										beingShown = false;
										shown = true;
									});
					}
				}).mouseout( function() {
				// reset the timer if we get fired again - avoids double animations
					if (hideDelayTimer)
						clearTimeout(hideDelayTimer);

					// store the timer so that it can be cleared in the
					// mouseover if required
					hideDelayTimer = setTimeout( function() {
						hideDelayTimer = null;
						popup.animate( {
							top : '-=' + distance + 'px',
							opacity : 0
						}, time, 'swing', function() {
							// once the animate is complete, set the tracker variables
								shown = false;
								// hide the popup entirely after the effect
								// (opacity alone doesn't do the job)
								popup.css('display', 'none');
							});
					}, hideDelay);
				});
		});
}); 
}

function findRealPosition(obj){
	var curLeft = curTop = 0;
	if(obj.offsetParent){
		do{
			curLeft += obj.offsetLeft;
			curTop += obj.offsetTop;
		} while(obj = obj.offsetParent);
		return [curLeft,curTop];
	}
}

