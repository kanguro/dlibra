JQ = jQuery.noConflict(true);

// Miniatures per page
var MIN_NUM = 5;

var NO_ELEMENTS = 0; 

// Images data map
var imagesData;
/*
 * Image data object - contains data parsed from output XML. imageSrc - source
 * of an image imageMinSrc - source of image miniature imageHint - short title
 * showed as title in popup and hint in miniature imageDescription - full
 * description of an image
 */
function ImageDataElement(imgSrc, imgMinSrc, hint, description) {
	this.imageSrc = imgSrc;
	this.imageMinSrc = imgMinSrc;
	this.imageHint = hint;
	this.imageDescription = description;
}
// Defines an element of miniature buffer
function IdImage(image, id) {
	this.image = image;
	this.id = id;
}

/* Dialog box definition */
var DescriptionDialog = {
		
		initialized : false,
		
		isOpen : false,
		
		startWidth : 100,
		
		startHeight : 100,
		
		destWidth : 300,
		
		destHeight : 300,
		
		startLeft : 0,
		
		startTop : 0,
		
		destTop : 0,
		
		destLeft : 0,
		
		mouseOn : false,
		
		draggable :  true,
		
		content : '', /* selector */
		
		getGuts : undefined,
		
		prevX : null,
		
		prevY : null,
		
		init : function(content) {
			
			if(this.initialized){
				return;
			}
			
			var descImg = document.getElementById("desc-img");
			var realPos = PageUtils.findRealPosition(descImg);
			var docWidth = PageUtils.documentWidth();
			var docHeight = PageUtils.documentHeight();
			
			this.startLeft = realPos[0] - 100;
			this.startTop = realPos[1] + 20;
			this.destLeft = docWidth/2 - this.destWidth/2;
			this.destTop = docHeight/2 - this.destHeight/2;
			
			this.content = content;
			
			if(this.draggable){
				JQ(this.content).draggable({containment : "#mainViewerContainer", cancel: "#ddMetadata"});
			}
			
			if(jQuery.isFunction(this.setGuts)){
				this.setGuts();
			}
			
			this.initialized = true;
			
		},
		
		open : function() {
			
			if(jQuery.isFunction(this.preOpen)){
				this.preOpen();
			}
			
			if(this.isOpen){
				return;
			}
			
			this.minMax(this.startWidth,this.startHeight,this.destWidth,this.destHeight,
					this.startTop,this.startLeft,this.destTop,this.destLeft, false, this.postOpen);
			
			this.isOpen = true;
			
		},
		
		minMax : function(startWidth, startHeight, destWidth, destHeight, startTop, startLeft, destTop, destLeft, hide, callback){
			
			var widthInc = destWidth - startWidth;
			var heightInc = destHeight - startHeight;
			var leftInc;
			var leftSign = "-";
			var topInc;
			var topSign = "+";
			
			if(startLeft - destLeft > 0){
				leftInc = startLeft - destLeft;
				leftSign = "-";
			}else{
				leftInc = destLeft - startLeft;
				leftSign = "+";
			}
			if(destTop - startTop > 0){
				topInc = destTop - startTop;
				topSign = "+";
			}else{
				topInc = startTop - destTop;
				topSign = "-";
			}
			
			JQ(this.content).css({
				'width' : startWidth + 'px',
				'height' : startHeight + 'px',
				'left' : startLeft,
				'top' : startTop,
				'z-index' : '300000'
			}).animate({
				'left' : leftSign+'='+leftInc+'px',
				'top' : topSign+'='+topInc+'px',
				'width' : '+='+widthInc+'px',
				'height' : '+='+heightInc+'px'
			},'slow', callback);
			
			if(hide){
				JQ(this.content).fadeOut('fast');
			}
		},
		
		preClose : undefined,
		
		preOpen : undefined,
		
		postClose : undefined,
		
		postOpen : undefined,
		
		close : function() {
			if(this.isOpen){
				
				if(typeof this.preClose == "function"){
					this.preClose();
				}
				
				var startWidth = this.destWidth;
				var startHeight = this.destHeight;
				var destWidth = this.startWidth;
				var destHeight = this.startHeight;
				
				var descImg = document.getElementById("desc-img");
				var realPos = PageUtils.findRealPosition(descImg);
				
				var startTop = parseInt(JQ(this.content).css('top'));
				var startLeft = parseInt(JQ(this.content).css('left'));
				var destTop = realPos[1] + 20;
				var destLeft = realPos[0] - 100;
				
				this.minMax(startWidth, startHeight, destWidth, destHeight, startTop, startLeft, destTop, destLeft, true);
				this.isOpen = false;
				
				if(jQuery.isFunction(this.postClose)){
					this.postClose();
				}
				
			}
		}
		
};

