    	function showPopup(homepageUrl, subPage, windowName) {
            pictureWindow = window.open(homepageUrl + subPage,windowName,'scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,height=500,width=470');
        	pictureWindow.focus();
    	}

        function showHelp(helpId, homepageUrl) {
	        showPopup(homepageUrl, "/"+mainServletName+"/help?id=" + helpId,"dlibra_help_window");
    	}

    	function showContact(homepageUrl) {
    		showPopup(homepageUrl, "/"+mainServletName+"/contact","dlibra_contact_window");
    	}

