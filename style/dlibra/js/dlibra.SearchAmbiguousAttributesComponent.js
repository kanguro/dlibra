/**
 * javascript methods for component SearchAmbiguousAttributesComponent
 */
var SearchAmbiguousAttributesComponent = {
	
	pageId : "results",
	
	waitWarn : "",
	
	homePageUrl : "",
	
	foundAnyTokens : false,
	
    /*
     * mark all label with bold font
     */		
	markAllLabel : function(mark) {
		if (mark === true) {
			$("#tokenSelAll").css('font-weight', 'bold');
		} else {
			$("#tokenSelAll").css('font-weight', '');
		}
	},
	
	/*
	 * mark none label with bold font
	 */
	markNoneLabel : function(mark) {
		if (mark === true) {
			$("#tokenSelNone").css('font-weight', 'bold');
		} else {
			$("#tokenSelNone").css('font-weight', '');
		}
	},
	
	/*
	 * select none or all
	 */
	selectionMade : function(selMade) {
		var skip = false;
		if (selMade == 'all') {
			$("#tokenValuesList input[type = 'checkbox']")
					.attr('checked', true);
			this.markAllLabel(true);
			this.markNoneLabel(false);
			$(".amb_cb_unchecked").hide();
			$(".amb_cb_checked").show();
		} else if (selMade == 'none') {
			if($("#tokenValuesList input[type = 'checkbox']:checked").length > 0){
				$("#tokenValuesList input[type = 'checkbox']").attr('checked',
					false);
				$(".amb_cb_unchecked").show();
				$(".amb_cb_checked").hide();
				this.markAllLabel(false);
				this.markNoneLabel(true);
			}else{
				skip = true;
			}
		}
		if(!skip){
			this.doPrepareForm();
		}
	},
	
	/*
	 * select boxes for specified attribute
	 */
	selectForAttribute : function(attributeId) {
		this.markAllLabel(false);
		this.markNoneLabel(false);
		$("#SAAC_values_" + attributeId + " input[type = 'checkbox']").attr(
				"checked", true);
		$("#SAAC_values_" + attributeId + " .amb_cb_checked").show();
		$("#SAAC_values_" + attributeId + " .amb_cb_unchecked").hide();
		this.doPrepareForm();
	},

	/*
	 * select boxes related to specified token
	 */
	selectRelatedTokens : function(token) {
		this.markAllLabel(false);
		this.markNoneLabel(false);
		$(".amb_token").each(function(){
			var name = $(this).attr("name");
			if (name.indexOf("_" + token + "_") != -1) {
				$(this).attr("checked", true);
			}
		});
		$(".amb_token_cb").each(function(){
			var ids = $(this).attr("id");
			if (ids.indexOf("_" + token + "_") != -1) {
				$("#"+ids+" .amb_cb_checked").show();
				$("#"+ids+" .amb_cb_unchecked").hide();
			}
		});
		this.doPrepareForm();
	},
	
	/*
	 * select single item
	 */
	selectToken : function(tokenId){
		var selection;
		this.markAllLabel(false);
		this.markNoneLabel(false);
		selection = $("input[name ='"+tokenId+"']");
		if(selection.attr("checked") === true){
			selection.attr("checked",false);
			$("#"+tokenId+" .amb_cb_checked").hide();
			$("#"+tokenId+" .amb_cb_unchecked").show();
		}else{
			selection.attr("checked",true);
			$("#"+tokenId+" .amb_cb_checked").show();
			$("#"+tokenId+" .amb_cb_unchecked").hide();
		}
		this.doPrepareForm();
	},
	
	/*
	 * show only those root attributes which contains any tokens
	 */
	expandList : function() {
		$(".SAAC_value").each( function() {
			$(this).parent().parent().css({
				'display' : ''
			});
		});
	},
    
	/*
	 * Erases the multiple occurrences of a attributes group(in the advanced search case)
	 */
	eraseMultiple : function() {
		var searched = $(".amb_token").get();
		var distinct = $.unique(searched);
		for(var i = 0; i < distinct.length; i++){
			var sclass = $(distinct[i]).attr("name");
			var sel = $("input[name='"+sclass+"']").get();
			if(sel.length > 1){
				for(var j = 1 ; j < sel.length ; j++){
					$(sel[j]).parent().remove();
				}
			}
		}
	},
	
	hideEmpty : function(){
		if(this.foundAnyTokens != true){
			$("#saac_mark").parents(".left_box").hide().prev().hide();
		}
	},
	
	showWaitWarn : function(){
		var warning =  getAjaxWarning(this.waitWarn, this.homePageUrl);
		jQuery.blockUI(warning);
	},
	
	doPrepareForm : function(){
		setTimeout("SearchAmbiguousAttributesComponent.showWaitWarn()",500);
		if(this.pageId == "results"){
			this.prepareForm(true);
		}else if(this.pageId == "aresults"){
			this.prepareAdvForm();
		}
	},
	
	/*
	 * Prepare form for advanced search results version
	 */
	prepareAdvForm : function(){
		// if CollectionsComponent is defined apply selected collections
		if(CollectionsComponent.initialized == true){
			document.amb_smallsearch.mdirids.value = CollectionsComponent.selectedDirs;
		}
		document.amb_smallsearch.rootid.value = SearchResultsComponent.rootid;
		document.amb_smallsearch.submit();
	},
	
	/*
	 * prepare form and call submit of SimpleSearchComponent 
	 */
	prepareForm : function(invokePrepareForm) {
		$(".amb_token").each( function() {
			var name = $(this).attr('name');
			var idn = name;
			name = name.substring(3);
			name = 'null' + name;
			if($(this).attr("checked") == true){
				 if($("#" + idn + " img.amb_cb_checked").is(":hidden")){
					$("input[id='" + name + "']").attr("value", "");
				}else{
					$("input[id='" + name + "']").attr("value", name);
				}
				
			}
		});
		if (invokePrepareForm === true) {
			// invoke prepareForm() from SimpleSearchComponent.vm
			prepareForm();
		}
		return false;
	}
};