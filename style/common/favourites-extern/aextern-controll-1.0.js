/* ======================================================
 * Account Favourites External component controll script.
 * ======================================================
 */

/**
 * By default sets long publications titles to specified length
 * and sets component default language.
 */
$(document).ready(function(){
		var links = $(".aextern_favLink");
		if(links){
			for(var i = 0 ; i < links.length; i++){
				var pub_name = links[i].innerHTML;
				if(pub_name.length > 20){
					pub_name = pub_name.substring(0,17);
					links[i].innerHTML = pub_name + "...";
				}
			}
		}
		aextern_setLabels();
	});

function aextern_switchLanguage(){
		if(aextern_lang == 'pl'){
			aextern_lang = 'en';
			aextern_setLabels();
		}
		else{
			aextern_lang = 'pl';
			aextern_setLabels();
		}
}	
	
function aextern_setLabels(){
		var err_msg = "";
		var err_msg_cont = $("#aextern_errorMessageType")[0];
		if(typeof err_msg_cont != 'undefined'){
			err_msg = err_msg_cont.innerHTML;
		}
		if(aextern_lang == 'pl'){
			$("#aextern_langSwitcher").attr({title : 'Zmień język'});
			$("#aextern_previousPageImg").attr({ title : 'Pierwsza strona'});
			$("#aextern_nextPageImg").attr({title : 'Ostatnia strona'});
			$("#aextern_logo").attr({title: 'Logo biblioteki'});
			$("#aextern_title").html('Ulubione publikacje');
			$("#aextern_langImg").attr({src : aextern_homePageUrl+'/style/common/favourites-extern/images/pl.gif'});
			var err_msg_cont = $("#aextern_errorMessage");
			if(err_msg == "componentUnavailable"){
				$("#aextern_errorMessage")[0].innerHTML = "Dostęp do listy został zamknięty!";
			}
			else if(err_msg == "exceptionThrowed"){
				$("#aextern_errorMessage")[0].innerHTML = "Wystąpił błąd przy próbie połączenia!";
			}
		}
		else{
			$("#aextern_langSwitcher").attr({title : 'Change language'});
			$("#aextern_previousPageImg").attr({ title : 'First page'});
			$("#aextern_nextPageImg").attr({title : 'Last page'});
			$("#aextern_logo").attr({title: 'Library logo'});
			$("#aextern_title").html('Favourite publications');
			$("#aextern_langImg").attr({src : aextern_homePageUrl+'/style/common/favourites-extern/images/en.gif'});
			if(err_msg == "componentUnavailable"){
				$("#aextern_errorMessage")[0].innerHTML = "Connection to list is closed!";
			}
			else if(err_msg == "exceptionThrowed"){
				$("#aextern_errorMessage")[0].innerHTML = "Error occured!";
			}
		}
	}	
	
var aextern_url = "";
	
function aextern_changePage(pageNr){
	if(aextern_url == ""){
		aextern_url = this.location;
		aextern_url = aextern_url + "";
		aextern_url = aextern_url.replace(/[&]lang[=]\w{2}/g,"");
		aextern_url = aextern_url.replace(/pageNr[=]\d*/g,"pageNr=");
	}
	this.location = aextern_url+pageNr+"&lang="+aextern_lang;
}