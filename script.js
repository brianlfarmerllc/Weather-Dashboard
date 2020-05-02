$(document).ready(function(){
  // This function handles events where one button is clicked
      $("#searchButton").on("click", function(event) {
       if ($("#cityStateInput").val() !== "" ) {
            event.preventDefault();
            var li = $("<li>");
            var newCity = $("#cityStateInput").val()
            li.addClass("list-group-item");
            li.attr("data-name", newCity);
            li.text(newCity);
            $("#cityStateList").append(li);
            
       }
        
      });

      

})



