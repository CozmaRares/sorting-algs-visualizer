let arr = [];

let canvasBackground =
  getComputedStyle(document.body).getPropertyValue("--dark") === "true"
    ? 0
    : 255;

function getCanvasDimensions() {
  const container = document.querySelector("#container");

  const styles = getComputedStyle(container);

  const parse = str => parseInt(str.replace("px", ""));

  const width = parse(styles.width),
    height = parse(styles.height);

  return [width, height];
}

function setArray() {
  arr = Array.from(
    new Array(width),
    (_, index) => new Element(map(index, 0, width, 0, height), index)
  );
}

function setup() {
  let canvas = createCanvas(...getCanvasDimensions());
  canvas.parent("container");

  strokeWeight(1);
  noFill();
  setArray();
}

function draw() {
  background(canvasBackground);

  arr.forEach((el, idx) => {
    stroke(el.r, el.g, el.b);
    line(idx, height, idx, height - el.value);
  });
}

function windowResized() {
  resizeCanvas(...getCanvasDimensions());
  setArray();
}
