// Password strength meter
// This jQuery plugin is written by firas kassem [2007.04.05]
// Firas Kassem  phiras.wordpress.com || phiras at gmail {dot} com
// for more information : http://phiras.wordpress.com/2007/04/08/password-strength-meter-a-jquery-plugin/
// 
// i18n stuff added (Polish, German, French language versions) by maneo (maneo@man.poznan.pl).
//

var shortPassString = {
	en : 'Too short password',
	pl : 'Za krótkie hasło',
	fr : 'Mot de passe trop court',
	de : 'Zu kurzes Kennwort'	
};

var badPassString = {
	en : 'Weak password',
	pl : 'Słabe hasło',
	fr : 'Mot de passe faible',
	de : 'Schwaches Kennwort'
};

var goodPassString = {
	en : 'Good password',
	pl : 'Dobre hasło',
	fr : 'Bon mot de passe',
	de : 'Gutes Kennwort'
};

var strongPasString = {
 	en : 'Strong password',
	pl : 'Bardzo dobre hasło',
	de : 'Starkes Kennwort',
	fr : 'Mot de passe fort'
};

var error_prefix = '<span class="error">';
var ok_prefix = '<span style="color:green">';
var msg_suffix = '</span>';


function passwordStrength(password,username, lang)
{
    score = 0 

    if ( ( lang != 'de' ) && ( lang != 'pl' ) && ( lang != 'en' ) && ( lang != 'fr' ) )
	   lang = 'en';
 
    
    //password < 4
    if (password.length < 4 ) { return error_prefix+shortPassString[lang]+msg_suffix; }
    
    //password == username
    if (password.toLowerCase()==username.toLowerCase()) return error_prefix+badPassString[lang]+msg_suffix;
    
    //password length
    score += password.length * 4
    score += ( checkRepetition(1,password).length - password.length ) * 1
    score += ( checkRepetition(2,password).length - password.length ) * 1
    score += ( checkRepetition(3,password).length - password.length ) * 1
    score += ( checkRepetition(4,password).length - password.length ) * 1

    //password has 3 numbers
    if (password.match(/(.*[0-9].*[0-9].*[0-9])/))  score += 5 
    
    //password has 2 sybols
    if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) score += 5 
    
    //password has Upper and Lower chars
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  score += 10 
    
    //password has number and chars
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  score += 15 
    //
    //password has number and symbol
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/))  score += 15 
    
    //password has char and symbol
    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/))  score += 15 
    
    //password is just a nubers or chars
    if (password.match(/^\w+$/) || password.match(/^\d+$/) )  score -= 10 
    
    //verifing 0 < score < 100
    if ( score < 0 )  score = 0 
    if ( score > 100 )  score = 100 
    
    if (score < 34 )  return error_prefix+badPassString[lang]+msg_suffix;  
    if (score < 68 )  return ok_prefix+goodPassString[lang]+msg_suffix;
    return ok_prefix+strongPassString[lang]+msg_suffix;
}


// checkRepetition(1,'aaaaaaabcbc')   = 'abcbc'
// checkRepetition(2,'aaaaaaabcbc')   = 'aabc'
// checkRepetition(2,'aaaaaaabcdbcd') = 'aabcd'

function checkRepetition(pLen,str) {
    res = ""
    for ( i=0; i<str.length ; i++ ) {
        repeated=true
        for (j=0;j < pLen && (j+i+pLen) < str.length;j++)
            repeated=repeated && (str.charAt(j+i)==str.charAt(j+i+pLen))
        if (j<pLen) repeated=false
        if (repeated) {
            i+=pLen-1
            repeated=false
        }
        else {
            res+=str.charAt(i)
        }
    }
    return res
}
