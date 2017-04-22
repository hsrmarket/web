var hbs = require('hbs');

hbs.registerHelper('currentType', function(type){
    if(type == "book"){
        return "books";
    }
    if(type == "electronic"){
        return "electronics";
    }
    if(type == "office supply"){
        return "officesupplies";
    }
    if(type == "other"){
        return "other";
    }
    return "";
});

