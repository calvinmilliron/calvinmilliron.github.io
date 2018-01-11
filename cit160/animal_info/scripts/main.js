function selectAnimal(thisAnimal) {

  var elements = document.getElementsByClassName(thisAnimal.className)
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor="transparent"
  }
  thisAnimal.style.backgroundColor="gray";
  var infoElements = document.getElementsByClassName("animalInfo")
  for (var i = 0; i < infoElements.length; i++) {
    infoElements[i].style.display="none"
  }
  document.getElementById(thisAnimal.id+"Info").style.display="block"
}