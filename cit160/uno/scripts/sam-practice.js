function decideCareer(){
  if(document.getElementById("design-yes").checked && document.getElementById("animals-yes").checked && document.getElementById("crowds-yes").checked){
    document.getElementById("result-display").innerHTML = "You like designing, animals, and crowds. You should be a Marine Biologist!"
  }
  else if(document.getElementById("design-no").checked && document.getElementById("animals-yes").checked && document.getElementById("crowds-yes").checked){
    document.getElementById("result-display").innerHTML = "You don't like designing, but you like animals and crowds. You should be a Sea World Performer!"
  }
  else if(document.getElementById("design-no").checked && document.getElementById("animals-no").checked && document.getElementById("crowds-yes").checked){
    document.getElementById("result-display").innerHTML = "You don't like designing or animals, but you do like crowds. You should be a Politician."
  }
  else if(document.getElementById("design-no").checked && document.getElementById("animals-no").checked && document.getElementById("crowds-no").checked){
    document.getElementById("result-display").innerHTML = "You like none of these things? Well, we have no options thus far for you, but we'll work on it. In the meantime, find a hobby and do something with it."
  }
  else if(document.getElementById("design-yes").checked && document.getElementById("animals-no").checked && document.getElementById("crowds-yes").checked){
    document.getElementById("result-display").innerHTML = "I got nothing. Like designing and crowds? Weird combo."
  }
  else if(document.getElementById("design-yes").checked && document.getElementById("animals-yes").checked && document.getElementById("crowds-no").checked){
    document.getElementById("result-display").innerHTML = "You like designing and animals, but not crowds? My type of person. Come be a Web Designer, you awesome person!"
  }
  else if (document.getElementById("design-no").checked && document.getElementById("animals-yes").checked && document.getElementById("crowds-no").checked){
    document.getElementById("result-display").innerHTML = "You don't like designing or crowds, but you do like animals? Be a Veterinarian."
  }
  else{
    document.getElementById("result-display").innerHTML = "Please choose from the above options."
  }
}
