/*----------------------------------------------
	mooZoom v1.0


	mooZoom copyright: copyright (c) 2008 R'born development  - http://rborn.info

	mooZoom license: 

	You can use the script for personal or commercial projects, as long as this creditentials remains intact.
	You CANNOT sell the script or parts of its code under your brand.

 	Original code changed by dLibra TEAM for dLibra Software purposes.
 */

var mooZoom = new Class({
	options : {},
	initialize : function(options) {
		this.x_fact = options.x_fact || 1.2;
		this.steps = 0;
		this.initial_position = options.image.getCoordinates();
		this.image = options.image.clone().injectAfter(options.image);
		this.image_name = this.image.getProperty('src');
		options.image.setStyle('visibility', 'hidden');
		this.image.setStyles( {
			position : 'relative',
			left : 0,
			top : 0,
			margin : 0,
			'cursor' : 'move'
		});
		this.initial_size = options.image.getSize().size;
		var slideshow = $$('.slideshow')[0];
		var initPosLeft;
		var initPosTop;
		if(navigator.appName == "Microsoft Internet Explorer" && !(navigator.userAgent.indexOf("Trident/5")>-1)){
			initPosLeft = '0';
			initPosTop = '0';
		} else {
			initPosLeft = this.initial_position.left;
			initPosTop = this.initial_position.top;
		}
		this.container = new Element('div').setStyles({
			'-webkit-box-shadow':'0px 0px 10px #666',
			'-moz-box-shadow':'0px 0px 10px #666',
			'box-shadow':'0px 0px 10px #666',
			'background-color' : '#fff',
			width : this.initial_size.x,
			height : this.initial_size.y,
			overflow : 'hidden',
			position : 'absolute',
			left : initPosLeft,
			top : initPosTop
		}).injectInside(slideshow).adopt(this.image);
		this.limiter = new Element('div').setStyles( {
			width : this.initial_size.x,
			height : this.initial_size.y
		}).injectBefore(this.image).adopt(this.image);

		this.container.addEvent('mousemove', function(ev) {
			var ev = new Event(ev);
			this.mouse_x = ev.client.x + window.getScrollLeft();
			this.mouse_y = ev.client.y + window.getScrollTop();

		}.bind(this));

		this.image.makeDraggable( {
			snap : 0,
			wait : true,
			container : this.limiter
		});

		this.busy = false;
		if (imgClicked) {
			this
					.zoom_option(calculateFit(this.initial_size.x,
							this.initial_size.y, currentImageWidth,
							currentImageHeight));
			imgClicked = false;
		} else{
			this.zoom_option(lastZoomChoice);
		}
	},

	removeItem : function(elem) {
		var childs = elem.childNodes;
		for ( var i = 0; i < childs.length; i++) {
			this.removeItem(childs[i]);
		}
		if (elem.parentNode != null)
			elem.parentNode.removeChild(elem);
	},

	disposeImage : function() {
		this.removeItem(this.container);
	},

	/* 
	 * Zoom function 
	 */
	zoom_option : function(percentage) {
		// Fit option
	lastZoomChoice = percentage;
	var z_width = parseInt(currentImageWidth * (percentage / 100));
	var z_height = parseInt(currentImageHeight * (percentage / 100));
	this.image.setStyles( {
		width : z_width,
		height : z_height
	});
	var i_width = this.initial_size.x;
	var i_height = this.initial_size.y;
	var setWidth;
	var setHeight;
	var marginLeft;
	var marginTop;
	var in_bound = 0;
	// Standard options
	if (z_width > i_width) {
		this.image.setStyles( {
			'cursor' : 'move'
		});
		setWidth = parseInt(2 * z_width - i_width);
		marginLeft = -(z_width - i_width);
	} else {
		in_bound++;
		setWidth = z_width;
		marginLeft = parseInt((i_width / 2) - (z_width / 2));
	}
	if (z_height > i_height) {
		this.image.setStyles( {
			'cursor' : 'move'
		});
		setHeight = parseInt(2 * z_height - i_height);
		marginTop = -(z_height - i_height);
	} else {
		in_bound++;
		setHeight = z_height;
		marginTop = parseInt((i_height / 2) - (z_height / 2));
	}
	if (in_bound == 2)
		this.image.setStyles( {
			'cursor' : 'default'
		});

	this.limiter.setStyles( {
		width : setWidth,
		height : setHeight,
		'margin-left' : marginLeft,
		'margin-top' : marginTop
	});

	this.image.setStyles( {
		'top' : 0,
		'left' : 0
	});

}

});

// Current moozoom component instance - each is created for different image of a
// gallery.
var currentMooZoomItem;
// Percents of last zoom
var lastZoomChoice;
// Used after choosing another image from gallery
var imgClicked = true;

var currentImageWidth;
var currentImageHeight;

/*
 * Calling zoom_option function of a moozoom component. perc : percents
 * parameter
 */
function zoom_option(perc) {

	if (typeof currentMooZoomItem != 'undefined') {
		if (perc == -1) {
			perc = calculateFit(currentMooZoomItem.initial_size.x,
					currentMooZoomItem.initial_size.y, currentImageWidth,
					currentImageHeight);
		}
		refreshSlider(perc);
		currentMooZoomItem.zoom_option(perc);
	}
}

/* 
 Calculating percents of fit option : how many percents
 are needed to fit an image into a container. 
 initX,initY : container size parameters
 currentWidth, currentHeight : to fit object size
 */
function calculateFit(initX, initY, currentWidth, currentHeight) {
	var l_cont;
	var l_img;
	var perc;
	var perc2;
	l_img = currentWidth;
	l_cont = initX;
	perc = ((l_cont * 100) / l_img);
	perc = parseFloat(perc.toFixed(1));
	l_img = currentHeight;
	l_cont = initY;
	perc2 = ((l_cont * 100) / l_img);
	perc2 = parseFloat(perc2.toFixed(1));
	if (perc < perc2)
		return perc;
	else
		return perc2;
}

/*
 * Function is a response to creation of an image 
 * inside cooperative plugin - galleriffic 
 */
function imageBuildedCallback() {
	var item = $$('.moozoom')[0];
	currentMooZoomItem = new mooZoom( {
		image : item
	});
	loadImageDescription(item);
	refreshSlider();

}
