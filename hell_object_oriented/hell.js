
window.addEvent = function(element, event, fn) {
  if (element.addEventListener) {
    element.addEventListener(event, fn, false);

  } else if (element.attachEvent) {
    element.attachEvent("on" + event, function() {
      fn.call(element)
    });

  }
}

function init() {

  var SCENE_WIDTH=500;
  var man=new Man("man",SCENE_WIDTH/2,0,70,83,5);  
  var scene=new Scene("bg",SCENE_WIDTH,750,man);
  scene.start();

  //man.draw();


}
