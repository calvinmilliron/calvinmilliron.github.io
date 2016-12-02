$('#query').keyup(function(){
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  console.log(value.length);
    $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
      //console.log(data);
      $('#query').keyup(function() {
        var value = $('#query').val();
        var rExp = new RegExp(value, "i");
        if (value.length > 0){
  $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
          console.log(data); // test for JSON received
          // Begin building output
          var output = '<ol>';
          $.each(data.RESULTS, function(key, val) {
            if (val.name.search(rExp) != -1) {
              output += '<li>';
              output += '<a href="#" onclick="'+ val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
              output += '</li>';
            }
          }); // end each
          output += '</ol>';
          $("#searchResults").html(output); // send results to the page

        }); // end getJSON
          
           } else {
     $("#searchResults").html("clear"); console.log("end");
  }

      }); // end onkeyup
      
 

    }); // end getJSON

  
}); // end keyup