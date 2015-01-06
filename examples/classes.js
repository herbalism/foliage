define(['foliage'], function(f) {
    return f.p("classes with synonyms",
               '.class1',
               {
                   'class':'class2',
                   classes:'class3 class4',
                   className: 'class5',
                   classNames: 'class6'
               });
});
