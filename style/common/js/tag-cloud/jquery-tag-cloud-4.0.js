/*

DynaCloud v4

A dynamic JavaScript tag/keyword cloud with jQuery.

<http://johannburkard.de/blog/programming/javascript/dynacloud-a-dynamic-javascript-tag-keyword-cloud-with-jquery.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/

jQuery(function() {
 jQuery.highlight = document.body.createTextRange ? 

/*
Version for IE using TextRanges .
*/
  function(node, te) {
  
   var r = document.body.createTextRange();
   r.moveToElementText(node);
   for (var i = 0; r.findText(te); ++i) {
    r.pasteHTML('<span class="highlight">' +  r.text + '<\/span>');
    r.collapse(false);
   }
  }

 :

/*
 (Complicated) version for Mozilla and Opera using span tags.
*/
  function(node, te) {
   
   var pos, skip, spannode, middlebit, endbit, middleclone;
   skip = 0;
   if (node.nodeType == 3) {
    pos = node.data.toUpperCase().indexOf(te);
    if (pos > -1) {
     spannode = document.createElement('span');
     spannode.className = 'highlight';
     middlebit = node.splitText(pos);
     endbit = middlebit.splitText(te.length);
     middleclone = middlebit.cloneNode(true);
     spannode.appendChild(middleclone);
     middlebit.parentNode.replaceChild(spannode, middlebit);
     skip = 1;
    }
   }
   else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
    for (var i = 0; i < node.childNodes.length; ++i) {
     i += jQuery.highlight(node.childNodes[i], te);
    }
   }
   return skip;
  }

 ;

 jQuery.dynaCloud.stopwords = new RegExp("\\s((" + jQuery.dynaCloud.stopwords.join("|") + ")\\s)+", "gi");
 if (jQuery.dynaCloud.auto) {
  jQuery('.dynacloud').dynaCloud();
 }
});

jQuery.fn.dynaCloud = function(outElement) {
 var cloud = {};
 return this.each(function() {

  var cl = [];
  var max = 0;

  if (jQuery.wordStats && jQuery.dynaCloud.wordStats) {
   jQuery.wordStats.computeTopWords(jQuery.dynaCloud.max, this);
   for (var i = 0, j = jQuery.wordStats.topWords.length; i < j && i <= jQuery.dynaCloud.max; ++i) {
    var t = jQuery.wordStats.topWords[i].substring(1);
    if (typeof cloud[t] == 'undefined') {
     cloud[t] = { count: jQuery.wordStats.topWeights[i], el: t };
    }
    else {
     cloud[t].count += jQuery.wordStats.topWeights[i];
    }
    max = Math.max(cloud[t].count, max);
   }
   jQuery.wordStats.clear();
  }
  else {
   var elems = jQuery(this).text().split(',');
   var word = /.+/;
   jQuery.each(elems, function(i, n) {
   	
    if (word.test(n)) {
     var t = n.toLowerCase();
     if (typeof cloud[t] == 'undefined') {
      cloud[t] = { count: 1, el: n };
     }
     else {
      cloud[t].count += 1;
     }
     max = Math.max(cloud[t].count, max);
    }
   });
  }

  jQuery.each(cloud, function(i, n) {
   cl[cl.length] = n;
  });

  if (jQuery.dynaCloud.sort) {
   cl.sort(function(a, b) {
   	if (a.count == b.count) {
     return a.el < b.el ? -1 : (a.el == b.el ? 0 : 1);
    }
    else {
     return a.count < b.count ? 1 : -1;
    }
   });
  }

  var out;
  if ((out = jQuery(outElement ? outElement : '#dynacloud')).length == 0) {
   jQuery(document.body).append('<p id="dynacloud"><\/p>');
   out = jQuery('#dynacloud');
  }

  out.empty();

  var l = jQuery.dynaCloud.max == -1 ? cl.length : Math.min(jQuery.dynaCloud.max, cl.length);

  for (var i = 0; i < l; ++i) {
   //Link definition
   var newName = cl[i].el;
   out.append('<a href="'+ jQuery.dynaCloud.homePage + cl[i].el + '" style="font-size: ' + Math.ceil((cl[i].count / max) * jQuery.dynaCloud.scale) + 'em" class="tagLink" title="' + cl[i].el +'"><span>' + newName + '</span></a> &nbsp; ');
  }
  
  var target = this;

  jQuery('a', out).each(function() {
   jQuery(this).click(function() {
	});
  });

 });
};