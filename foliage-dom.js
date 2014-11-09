(function(){
    function foliageDom(_) {
        function e(name) {
            return function(attr){
                var children = _.toArray(arguments).slice(1);
                var node = {
                    name: name,
                    attr: attr,
                    text: _.foldl(children, function(text, current){
                        return (_.isObject(current) || _.isFunction(current) || _.isArray(current)) ?
                            text :
                            text + current;
                    }, ""),
                    children:children
                };
                var matchers = {
                    '#':function(node){
                        return (node.attr && node.attr.id && node.attr.id === pattern.substring(1))
                    }
                }
                var patternChars = ['#'];
                function find(pattern) {
                    var patternChar = matchers[pattern.substring(0,1)];
                    if(_.contains(patternChars, patternChar)) {
                        var doMatch = matchers[patternChar];
                        if(doMatch === undefined) {
                            throw new Error("Cannot match pattern "+pattern);
                        }
                    }
                    else {
                        return node.name === pattern ? node : undefined;
                    }
                    
                };
                node.find = find;
                return node;
            }
        };
        return _.reduce(
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
	    {});
    }

    if (typeof define !== 'undefined') {
        define(['lodash'], foliageDom);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = foliageDom(require('lodash'));
    }
})();
