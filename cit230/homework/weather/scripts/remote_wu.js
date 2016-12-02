// Current Location Scripts

  //var status = $('#status');
  
  
  
  (function getGeoLocation() {
    //status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        // Call the getData function, send the lat and long
        getData(lat, long);
      });
    } else {
      //status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }
  })();

  // Get the data from the wunderground API
  function getData(lat, long) {
    $("#searchResults").html("");
    $('#query').val("");
    $.ajax({
      url: "https://api.wunderground.com/api/64ffccdad5d42b2b/geolookup/conditions/forecast/q/"+lat+","+long+".json",
      dataType: "jsonp",
      success: function(data) { useData(data); }
    });
    /*$.ajax({
      url: "https://api.wunderground.com/api/64ffccdad5d42b2b/geolookup/forecast/q/"+lat+","+long+".json",
      dataType: "jsonp",
      success: function(data) { console.log("forecast"); console.log(data); console.log(data['forecast']['simpleforecast']['forecastday']['0']['high']['fahrenheit']); }
    });*/
    
  }
  
  //A function to display source data
  function useData(data){
    console.log(data);
    $("#currentCity").html(data['location']['city']+", "+data['location']['state']);
    document.title = data['location']['city']+", "+data['location']['state']+" | "+document.title;
    $("#currentTemp").html(Math.round(data['current_observation']['temp_f']));
    console.log("https://icons-ak.wxug.com/i/c/k/"+data['current_observation']['icon']+".gif");
    $("#currentSummary").attr('src', "https://icons-ak.wxug.com/i/c/k/"+data['current_observation']['icon']+".gif");
    $("#windSpeed").html(data['current_observation']["wind_mph"]);
    $("#windDir").html(data['current_observation']["wind_dir"]);
    $("#rainInch").html( Math.round(data['current_observation']["precip_today_in"]));
    $("#celsius").html(data['current_observation']["temp_c"]);
    $("#summaryDescription").html(toTitleCase(data['current_observation']['weather']))
    $("#highLow").html("High "+data['forecast']['simpleforecast']['forecastday']['0']['high']['fahrenheit']+"&deg;<br>Low "+data['forecast']['simpleforecast']['forecastday']['0']['low']['fahrenheit']+"&deg;")
    if (data['current_observation']['temp_f'] > 80){
      $("#clothingRecommend").html("It could get hot, so you try to wear light clothing today and stay hydrayted.");
    } else if (data['current_observation']['temp_f'] > 60){
      $("#clothingRecommend").html("It will be a mild temperature today.");
    } else{
      $("#clothingRecommend").html("It will be cold. You may want to bundle up");
    }
    if (data['current_observation']["precip_today_in"] > 1){
      $("#travelRecommend").html("There may be rain, so do not forget your coats and umbrellas.");
      $("#newsRecommend").html("The rain has caused several collisions on several highways and surface streets due to people driving too fast and too close together.<br>Several cars has swerved off the road due to hydroplaning, where due to the speed of the rotation of the tire the car actually lifts up off of the ground and drives on the surface of the water where it has no ability to turn or stop");
    }else {
      $("#travelRecommend").html("It may be sunny today, so don't forget you sunglasses while driving.");
      $("#newsRecommend").html("The heat has caused a fatality due to heat exhaustion brought on by not drinking any water in this hot weather.<br>Stay safe around swimming pools. There have been 2 fatalities of children playing in pools unsupervised.");
    }

    //$("#summary").html(data['current_observation']['weather'])
    //$("#add1").html(data['current_observation']['relative_humidity']+" Humidity")
    //$("#add2").html(Math.round(data['current_observation']['wind_mph'])+"mph Winds")
    //$("#add3").html("Wind Direction - "+data['current_observation']['wind_dir'])
    //$("#cover").fadeOut(250);
  }
  

  // A function for changing a string to TitleCase
  function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