// miniatures buffer of current miniatures page
var minBuffer;

// Changing miniature pages
function selectMiniatures(option, ind) {
	if(ind)
	{
		if(ind < lastPage || ind > 1){
			currPage = ind;
			document.getElementById("miniaturePages").options[currPage - 1].selected = true;
			generateMiniatures(currPage);
		}
	}
	else
	{
		if (option == 'next') {
			if (currPage < lastPage) {
				currPage++;
				document.getElementById("miniaturePages").options[currPage - 1].selected = true;
				generateMiniatures(currPage);
				imgClicked = true;
				galleryAdv.goto(0);
				// mark this as event with image click - used in moozoom.js
				
			}
		} else {
			if (currPage > 1) {
				currPage--;
				document.getElementById("miniaturePages").options[currPage - 1].selected = true;
				generateMiniatures(currPage);
				imgClicked = true;
				galleryAdv.goto(0);
				// mark this as event with image click - used in moozoom.js 
				
			}
		}
	}
}

// Current miniature page
var currPage;
var lastPage;
// Contains number of elements of last page - (could be less than MIN_NUM)
var lastPageElements;
// References
var thumbList;
var thumbAdv;
var thumbListContainer;
/*
 * Function generates miniatures for each page and fits them to container
 * boundaries.
 */
function generateMiniatures(page) {
	minBuffer = new Array(MIN_NUM);
	currPage = page;
	var firstEl = ((page - 1) * MIN_NUM);
	var last;
	if (page == lastPage)
		last = lastPageElements;
	else
		last = MIN_NUM;
	thumbList.empty();
	for ( var i = firstEl; i < (firstEl + last); i++) {
		var imgDat = imagesData[i];
		var img = new Image();
		img.src = imgDat.imageMinSrc;
		var idImg = new IdImage();
		idImg.image = img;
		idImg.id = 'min' + i;
		minBuffer[i] = idImg;
		minHtml = '<a class="thumb" href="' + imgDat.imageSrc + '" title="'
				+ imgDat.imageHint + '" style="visibility:hidden;">'
				+ '<img id="min' + i + '" src="' + imgDat.imageMinSrc
				+ '" title="' + imgDat.imageHint + '"></img></a>';
		var addStyle = "";
		if(i == firstEl){
			addStyle = 'class="selected"';
		}
		thumbList.append('<li ' + addStyle + ' >' + minHtml + '<div id="caption"></div></li>');
		if (img.complete) {
			onMiniatureLoadEvent(img);
		} else {
			JQ(img).load( function() {
				onMiniatureLoadEvent(this);
			});
		}
	}
	if (galleryAdv != null)
		galleryAdv.initializeThumbs();
}

/* Executed when miniature image is loaded - fits image to specified area */
function onMiniatureLoadEvent(img) {
	var contWidth = thumbListContainer.width();
	var contHeight = thumbListContainer.height();
	var perc = calculateFit(contWidth, (contHeight / 6), img.width, img.height);
	for ( var j = 0; j < minBuffer.length; j++) {
		if (typeof minBuffer[j] != 'undefined') {
			if (minBuffer[j].image == img) {
				var minDOM = JQ("#" + minBuffer[j].id);
				minDOM.parent().css({
					'visibility' : 'visible'
				});
				minDOM.css({
					'width' : '99%'
				});
			}
		}
	}
}

