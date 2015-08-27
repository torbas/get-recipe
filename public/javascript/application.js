$(function() {

  var recipesDiv = $("#recipes");
  
  var handlers = {
    loadSearch: function(data){
        request = $.ajax({
              method: "get",
              url: "/recipes",
              dataType: "json"
        })
        .done(function(result){

          var parsedSearch = $.parseJSON(result);

          parsedSearch.recipes.forEach(function(recipe){

              var recipeTitle = $("<h3>").text(recipe.title+" by "+recipe.publisher);

              var panel = $("<div>",{
                        "class": "panel panel-primary"
                      });

              var panelTitle = $("<div>",{
                        "class": "panel-heading",
                      }).append(recipeTitle);

              var showBtn = $("<div>",{
                        "class": "btn btn-info show",
                        "text" : "Show Recipe",
                        "rid"  : recipe.recipe_id,
                      })

              var panelContent = $("<div>",{
                        "class": "panel-body",
                      }).append(showBtn);

              var assembled = panel.append(panelTitle).append(panelContent);

              recipesDiv.append(assembled);
          });
        });
    }
  }

  $("#search-form").on("submit", function(){
    var query = $("#search").val().replace(" ",",");
    var data = {
      query:        query, 
    }

    handlers.loadSearch(data);

    return false;
  });



});
