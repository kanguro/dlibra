// I18N constants

// LANG: "pl", ENCODING: UTF-8 | ISO-8859-1
// Author: Mihai Bazon, http://dynarch.com/mishoo

// FOR TRANSLATORS:
//
//   1. PLEASE PUT YOUR CONTACT INFO IN THE ABOVE LINE
//      (at least a valid email address)
//
//   2. PLEASE TRY TO USE UTF-8 FOR ENCODING;
//      (if this is not possible, please include a comment
//       that states what encoding is necessary.)

HTMLArea.I18N = {

	// the following should be the filename without .js extension
	// it will be used for automatically load plugin language.
	lang: "pl",

	tooltips: {
		bold:           "Pogrubienie",
		italic:         "Kursywa",
		underline:      "Podkreslenie",
		strikethrough:  "Przekreslenie",
		subscript:      "Subscript",
		superscript:    "Superscript",
		justifyleft:    "Akapit z lewej",
		justifycenter:  "Akapit wysrodkowany",
		justifyright:   "Akapit z prawej",
		justifyfull:    "Akapit wyjustowany",
		orderedlist:    "Lista numerowana",
		unorderedlist:  "Lista wypunktowana",
		outdent:        "Zmniejsz wciecie",
		indent:         "Zwieksz wciecie",
		forecolor:      "Font Color",
		hilitecolor:    "Background Color",
		horizontalrule: "Horizontal Rule",
		createlink:     "Wstaw lacze",
		insertimage:    "Wstaw obrazek",
		inserttable:    "Insert Table",
		htmlmode:       "Przelacz widok zrodlo/WYSIWYG",
		popupeditor:    "Enlarge Editor",
		about:          "About this editor",
		showhelp:       "Help using editor",
		textindicator:  "Current style",
		undo:           "Cofnij",
		redo:           "Ponow",
		cut:            "Wytnij zaznaczenie",
		copy:           "Skopiuj zaznaczenie",
		paste:          "Wklej ze schowka",
		lefttoright:    "Direction left to right",
		righttoleft:    "Direction right to left"
	},

	buttons: {
		"ok":           "OK",
		"cancel":       "Anuluj"
	},

	msg: {
		"Path":         "Sciezka",
		"TEXT_MODE":    "Jestes w trybie edycji zrodla.  Uzyj [<>] aby wrocic do trybu WYSIWYG.",

		"IE-sucks-full-screen" :
		// translate here
		"The full screen mode is known to cause problems with Internet Explorer, " +
		"due to browser bugs that we weren't able to workaround.  You might experience garbage " +
		"display, lack of editor functions and/or random browser crashes.  If your system is Windows 9x " +
		"it's very likely that you'll get a 'General Protection Fault' and need to reboot.\n\n" +
		"You have been warned.  Please press OK if you still want to try the full screen editor."
	},

	dialogs: {
		"Cancel"                                            : "Anuluj",
		"Insert/Modify Link"                                : "Wstaw/zmien lacze",
		"New window (_blank)"                               : "Nowe okno (_blank)",
		"None (use implicit)"                               : "Zaden (uzyj bezposrednio)",
		"OK"                                                : "OK",
		"Other"                                             : "Inne",
		"Same frame (_self)"                                : "Ta sama ramka (_self)",
		"Target:"                                           : "Cel:",
		"Title (tooltip):"                                  : "Tytul (na dymku):",
		"Top frame (_top)"                                  : "Ramka na samej gorze (_top)",
		"URL:"                                              : "URL:",
		"You must enter the URL where this link points to"  : "Musisz wprowadzic adres URL, na ktory ma wskazywac lacze"
	}
};
