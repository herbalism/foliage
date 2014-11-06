function foliageReact(react){
    function makeReactInstance(create){
        return react.createClass({render:function(){return create(react.DOM)}})();
    };
    return {
            in: function(element, create){
                var id = element.substring(1);
                react.renderComponent(makeReactInstance(create), document.getElementById(id));
            },
        text: function(create) {
            return react.renderComponentToString(makeReactInstance(create));
        }
    };
};


if (typeof define !== 'undefined') {
    define(['react'], foliageReact);
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = foliageReact(require('react'));
}
