$(function() {

  request = $.ajax({
        method: "get",
        url: "/recipes"
  })
  .done(function(result){
    $("<body>").append(result);
  })
  .fail(function(){
    $("<body>").append("Something went wrong.");
  });
});
