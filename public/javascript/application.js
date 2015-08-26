$(function() {

  request = $.ajax({
        method: "get",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        jsonpCallback: 'callback',
        dataType: "jsonp",
        data: {
          "key" : "9bd95bea53f5b286b7ffbaa71fb5cbe5",
          "q"   : "chicken"
        },
        url: "http://food2fork.com/api/search"
  })
  .done(function(data){
    $("<body>").append(data);
  })
  .fail(function(){
    $("<body>").append("Something went wrong.");
  });
});
