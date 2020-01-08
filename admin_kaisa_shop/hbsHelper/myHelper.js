const Handlebars=require('hbs');

Handlebars.registerHelper("messageHelper",function(message,options){
  if(message!=""){
      return options.fn(this);
  }
});

Handlebars.registerHelper("permissionStatusHelper",function(status){
  if(status=="0"){
      return new Handlebars.SafeString('<button type="submit" class="btn btn-primary">'+"Mới tạo"+"</button>");
  }
  else if(status=="-1"){
    return new Handlebars.SafeString('<button type="submit" class="btn btn-secondary">'+"Khóa"+"</button>");
  }
  else if(status=="1"||status=="999"){
    return new Handlebars.SafeString('<button type="submit" class="btn btn-success">'+"Mở"+"</button>");
  }
});
Handlebars.registerHelper("permissionHelper",function(permission){
  if(permission=="999")
  {
    return null;
  }
  if(permission=="1"){
    return new Handlebars.SafeString('<button type="submit" class="btn btn-secondary">'+'Khóa'+'</button>');
  }else{
    return new Handlebars.SafeString('<button type="submit" class="btn btn-success">'+'Mở'+'</button>');
  }
});

Handlebars.registerHelper("isSuperAdmin",function(permission,options){
  if(permission=="999"){
    return options.fn(this);
  }
});

Handlebars.registerHelper("paginationHelper",function(current,total,link){
  var start;
  var end;
  var href=link;

  start=current-2;
  if(start<1){
      start=1;
  }
  end=start+4;

  if(end>total){
      end=total;
  }
  if(end-4>0){
      start=end-4;
  }



  var i;
  var myString="";
  var a="<a class="+"\"page-link\""+ "href="+"\"/0\""+">";
  if(start>1){
      var pre=current-1;
      myString=myString+ "<li class="+"\"page-item\""+">"+"<a class="+"\"page-link\""+ "href="+"\""+href+"/"+pre+"\""+">"+"Pre"+"</a>"+"</li>"
  }

for( i=start;i<=end;i++)
{
  if(i==current){
      myString=myString+ "<li class="+"\"page-item active\""+">"+"<a class="+"\"page-link\""+ "href="+"\""+href+"/"+i+"\""+">"+i+"</a>"+"</li>"
  }else{
      myString=myString+ "<li class="+"\"page-item\""+">"+"<a class="+"\"page-link\""+ "href="+"\""+href+"/"+i+"\""+">"+i+"</a>"+"</li>"
  }
 
}

if(total>end){
  
  const next=1+Number(current);
  myString=myString+ "<li class="+"\"page-item\""+">"+"<a class="+"\"page-link\""+ "href="+"\""+href+"/"+next+"\""+">"+"Next"+"</a>"+"</li>"
}
console.log(myString);
//return new Handlebars.SafeString("<li class="+"\"page-item\""+">"+a+"Previous"+"</a>"+"</li>");
return new Handlebars.SafeString(myString);


});


Handlebars.registerHelper("selectedStatus",function(currentStatus,status,options){
  if(status==currentStatus){
    return new Handlebars.SafeString('selected="selected"');
  }
});

Handlebars.registerHelper("lockHelper",function(lock,options){
  if(!lock){
    return new Handlebars.SafeString(' <button type="submit" class="btn btn-success" disabled>Mở</button>'+
    '<button type="submit" class="btn btn-danger" >khóa</button>');
  }
  else{
    return new Handlebars.SafeString(' <button type="submit" class="btn btn-success" >Mở</button>'+
    '<button type="submit" class="btn btn-danger" disabled>khóa</button>');
  }
});