/* Function generates miniature pages in form of select list */
function generateMiniaturePages(hmwElements) {
	var selector = JQ("#miniaturePages");
	if (hmwElements <= MIN_NUM) {
		selector.append('<option value="1">1 - ' + hmwElements + '</option>');
		lastPage = 1;
		lastPageElements = hmwElements;
		return;
	}
	var c = parseInt(hmwElements / MIN_NUM);
	var last = hmwElements - (c * MIN_NUM);
	for ( var i = 0; i < c; i++) {
		j = (i * MIN_NUM);
		selector.append('<option value="' + (i + 1) + '">' + (j + 1) + ' - '
				+ (j + MIN_NUM) + '</option>');
	}
	lastPage = c;
	if (last > 0) {
		j = (i * MIN_NUM);
		lastPageElements = last;
		lastPage++;
		selector.append('<option value="' + (i + 1) + '">' + (j + 1) + ' - '
				+ (j + last) + '</option>');
	} else {
		lastPageElements = MIN_NUM;
	}
	JQ("#ofNumber").html(" " + ofLabel + " " + NO_ELEMENTS);
}

/* Reading from AJAX call : presentation XML data parsing, 
   preload operations and main variables init */
JQ().ready(function(){
					thumbList = JQ("#thumb_list");
					thumbAdv = JQ("#thumbs-adv");
					thumbListContainer = JQ("#thumb_list_container");
					var body = document.getElementsByTagName("body")[0];
					JQ(body).css( {
						'background-color' : '#eee'
					});
					if(mimeType != 'text/xml'){
						thumbList = JQ("#thumb_list");
						thumbAdv = JQ("#thumbs-adv");
						thumbListContainer = JQ("#thumb_list_container");
						var body = document.getElementsByTagName("body")[0];
						JQ(body).css( {
							'background-color' : '#eee'
						});
						imagesData = new Array(1);
						var minSrc = contentUrl;
						var imgSrc = contentUrl;
						imagesData[0] = new ImageDataElement(imgSrc, minSrc, "", "");
						generateMiniaturePages(1);
						generateMiniatures(1);
						initGalleriffic(1);
						initializeDescriptionDialog();
						// Changing miniatures page event
						JQ("#page-options").hide();
						JQ("#thumbs-adv").hide();
						JQ(".content").css({'width':'98%'});
						JQ("#zoom-options-select").bind("change",function(){
							var percValue = parseInt(
								JQ("select[name=zoom-options-select] option:selected").val()
							);
							if(percValue != 0){
								zoom_option(percValue);
							}
						});
					}else{
						JQ.ajax({
								type : "POST",
								url : contentUrl,
								dataType : "xml",
								data : '',
								success : function(data) {
									var body = data;
									var presentationElements = data
											.getElementsByTagName("presentation-elements")[0];
									presentationElements = presentationElements
											.getElementsByTagName("presentation-element");
									var regEx = /(PresentationData[.]xml[?]handler[=]jpg_js)/g;
									var contentPrefix = contentUrl.replace(
											regEx, "");
									var firstFound = 0;
									var hwmElem = presentationElements.length;
									imagesData = new Array(hwmElem);
									for ( var i = 0; i < hwmElem; i++) {
										var current = presentationElements[i];
										var position = parseInt(current
												.getAttribute("position"));
										var prTxt = "";
										if (current
												.getElementsByTagName("element-text")[0] != null) {
											prTxt = current
													.getElementsByTagName("element-text")[0].childNodes[0].nodeValue;
										}
										var hint = "";
										if (current
												.getElementsByTagName("element-hint")[0] != null) {
											hint = current
													.getElementsByTagName("element-hint")[0].childNodes[0].nodeValue;
										}
										var minSrc = contentPrefix
												+ "i2j:jpg_thumbnail/"
												+ current
														.getElementsByTagName("full-image")[0].childNodes[0].nodeValue;
										var imgSrc = contentPrefix
												+ current
														.getElementsByTagName("full-image")[0].childNodes[0].nodeValue;
										imagesData[position] = new ImageDataElement(
												imgSrc, minSrc, hint, prTxt);
										var minHtml;
									}
									NO_ELEMENTS = hwmElem;
									generateMiniaturePages(hwmElem);
									if(lastPage < 2){
										JQ("#page-options").hide();
									}
									generateMiniatures(1);
									if(hwmElem == 1){
										JQ("#thumbs-adv").hide();
										JQ(".content").css({'width':'98%'});
									}
									
									// Initialization of galleriffic component
									initGalleriffic(hwmElem);
									initializeDescriptionDialog();
									
									// Changing miniatures page event
									JQ("#zoom-options-select").bind("change",function(){
										var percValue = parseInt(
											JQ("select[name=zoom-options-select] option:selected").val()
										);
										if(percValue != 0){
											zoom_option(percValue);
										}
									});
									JQ("#miniaturePages")
											.change(
													function() {
														var page = parseInt(JQ(
																"select[name=minSelect] option:selected")
																.val());
														generateMiniatures(page);
														imgClicked = true;
														galleryAdv.goto(0);
													});
									}
							});
					}

				});

