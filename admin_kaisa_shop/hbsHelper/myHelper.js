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
  else if(status=="1"){
    return new Handlebars.SafeString('<button type="submit" class="btn btn-success">'+"Mở"+"</button>");
  }
});
Handlebars.registerHelper("permissionHelper",function(permission){
  if(permission=="1"){
    return new Handlebars.SafeString('<button type="submit" class="btn btn-secondary">'+'Khóa'+'</button>');
  }else{
    return new Handlebars.SafeString('<button type="submit" class="btn btn-success">'+'Mở'+'</button>');
  }
});



Handlebars.registerHelper("paginationHelper",function(current,total){
  var start;
  var end;
  var href="/ds_thanh_vien";

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
