

function init(child) {
  modules();
  $.ajax({
    url: "scripts/children.json",
    success: function(data) { useData(data, child); }
  });

}

//A function to display source data
function useData(data, child){
  console.log(data);
  
  $(".shaded").css("background-color", data[child]['color'])
  $("#name").html(toTitleCase(child))
  
  $("#age").html(data[child]['age']);
  $("#hair").html(data[child]['hair']);
  $("#grade").html(data[child]['grade']);
  $("#eyes").html(data[child]['eyes']);
  
  $("#img-activity").attr("src", "images/"+child+"-activity-"+data[child]['activity']+".png");
  $("#img-animal-cartoon").attr("src", "images/"+child+"-animal-"+data[child]['animal']+"-cartoon.png");
  $("#img-animal-real").attr("src", "images/"+child+"-animal-"+data[child]['animal']+"-real.png");
  $("#img-candy").attr("src", "images/"+child+"-candy-"+data[child]['candy']+".png");
  $("#img-character").attr("src", "images/"+child+"-character-"+data[child]['character']+".png");
  $("#img-drink").attr("src", "images/"+child+"-drink-"+data[child]['drink']+".png");
  $("#img-food").attr("src", "images/"+child+"-food-"+data[child]['food']+".png");
  $("#img-fruit").attr("src", "images/"+child+"-fruit-"+data[child]['fruit']+".png");
  $("#img-candy").attr("src", "images/"+child+"-candy-"+data[child]['candy']+".png");
  $("#img-fruit").attr("src", "images/"+child+"-fruit-"+data[child]['fruit']+".png");
 
  $("#img-character").attr("src", "images/"+child+"-character-"+data[child]['character']+".png");
  $("#img-drink").attr("src", "images/"+child+"-drink-"+data[child]['drink']+".png");
}

function toTitleCase(str) {
  return str.replace(/\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}


function modules(){
  $("#header").load("/cit230/modules/header.html");
  $("#footer").load("/cit230/modules/footer.html");
}