function initializeDescriptionDialog(){
	// set content method of description dialog
	// and initialize it
	DescriptionDialog.setGuts = function(){
		var resultHtml = "<ul id='descDialogOptions'><li><span id='ddPictureDescOption' class='ddOpt ddOptUns'>"
			+ imageDescriptionLabel+"</span><span id='ddMetadataOption' class='ddOpt ddOptSel'>"
			+ objectDescription+"</span></li></ul>";
		resultHtml += "<div id='ddMetadata' class='ddDataContainer'>"+loadingMetadata+"</div>";
		resultHtml += "<div class='ddDataContainer' id='ddPictureDescription' style='display:none;'></div>";
		JQ(DescriptionDialog.content).append(resultHtml);
		JQ(".ddOpt").hover(function(){
			if(!JQ(this).hasClass('ddOptSel'))
			{
				JQ(this).css({'opacity':'0.7'},'slow');
			}
		},function(){
			if(!JQ(this).hasClass('ddOptSel'))
			{
				JQ(this).css({'opacity':'0.5'},'slow');
			}
		});
		JQ("#ddMetadataOption").click(function(){
			JQ(".ddOptSel").removeClass("ddOptSel").css({'opacity':'0.5'});
			JQ(this).addClass("ddOptSel").css({'opacity':'1.0'});
			JQ("#ddPictureDescription").hide();
			JQ("#ddMetadata").show();
		});
		JQ("#ddPictureDescOption").click(function(){
			JQ(".ddOptSel").removeClass("ddOptSel").css({'opacity':'0.5'});
			JQ(this).addClass("ddOptSel").css({'opacity':'1.0'});
			JQ("#ddMetadata").hide();
			JQ("#ddPictureDescription").show();
		});
		var dataCallback = function(editionsData){
			var editionData = editionsData[0];
			var attr;
			var attrsHtml = '';
			if(typeof editionData.attributes != 'undefined' && editionData.attributes.length > 0){
				for(var i = 0 ; i < editionData.attributes.length; i++){
					attr = editionData.attributes[i];
					attrsHtml+="<p><b>"+attr.name+"</b>: "+attr.values+"</p>";
				}
			}
			if(attrsHtml != ''){
				JQ("#ddMetadata").empty();
				JQ("#ddMetadata").append(attrsHtml);
			}else{
				JQ("#ddMetadata").empty();
				JQ("#ddMetadata").append(noDescription);
			}
		};
		// method definition in jquery-tooltip-dlibra-xxx.js
		getEditionInformations(editionId, "applet", dataCallback);
	};
	
	DescriptionDialog.preClose = function(){
		JQ("#ddMetadata").hide();
		JQ("#ddPictureDescription").hide();
		JQ("#descDialogOptions").hide();
	};
	
	DescriptionDialog.postOpen = function(){
		JQ("#ddMetadataOption").show();
		JQ("#descDialogOptions").show();
		var descOpt = JQ("#ddPictureDescOption");
		if(!(descOpt.hasClass('ddUnseen') || descOpt.hasClass('ddOptUns'))){
			descOpt.show().addClass('ddOptSel').css({'opacity':'1.0'});
			JQ("#ddPictureDescription").show();
			JQ("#ddMetadata").hide();
			JQ("#ddMetadataOption").addClass('ddOptUns').css({'opacity':'0.5'});
		} else {
			JQ("#ddMetadata").show();
			JQ("#ddMetadataOption").addClass('ddOptSel');
			JQ("#ddPictureDescription").hide();
		}
	};
	DescriptionDialog.init("#descriptionBox");
}

