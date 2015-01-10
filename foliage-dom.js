(function(){
    function foliageDom(_) {
        function trigger(node, event, payload){
            var event = event.charAt(0).toUpperCase() + event.slice(1);
            var handler = node.attr['on'+event];
            handler && handler(payload);
        };
        
        function text(node){
            return _.foldl(node.children, function(text, current){
                return (_.isObject(current) || 
                        _.isFunction(current) || 
                        _.isArray(current)) ?
                    text :
                    text + current;
            }, "");
        };

        function find(node, pattern) {
            function findPath(currentPattern){
                return function(nodeToCheck) {
                    var matchers = {
                        '#':function(node){
                            var expectedId = currentPattern.substring(1);
                            return (node.attr && 
                                    node.attr.id && 
                                    node.attr.id === expectedId);
                        },
                        '.':function(node){
                            var c = currentPattern.substring(1);
                            return (node.attr && 
                                    node.attr.class && 
                                    _.contains(node.attr.class, c));
                        }
                    }
                    var doMatch = matchers[currentPattern.substring(0,1)];
                    
                    if(doMatch) {
                        return doMatch(nodeToCheck) ? nodeToCheck : undefined;
                    }
                    else {
                        return nodeToCheck.name === currentPattern ? nodeToCheck : undefined;
                    }
                }
            }
            
            var path = pattern.split(' ');

            var resolvePath = function(candidates, path){
                var found = _(candidates).
                    map(findPath(path[0])).
                    filter(function(val){return val !== undefined});
                if(path.length > 1) {
                    return resolvePath(found.pluck('children').flatten().value(), path.slice(1));
                }
                return found.value();
            }
            var res = resolvePath([node], path);
            return res[0];
        };

        function e(name) {
            return function(attr){
                var children = _.toArray(arguments).slice(1);
                children = _.foldl(children, function(acc, next, index){
                    if(_.isFunction(next.attach)) {
                        next.attach(acc, index);
                    }
                    return acc;
                }, children);
                return {
                    name: name,
                    attr: attr,
                    children:children
                };
            }
        };
        var result = {
            find: find,
            text: text,
            trigger: trigger
        };

        result.createElement = e;

        result.dynamic = function(factory, initial) {
            var elementsToUpdate;
            var indexToUpdate;
            return {
                element: {
                    attach:function (elements, index) {
                        elementsToUpdate = elements;
                        indexToUpdate = index;
                        elements[index] = factory(initial)(result);
                    }
                },
                next: function(next) {
                    elementsToUpdate[indexToUpdate] = factory(next)(result);
                }
            }
        };

        

        return result;
    }

    if (typeof define !== 'undefined') {
        define(['lodash'], foliageDom);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = foliageDom(require('lodash'));
    }
})();
