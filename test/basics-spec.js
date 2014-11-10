function basicsSpec(spec, f, _, when, dom) {
	   var assert = spec.assert;

	   function elemTest(test) {
	       return _.bind(test, this, dom);
	   }

	   return spec("basics", {
	       "elements can be empty" : elemTest(function(e) {
		   var res=f.p()(e);
		   return assert.equals(res.find('p').text, "");
	       }),
	       "elements can have text" : elemTest(function(e) {
		   var res=f.p("hello")(e);
		   return assert.equals("hello", res.find('p').text.trim());
	       }),
	       "numbers are interpreted as text" : elemTest(function(e) {
		   var res=f.p(1337)(e);
		   return assert.equals("1337", res.find('p').text.trim() );
	       }),
	       "elements can have attributes" : elemTest(function(e) {
		   var res=f.a({href: 'http://google.com'})(e);
		   return assert.equals(res.find('a').attr['href'], "http://google.com");
	       }),
               "text with leading # is a shorthand for {id:...}" : elemTest(function(e) {
		   var res=f.p("#this-is-an-id", "this is a text")(e);
		   return assert.equals(res.find("#this-is-an-id").text.trim(), "this is a text");
	       }),
               "text with leading . is a shorthand for addClass" : elemTest(function(e) {
		   var res=f.p(".this-is-a-class", "this is a text")(e);
		   return assert.equals(res.find(".this-is-a-class").text.trim(), "this is a text");
	       }),
	       "elements can have subelements" : elemTest(function(e) {
		   var res=f.p(f.strong("strong text"))(e);
		   return assert.equals(res.find('p strong').text.trim(), "strong text");
	       }),
	       "elements can have several textelements" : elemTest(function(e) {
		   var res=f.p("one", "two", "three")(e);
		   return assert.equals(res.find('p').text.trim(), "one\ntwo\nthree");
	       }),
	       "elements can be mixed with text" : elemTest(function(e) {
		   var res=f.p("before", f.strong("middle"), "after")(e);
		   return assert.equals(res.find('p').html().trim(), "before<strong>\nmiddle</strong>\nafter");
	       }),
	       "attributes can be mixed with text" : elemTest(function(e) {
		   var res=f.a("before", {href: 'http://agicavar res=f.se'}, "after")(e);
                   return assert.all(
		       assert.equals(res.find("a").text.trim(), "before\nafter"),
		       assert.equals(res.find("a").attr['href'], "http://agicavar res=f.se"));
	       }),
	       "attributes can be mixed with elements" : elemTest(function(e) {
		   var res=f.a({href: "http://google.com"}, f.strong("hello"))(e);
                   return assert.all(
		       assert.equals(res.find("a strong").text.trim(), "hello"),
		       assert.equals(res.find("a").attr['href'], "http://google.com"));
	       }),
	       "attributes are merged": elemTest(function(e) {
		   var res=f.img({src: "http://placekitten.com/e/200/300"},
			 {alt: "a cute kitten"})(e);
                     return assert.all(
		       assert.equals(res.find('img').attr['src'], "http://placekitten.com/e/200/300"),
		       assert.equals(res.find('img').attr['alt'], "a cute kitten"));
	       }),
	       "lists of text elements are added as individual elements" : elemTest(function(e) {
		   var res=f.p(["text1", "text2"])(e);
		   return assert.equals(res.find('p').text.trim(),"text1\ntext2");
	       }),
	       "sublists of text elements are added as individual elements" : elemTest(function(e) {
		   var res=f.p(["text1", ["text2", "text3"]])(e);
		   return assert.equals(res.find('p').text.trim(),"text1\ntext2\ntext3");
	       })
           });
       }


if (typeof define !== 'undefined') {
    define(['spec', 'foliage', 'lodash', 'when', 'foliage-dom'], basicsSpec);
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = basicsSpec(
        require('./spec'), 
        require('../foliage'), 
        require('lodash'), 
        require('q'), 
        require('../foliage-dom'));
};
