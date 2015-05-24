/*
* by Mariusz Stanislawczyk
*/
$().ready(function() {
	
	if(userLanguage == "en"){
		userLanguage = "";
	}
	
	$.datepicker.setDefaults($.datepicker.regional['']);
	
	$("#dateBtn").datepicker($.extend({}, 
						$.datepicker.regional[userLanguage], { 
						dateFormat: vDateFormat
    }));
	
	
});
