/*
* ===============================================================
* Generating component - Account Favourites External - HTML code.
* ===============================================================
*/

function changeCode(ch_lang){
		var codeToPaste = '&lt;script type="text/javascript"&gt;'+'<br/>' +'&lt;!--' + '<br/>';
		if(ch_lang == 'pl'){
			codeToPaste = codeToPaste + 'var aextern_lang = "pl"; // language version - english and polish supported' + '<br/>';
			$("#ae_polish").css({'font-weight':'bold'});
			$("#ae_english").css({'font-weight':'normal'});
		}
		else{
			codeToPaste = codeToPaste + 'var aextern_lang = "en"; // language version - english and polish supported' + '<br/>';
			$("#ae_polish").css({'font-weight':'normal'});
			$("#ae_english").css({'font-weight':'bold'});
		}
		codeToPaste = codeToPaste + 'var aextern_homePageUrl = "'+ aextern_homePageUrl + '"; // prefix url ' + '<br/>' +
		'var aextern_homePageServletUrl = "' + aextern_homePageServletUrl + '"; // prefix url with servlet name ' + '<br/>' +
		'var aextern_login = "' + aextern_login + '";' + '<br/>' +
		'<span style="color:RED">var aextern_key = "' + aextern_key +'";</span>' + '<br/>' +
		'--&gt;' +  '<br/>' +
		'&lt;/script&gt;' +  '<br/>' +
		'&lt;script type="text/javascript" src="'+ aextern_homePageUrl +'/style/common/favourites-extern/aextern-popup-1.0.js"&gt;' + '<br/>' +
		'&lt;/script&gt;' + '<br/>' +
		'&lt;div class="aextern_hintInfo"&gt;' + '<br/>' +
			'&lt;img class="aextern_trigger" id="ae_trigger" src="' + aextern_homePageUrl + '/style/common/favourites-extern/images/aextern_trigger.png" /&gt;' + '<br/>' + 
			'&lt;iframe id="aextern_asynchronousPagedPart" scrolling="no" noresize="noresize" frameborder="0" border="0" class="aextern_mainContainer" allowtransparency="true"&gt;' +
			'&lt;/iframe&gt;' + '<br/>' +
		'&lt;/div&gt;';
		$("#aextern_codeToPaste").html(codeToPaste);
}	