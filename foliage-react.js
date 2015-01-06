(function(){
    function foliageReact(react){
        var factory = {
            createElement: function(name){
                return function(attr){
                    var args = Array.prototype.slice.call(arguments,0);
                    if(attr['class']) {
                        attr.className=attr['class'];
                        delete attr.class;
                    }
                    return react.createElement.apply(null , [name].concat(args));
                };
            },
            dynamic:function(elementFactory, initial) {
                var component;
                var result = react.createElement(react.createClass({
                    getInitialState : function (){
                        return initial;},
                    render: function(){
                        component = this;
                        return elementFactory(this.state)(factory);
                    }
                }));
                result.__proto__.__next = function(state){
                    if(component){
                        component.setState(state);
                    }
                };
                return result;
            }
        };

        function makeReactInstance(create){
            return react.createClass({
                render:function(){return create(factory)}
            });
        };
        
        return {
                in: function(element, create){
                    var id = element.substring(1);
                    var instance = makeReactInstance(create);
                    react.render(react.createElement(instance),
                                 document.getElementById(id));
                },
            text: function(create) {
                console.log('text: ', react);
                return react.renderToStaticMarkup(react.createElement(makeReactInstance(create)));
            }

        }
    };
    
    

    if (typeof define !== 'undefined') {
        define(['react'], foliageReact);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = foliageReact(require('react'));
    }
})();
