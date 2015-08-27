$(function() {

  var recipesDiv = $("#recipes");

  var handlers = {
    loadSearch: function(data){
      
      recipesDiv.empty();

      request = $.ajax({
            method: "get",
            data: data,
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
                      "class": "btn btn-info toggle",
                      "text" : "Show Recipe",
                      "rid"  : recipe.recipe_id,
                    })

            var panelContent = $("<div>",{
                      "class": "panel-body hide",
                    });

            var assembled = panel.append(panelTitle).append(panelContent).append(showBtn);

            recipesDiv.append(assembled);
        });
      });
    },

    loadRecipe: function(rid, targetElement){

      request = $.ajax({
            method: "get",
            url: "/recipe/"+rid,
            dataType: "json"
      })
      .done(function(result){

        var parsedRecipe = $.parseJSON(result);
        var wrapper = $("<div>");
        parsedRecipe.recipe.ingredients.forEach(function(ingredient){
          var ingredientDiv = $("<div>", {"class": "ingredient"}).text(ingredient);
          wrapper.append(ingredientDiv);
        });
        targetElement.html(wrapper);
    
      });     

    }
  }

  $("#search-form").on("submit", function(){
    var query = $("#search").val().replace(" ",",");

    var data = {
      query: query, 
    }

    handlers.loadSearch(data);

    return false;
  });

  recipesDiv.on("click", ".toggle", function(){
    var panelBody = $(this).siblings(".panel-body");

    if(panelBody.hasClass("hide"))
      $(this).text("Hide Recipe");
    else
      $(this).text("Show Recipe");

    panelBody.toggleClass("hide");

    if(!panelBody.children().length)
      handlers.loadRecipe($(this).attr("rid"), panelBody);

  });

});
