/**
 * Detecting AcrobatReader app.
 * 
 * @param callbackHandler - implements callback methods of success and failure
 * @return
 */
function detectAcrobatReader(callbackHandler){
	
	var acrobat=new Object();
	acrobat.installed=false;
	acrobat.version='0.0';
 
if (navigator.plugins && navigator.plugins.length){
  for ( var x = 0, l = navigator.plugins.length; x < l; ++x ) {
    if (navigator.plugins[x].description.indexOf('Adobe Acrobat') != -1 || navigator.plugins[x].description.indexOf('PDF') != -1) {
      acrobat.version=(navigator.plugins[x].description.indexOf('PDF')!=-1)?'7+':parseFloat(navigator.plugins[x].description.split('Version ')[1]);
      if (acrobat.version.toString().length == 1) acrobat.version+='.0';
      acrobat.installed=true;
      break;
    }
  }
}
else if (window.ActiveXObject) {
  for (x=2; x<10; x++) {
    try {
      oAcro=eval("new ActiveXObject('PDF.PdfCtrl."+x+"');");
      if (oAcro) {
        acrobat.installed=true;
        acrobat.version=x+'.0'; 
      }
    }
    catch(e) {}
  }
  try {
    oAcro4=new ActiveXObject('PDF.PdfCtrl.1');
    if (oAcro4) {
      acrobat.installed=true;
      acrobat.version='4.0';
    }
  }
  catch(e) {}
  try {
    oAcro7=new ActiveXObject('AcroPDF.PDF.1');
    if (oAcro7) {
      acrobat.installed=true;
      acrobat.version='7+';
    }
  }
  catch(e) {}
 }
 
 if(acrobat.installed == true){
	 callbackHandler.testCorrectHandler();
 }
 else {
	 callbackHandler.testFailureHandler();
 }
} 