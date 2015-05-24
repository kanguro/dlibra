/*
* by Mariusz Stanislawczyk
* jQuery component pattern doesn not match pattern taken from java code
*/
var vDateFormat;
			
			function setupDateFormat(newDateFormat){
				
				vDateFormat = newDateFormat;
				
				if(vDateFormat.indexOf("yyyy") > -1){
					vDateFormat = vDateFormat.replace("yyyy","yy");
				}
				else if(vDateFormat.indexOf("yy") > -1){
					vDateFormat = vDateFormat.replace("yy","y");
				}
				vDateFormat = vDateFormat.toLowerCase();
				
			}