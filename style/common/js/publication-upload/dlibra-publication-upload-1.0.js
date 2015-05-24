$( function() {
	$("#puc_help_lightbulb").attr("src",
			homePageUrl + "/style/common/img/icons/lightbulb.png");
	$('.puc_helpIcon')
			.tooltip(
					{
						track : false,
						delay : 0,
						showURL : false,
						opacity : 1.0,
						bodyHandler : function() {
							var id = $(this).attr("id");
							id = id.substring(0, id.length - 1);
							return "<div style='background:#fbffd5;border:1px solid #ddd;padding:5px;width:250px;font-size:0.9em;'>"
									+ $("#" + id).html() + "</div>";
						},
						fade : 250
					});
});

var puc_selClass;
var puc_lastChId = "";
var puc_lastSelClass;

$().ready( function() {

	$("#puc_filesTable tr").mouseover( function() {
		if ($(this).attr('id') != puc_lastChId) {
			puc_selClass = $(this).attr('class');
			$(this).attr('class', 'umc_tr_selected');
		}
	});

	$("#puc_filesTable tr").mouseout( function() {
		if ($(this).attr('id') != puc_lastChId)
			$(this).attr('class', puc_selClass);
	});

	$("#puc_filesTable tr").click( function() {
		if (puc_lastChId != "") {
			$("#" + puc_lastChId + "").attr('class', puc_lastSelClass);
		}
		puc_lastSelClass = puc_selClass;
		puc_lastChId = $(this).attr('id');
		$(this).attr('class', 'umc_tr_chosen');
		var index = puc_lastChId.replace("umc_tr_", "");
	});
});

/**
 * Main file selector
 * 
 * @param index
 *            of selected main file
 * @return
 */
function puc_checkMainFile(index) {
	var i = parseInt(index);
	var li = $("#puc_hMainFile").attr("value");
	var lastOneImg = $("#puc_selMainFileImg_" + li);
	if (lastOneImg != null) {
		lastOneImg.css( {
			"visibility" : "hidden"
		});
	}
	$("#puc_hMainFile").attr( {
		"value" : index
	});
	$("#puc_selMainFile_" + index).empty();
	$("#puc_selMainFile_" + index).append(
			"<img id='puc_selMainFileImg_" + index + "' src='" + homePageUrl
					+ "/style/common/img/icons/fine_sm.png' />");
}

function puc_performUpload(form){
	if(form.fileToConvert.value!=''){
		form.submit();
	}else{
		alert(noFileDialog);
	}
	
	
}

function puc_cancelUpload(form) {
	form.action = urlPrefix
			+ "?action=PublicationFilesUploadAction&skipUpload=true";
	form.submit();
}



/**
 * Finalization action
 * 
 * @param form
 * @return
 */
function puc_savePublication(form) {
	 
	 form.action = urlPrefix
				+ "?action=PublicationFilesUploadFinalizationAction";
	 form.submit();
}

/**
 * Clear upload action
 * 
 * @param form
 * @return
 */
function puc_cancelPublication(form) {

	if (confirm(cancelConfirmDialog)) {
		form.action = urlPrefix + "?action=PublicationFilesUploadCleanupAction";
		form.submit();
	}

}

/**
 * Add empty attribute value
 * 
 * @param form
 * @param attributeName
 * @param lang
 * @return
 */
function puc_addAttributeValue(form, attributeName, lang) {
	form.action = urlPrefix
			+ "?action=PublicationUploadAddAttributeAction&attrName="
			+ attributeName + "&lang=" + lang;
	form.submit();

}

/**
 * Delete selected attribute value
 * 
 * @param form
 * @param attributeName
 * @param lang
 * @param index
 * @return
 */
function puc_deleteAttributeValue(form, attributeName, lang, index) {
	var i = parseInt(index);
	i = i - 1;
	form.action = urlPrefix
			+ "?action=PublicationUploadRemoveAttributeAction&attrName="
			+ attributeName + "&lang=" + lang + "&vindex=" + i;
	form.submit();
}

/**
 * Not accept regulations
 * 
 * @param form
 * @return
 */
function puc_notAcceptRegulations(form){
	form.action = urlPrefix
		+ "?action=RegulationsNotAcceptAction";
	form.submit();
}

/**
 * Accept regulations
 * 
 * @param form
 * @param rememberAnswer
 * @return
 */
function puc_acceptRegulations(form, regulationsAccepted){
	form.action = urlPrefix
		+ "?action=RegulationsAcceptAction";
	form.submit();
}

/**
 * Set attribute value for attribute type "date".
 * 
 * @param date
 *            string representing date
 * @param counter
 * @param language
 * @param attributeName
 * @param separator
 * @return
 */
function puc_setDate(date, counter, language, attributeName, separator) {
	var name = '_' + counter + '_' + language + '_' + attributeName;
	$("input[name=" + name + "]").val(date);
	if (date != null && date != "") {
		var dateArray = date.split(separator);
		if (dateArray.length > 0) {
			$("#"+name + "_year").val(dateArray[0]);
			if (dateArray.length > 1) {
				$("#" + name + "_month").val(dateArray[1]);
				puc_generateDayComboBox(name);
				if (dateArray.length > 2) {
					$("#" + name + "_day").val(dateArray[2]);
				}
			}
		}
	}
}

/**
 * Returns number of days for given month and year.
 * 
 * @param month
 * @param year
 * @return number of days
 */
function puc_getDays(month, year) 
{
	if (month == null || month == '' || year == null || year == ''){
		return 31;
	}
	var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	// Test for leap year when February is selected.
	if (2 == month)
		return ((0 == year % 4) && (0 != (year % 100))) ||
			(0 == year % 400) ? 29 : 28;
	else
		return daysInMonth[month-1];
}

/**
 * Generates list of days for chosen month & year.
 * 
 * @param name of 
 * @return
 */
function puc_generateDayComboBox(name){
	var month = $("#"+name+"_month").val();
	var year = $("#"+name+"_year").val();
	var dayComboBox = $("#"+name+"_day");
	var day = dayComboBox.val();
	// clear Day ComboBox elements
	dayComboBox.children(':gt(0)').remove();
	// add new elements to Day ComboBox 
	var days = puc_getDays(month, year);
	for (var i=1;i<=days;i++){
		var option = document.createElement("option");
		option.value = i;
		// if IE then set innerText property
		if ( typeof(option.innerText) != 'undefined' ) {
			option.innerText = i;
		} else {
			option.text = i;
		}
		dayComboBox.append(option);
	}
	dayComboBox.val(day);
}

/**
 * Change attribute value for attribute type "date".
 * 
 * @param counter
 * @param language
 * @param attributeName
 * @param separator
 * @return
 */
function puc_changeDate(counter, language, attributeName, separator) {
	var name = '_' + counter + '_' + language + '_' + attributeName;
	var day = $("#"+name+"_day").val();
	var month = $("#"+name+"_month").val();
	var year = $("#"+name+"_year").val();
	puc_generateDayComboBox(name);
	var date = year + ((year != "") ?((month != "") ? (separator+month+((day != "") ? (separator+day):"" )) : ""):"");
	$("input[name='"+name+"']").val(date);
}	