/* Changing description when different image was choosen */
function loadImageDescription(img) {
	var anyDesc = false;
	for ( var i = 0; i < imagesData.length; i++) {
		if (img.src == imagesData[i].imageSrc) {
			var hint = imagesData[i].imageHint;
			var description = imagesData[i].imageDescription;
			var cont = JQ("#ddPictureDescription");
			cont.empty();
			if(hint != ""){
				anyDesc = true;
				cont.append("<p class='ddObjectHintP'>" + hint + "</p>");
			}
			if(description != ""){
				anyDesc = true;
				cont.append("<p class='ddObjectDescriptionP'>" + description + "</p>");
			}
			break;
		}
	}
	if(!anyDesc){
		JQ("#ddPictureDescOption").addClass('ddUnseen').addClass('ddOptUns').hide();
		JQ("#ddPictureDescription").hide();
		JQ("#ddMetadata").show();
		JQ("#ddMetadataOption").removeClass('ddOptUns').addClass('ddOptSel').css({'opacity':'1.0'});
	}else{
		JQ("#ddPictureDescription").show();
		JQ("#ddPictureDescOption").removeClass('ddUnseen').removeClass('ddOptUns').addClass('ddOptSel').show().css({'opacity':'1.0'});
		JQ("#ddMetadataOption").removeClass('ddOptSel').addClass('ddOptUns').css({'opacity':'0.5'});
		JQ("#ddMetadata").hide();
	}
}


// Initially set opacity on thumbs and add
// additional styling for hover effect on thumbs
var onMouseOutOpacity = 0.67;
JQ('#thumbs-adv ul.thumbs').css('opacity', onMouseOutOpacity).hover(
		function() {
			JQ(this).is('.selected').fadeTo('fast', 1.0);
		}, function() {
			JQ(this).not('.selected').fadeTo('fast', onMouseOutOpacity);
		});

var galleryAdv;

function initGalleriffic(hwmElements) {
	// Initialize Advanced Galleriffic Gallery
	galleryAdv = JQ('#gallery-adv').galleriffic(
			'#thumbs-adv',
			{
				dLSettings : {
					minNum : MIN_NUM,
					lPage : function(){
						return lastPage;
					},
					cPage : function(){
						return currPage;
					},
					lastPageElements : lastPageElements,
					minNextPage : function(){
						selectMiniatures('next');
					},
					minPrevPage : function(){
						selectMiniatures('previous');
					},
					selectPage : function(index){
						selectMiniatures('',index);
					}
				},
				delay : 2000,
				numThumbs : (hwmElements == 1 ? 0 : MIN_NUM),
				preloadAhead : 10,
				enableTopPager : false,
				enableBottomPager : false,
				imageContainerSel : '#slideshow-adv',
				controlsContainerSel : '#controls-adv',
				captionContainerSel : '#caption-adv',
				loadingContainerSel : '#loading-adv',
				renderSSControls : false,
				renderNavControls : (hwmElements == 1 ? false : true),
				descriptionLinkText : descriptionLabel,
				playLinkText : 'Play Slideshow',
				pauseLinkText : 'Pause Slideshow',
				prevLinkText : previousImageLabel,
				nextLinkText : nextImageLabel,
				nextPageLinkText : 'Next &rsaquo;',
				prevPageLinkText : '&lsaquo; Prev',
				enableHistory : false,
				autoStart : false,
				onChange : function(prevIndex, nextIndex) {
					JQ('#thumbs-adv ul.thumbs').children().eq(prevIndex)
							.fadeTo('fast', onMouseOutOpacity).end().eq(
									nextIndex).fadeTo('fast', 1.0);
				},
				onTransitionOut : function(callback) {
					JQ('#slideshow-adv, #caption-adv')
							.fadeOut('fast', callback);
				},
				onTransitionIn : function() {
					JQ('#slideshow-adv, #caption-adv').fadeIn('fast');
				},
				onPageTransitionOut : function(callback) {
					JQ('#thumbs-adv ul.thumbs').fadeOut('fast', callback);
				},
				onPageTransitionIn : function() {
					JQ('#thumbs-adv ul.thumbs').fadeIn('fast');
				}
			});
}
// reference to slider component
var jQUISlider;
// reference to dialog itself
var jQDescDialog;
// reference to dialog title element
var jQDescDialogTitle;
// div contains description of currently selected image
var jQDescDiv;
// slider handling part
var jQSliderHandle;
// td - with zooming options
var jQZoomingOptions;
// td - with slider
var jQZoomingSlider;
var jQControls;
var jQThumbsPagesContainer;

