var hbs = require('hbs');

hbs.registerHelper('conditionMaker', function(condition) {
    var text = '';
    for(var i = 0; i < condition; ++i)
        text += "<span class='glyphicon glyphicon-fire priority'></span>";
    return text;
});

hbs.registerHelper('equal', function(lvalue, rvalue, options) {
    return lvalue != rvalue ? options.inverse(this) : options.fn(this);
});


