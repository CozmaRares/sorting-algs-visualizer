let arr = [];

function setup() {
  let canvas = createCanvas(
    windowWidth,
    windowHeight -
      document.getElementById("p5js-container").getBoundingClientRect().y
  );
  canvas.parent("p5js-container");

  strokeWeight(1);
  noFill();

  arr = Array.from(
    new Array(width),
    (_, index) => new Element(map(index, 0, width, 0, height), index)
  );
}

function draw() {
  background(0);

  arr.forEach((element, index) => {
    stroke(element.r, element.g, element.b);
    line(index, height, index, height - element.value);
  });
}