function openDescriptionDialog() {
	DescriptionDialog.open();
}

function closeDescriptionDialog() {
	DescriptionDialog.close();
}

/* Initialize dialog, window resize event, slider component */
JQ( function() {

	JQ(".ui-widget-header").css( {
		'background' : 'none',
		'border' : 'none'
	});
	JQ(".ui-dialog-titlebar").css( {
		'padding' : '0.3em 0.1em 0.1em 1em'
	});

	jQUISlider = JQ("#percent-slider").slider( {
		range : "min",
		value : 100,
		min : 1,
		max : 200,
		step : 1,
		slide : function(event, ui) {
			zoom_option(ui.value);
			if(JQ("#dynamicZoomOption").length == 0){
				JQ("#zoom-options-select").append('<option id="dynamicZoomOption"></option>');
			}
			JQ("#dynamicZoomOption").attr('selected','selected').html(ui.value + "%");
		}
	});
	// disabled until image is loaded
	disableSlider();

	jQSliderHandle = JQ(".ui-slider-handle");
	jQZoomingOptions = JQ(".zooming-options");
	jQZoomingSlider = JQ(".zooming-slider");
	jQControls = JQ(".controls");
	jQThumbsPagesContainer = JQ(".thumbs_pages_container");

	JQ(window).resize( function() {
		generateMiniatures(currPage);
		if (galleryAdv != null)
			galleryAdv.refresh();
		documentResolutionSetup();
	});
	// ${homepageUrl}
	documentResolutionSetup();
	if (JQ.browser.msie) {
		var t = setTimeout("refreshMiniaturePages()", 1000);
	}
});

function refreshMiniaturePages() {
	JQ("#hFlat").css( {
		'background-color' : '#000',
		'visibility' : 'visible',
		'filter' : 'alpha(opacity = 0)'
	});
	JQ("#hFlat").css( {
		'visibility' : 'hidden'
	});
}

/* Changes styles of selected components to fit current document resolution */
function documentResolutionSetup() {
	var docWidth = document.width ? document.width
			: document.documentElement.offsetWidth - 25;
	var docHeight = document.height ? document.height
			: document.documentElement.offsetHeight;
	if (docWidth < 1024 && docHeight < 768) {
		jQUISlider.css( {
			'height' : '0.7em'
		});
		jQSliderHandle.css( {
			'height' : '0.9em',
			'width' : '0.9em',
			'margin-top' : '0.2em'
		});
		jQZoomingOptions.css( {
			'width' : '70%',
			'font-size' : '70%'
		});
		jQZoomingSlider.css( {
			'width' : '30%'
		});
		thumbAdv.css( {
			'font-size' : '60%'
		});
		jQControls.css( {
			'font-size' : '60%'
		});
	} else {
		jQUISlider.css( {
			'height' : '0.8em'
		});
		jQSliderHandle.css( {
			'height' : '1.2em',
			'width' : '1.2em',
			'margin-top' : '0.0em'
		});
		jQZoomingOptions.css( {
			'width' : '50%',
			'font-size' : 'smaller'
		});
		jQZoomingSlider.css( {
			'width' : '50%'
		});
		thumbAdv.css( {
			'font-size' : 'smaller'
		});
		jQControls.css( {
			'font-size' : '80%'
		});
		JQ("#prev-photo").attr( {
			src : pathToHandler + '/img/prev-min.png'
		});
		JQ("#next-photo").attr( {
			src : pathToHandler + '/img/next-min.png'
		});
		JQ("#desc-img").attr( {
			src : pathToHandler + '/img/desc-img.png'
		});
	}
}

function disableSlider() {
	jQUISlider.slider('disable');
}

function enableSlider() {
	jQUISlider.slider('enable');
}

/* refreshing label and slider i.e. after choosing zoom from defined zoom values */
function refreshSlider(perc) {
	if (perc) {
		jQUISlider.slider('value', perc);
	} else {
		jQUISlider.slider('value', lastZoomChoice);
	}
}
