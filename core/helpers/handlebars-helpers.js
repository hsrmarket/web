var hbs = require('hbs');

hbs.registerHelper('conditionMaker', function(condition) {
    var text = '';
    for(var i = 0; i < condition; ++i)
        text += "<span><i class='fi-check'></span>";
    return text;
});

hbs.registerHelper('equal', function(lvalue, rvalue, options) {
    return lvalue != rvalue ? options.inverse(this) : options.fn(this);
});


