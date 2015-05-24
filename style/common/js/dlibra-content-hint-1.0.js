
function HintViewComponent(editionId){
	
	this.sframe = "<img id='lbulb' src='"
			+ homePageUrl
			+ "style/common/img/icons/lightbulb_b.png' style='position:fixed;right:5px;bottom:5px;z-index:3000;width:42px;height:42px;' />";
	
	this.infoFrame = "<iframe id='view_info_frame' scrolling='no' src='"
			+ homePageServletUrl
			+ "/viewhint?id="
			+ editionId
			+ "' style='display:none;position:fixed;bottom:5px;right:5px;background:#ffefb7;border:1px solid #ffce00;z-index:3999' width='300' height='60'></iframe>";
	
	this.refreshComponent = function(body){
		$(body).children("#lbulb").remove();
		$(body).children("#view_info_frame").remove();
		$(body).append(this.sframe);
		$(body).append(this.infoFrame);
	}
	
}

function dch_hideHint(){
	var body = parent.document.getElementsByTagName("body")[0];
	$(body).children("#lbulb").remove();
	$(body).children("#view_info_frame").remove();
}

/**
 * Dock content handling list hint in front of content popup.
 * 
 * @param homePageUrl
 * @param editionId
 * @return
 */
function dch_showHint(homePageUrl, editionId) {
	var hvC = new HintViewComponent(editionId);
	var sframe = hvC.sframe;
	var infoFrame = hvC.infoFrame;
	var body = parent.document.getElementsByTagName("body")[0];
	hvC.refreshComponent(body);
	$(body).children("#lbulb").bind("click", function(){
		$(this).css({
			'width' : '42px',
			'height' : '42px'
		});
		$(body).children("#view_info_frame").css({
			'display' : ''
		});
	});
}


/**
 * Shows list of handlers in content popup - it is important to change id of iframe
 * if necessary.
 * 
 * @param url
 * @return
 */
function hvc_showList(url) {
	var iframe = parent.document.getElementById("nyroModalIframe");
	iframe.src = url;
}

/**
  * HintViewComponent initial method 
  * @return
  */
function hintViewComponentInit(url) {
	var body = parent.document.getElementsByTagName("body")[0];
	$(body).children("#lbulb").bind("click", function() {
		$(body).children("#view_info_frame").css({
			'display' : ''
		});
	});
	$("#hvc_more").click( function() {
		hvc_showList(url);
	});
	$("#hvc_close").click( function() {
		$(body).children("#view_info_frame").css( {
			'display' : 'none'
		});
	});
}
