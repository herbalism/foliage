var foliage = function(_) {

    function applyParent(element, parent) {
        return element(parent);
    };

    function unsafeHtml(html){
        return {dangerouslySetInnerHTML:{__html: html}};
    };

    function groupArgs(args) {
	var children = [];
	var attributes  = {};
	function textNode(text) {
	    return function(dom){return'\n'+text};
	}

	var handleArg = function (arg) {
	    switch(typeof arg) {
	    case "string": 
                switch (arg.charAt(0)) {
                case "#": handleObject({'id': arg.substr(1)}); break;
                case ".": children.push(addClass(arg.substr(1))); break;
                default: children.push(textNode(arg)); break;
                };break;
	    case "object": handleObject(arg); break;
	    case "number" :children.push(textNode(arg)); break;
	    case "undefined" : break;
		
	    default: children.push(arg);
	    }
	}

	var handleObject = function(obj) {
	    if(_.isArray(obj)) {
		_.each(obj, function (item) {
		    handleArg(item);
		});
	    } else {
		attributes = _.extend(attributes, obj);     
	    }
	}

	_.each (args, handleArg)
	    return {
		children: children,
		attributes: attributes
	    }
    }
    
    var e = function(name) {
	return function() {
	    var args = groupArgs(arguments);
	    return function(dom) {
                var children = _.map(args.children, function(child){
                    return child(dom);
                });
		return  dom[name].apply(null,[args.attributes].concat(children));
	    }
	}
    }
    
    var addClass = function(c) {
	return function(e) {
	    e.addClass(c);
	    return {
		undo: function(){e.removeClass(c)}
	    }
	}
    }

    var res = _.reduce(
	['a', 
         'abbr',
         'address',
         'area',
         'article',
         'aside',
         'audio',
         'b',
         'base',
         'bdi',
         'bdo',
         'big',
         'blockquote',
         'body',
         'br',
         'button',
         'canvas',
         'caption',
         'cite',
         'code',
         'col',
         'colgroup',
         'data',
         'datalist',
         'dd',
         'del',
         'details',
         'dfn',
         'dialog',
         'div',
         'dl',
         'dt',
         'em',
         'embed',
         'fieldset',
         'figcaption',
         'figure',
         'footer',
         'form',
         'h1',
         'h2',
         'h3',
         'h4',
         'h5',
         'h6',
         'head',
         'header',
         'hr',
         'html',
         'i',
         'iframe',
         'img',
         'input',
         'ins',
         'kbd',
         'keygen',
         'label',
         'legend',
         'li',
         'link',
         'main',
         'map',
         'mark',
         'menu',
         'menuitem',
         'meta',
         'meter',
         'nav',
         'noscript',
         'object',
         'ol',
         'optgroup',
         'option',
         'output',
         'p',
         'param',
         'picture',
         'pre',
         'progress',
         'q',
         'rp',
         'rt',
         'ruby',
         's',
         'samp',
         'script',
         'section',
         'select',
         'small',
         'source',
         'span',
         'strong',
         'style',
         'sub',
         'summary',
         'sup',
         'table',
         'tbody',
         'td',
         'textarea',
         'tfoot',
         'th',
         'thead',
         'time',
         'title',
         'tr',
         'track',
         'u',
         'ul',
         'var',
         'video',
         'wbr'],
	function(res, name) {
	    res[name] = e(name);
	    return res;
	},
	{element:e});
    res.unsafeHtml = unsafeHtml;
    return res;
};


if (typeof define !== 'undefined') {
    define(['lodash'], foliage);
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = foliage(require('lodash'));
}
