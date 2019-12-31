const Handlebars=require('hbs');

Handlebars.registerHelper("messageHelper",function(message,options){
  if(message!=""){
      return options.fn(this);
  }
});

