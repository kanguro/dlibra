var installedPlugins = {
    'java': navigator.javaEnabled()
};

(function(){
    var plugins = {
        '3dmlw': {
            'mimeType': ['text/3dmlw'],
            'ActiveX': ['3dmlw.IEPlugin']
        },
        'djvu': {
            'mimeType': ['image/vnd.djvu', 'image/x.djvu', 'image/x-djvu'],
            'ActiveX': ['DjVuControl.DjVuCtl']
        },
        'flash': {
            'mimeType': ['application/x-shockwave-flash'],
            'ActiveX': ['ShockwaveFlash.ShockwaveFlash', 'ShockwaveFlash.ShockwaveFlash.3', 'ShockwaveFlash.ShockwaveFlash.4', 'ShockwaveFlash.ShockwaveFlash.5', 'ShockwaveFlash.ShockwaveFlash.6', 'ShockwaveFlash.ShockwaveFlash.7']
        },
        'google-talk': {
            'mimeType': ['application/googletalk'],
            'ActiveX': ['GoogleTalk.Plugin', 'GoogleTalk.Plugin.1']
        },
        'pdf': {
            'mimeType': ['application/pdf'],
            'ActiveX': ['acroPDF.PDF', 'acroPDF.PDF.1', 'PDF.PdfCtrl.1', 'PDF.PdfCtrl.4', 'PDF.PdfCtrl.5', 'PDF.PdfCtrl.6']
        },
        'quicktime': {
            'mimeType': ['video/quicktime'],
            'ActiveX': ['QuickTime.QuickTime', 'QuickTimeCheckObject.QuickTimeCheck.1', 'QuickTime.QuickTime.4']
        },
        'real-player': {
            'mimeType': ['audio/vnd.rn-realaudio', 'video/vnd.rn-realvideo', 'application/vnd.rn-realmedia', 'audio/x-pn-realaudio-plugin'],
            'ActiveX': ['RealPlayer', 'rmocx.RealPlayer G2 Control.1']
        },
        'svg-viewer': {
            'mimeType': ['image/svg-xml'],
            'ActiveX': ['Adobe.SVGCtl']
        },
        'shockwave-director': {
            'mimeType': ['application/x-director'],
            'ActiveX': ['SWCtl.SWCtl', 'SWCt1.SWCt1.7', 'SWCt1.SWCt1.8', 'SWCt1.SWCt1.9', 'ShockwaveFlash.ShockwaveFlash.1']
        },
        'silverlight': {
            'mimeType': ['application/x-silverlight', 'application/x-silverlight-2'],
            'ActiveX': ['AgControl.AgControl']
        },
        'skype': {
            'mimeType': ['application/x-skype'],
            'ActiveX': ['Skype.Detection']
        },
        'vlc': {
            'mimeType': ['application/x-google-vlc-plugin', 'application/x-vlc-plugin'],
            'ActiveX': ['VideoLAN.VLCPlugin', 'VideoLAN.VLCPlugin.1', 'VideoLAN.VLCPlugin.2']
        },
        'windows-media-player': {
            'mimeType': ['application/x-mplayer2'],
            'ActiveX': ['WMPlayer.OCX', 'MediaPlayer.MediaPlayer.1']
        },
        'xara': {
            'mimeType': ['application/vnd.xara', 'application/x-CorelXARA'],
            'ActiveX': ['XaraRender.XaraDocument', 'XaraRender.XaraDocument.1']
        }
    };
    
    //check support for a plugin
    function checkSupport(p){
        var support = false;
        
        //for standard compliant browsers
        if (navigator.mimeTypes) {
            for (var i = 0; i < p['mimeType'].length; i++) {
                if (navigator.mimeTypes[p['mimeType'][i]] && navigator.mimeTypes[p['mimeType'][i]].enabledPlugin) {
                    support = true;
                }
            }
        }
        
        //for IE
        if (typeof ActiveXObject != 'undefined') {
            for (var i = 0; i < p['ActiveX'].length; i++) {
                try {
                    new ActiveXObject(p['ActiveX'][i]);
                    support = true;
                } 
                catch (err) {
                }
            }
        }
        
        return support;
    }
    
    //we loop through all the plugins
    for (plugin in plugins) {
        //if we find one that's installed...
        if (checkSupport(plugins[plugin])) {
            //we add a property that matches that plugin's name to our "installedPlugins" object and set it's value to "true"
            installedPlugins[plugin] = true;
        }
        else {
            installedPlugins[plugin] = false;
        }
    }
})();