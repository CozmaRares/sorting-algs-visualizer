let arr = [];

function setup() {
  const container = document.querySelector("#container");

  const styles = getComputedStyle(container);

  const parse = str => parseInt(str.replace("px", ""));

  let canvas = createCanvas(parse(styles.width), parse(styles.height));
  canvas.parent("container");

  strokeWeight(1);
  noFill();

  arr = Array.from(
    new Array(width),
    (_, index) => new Element(map(index, 0, width, 0, height), index)
  );
}

function draw() {
  background(0);

  arr.forEach((el, idx) => {
    stroke(el.r, el.g, el.b);
    line(idx, height, idx, height - el.value);
  });
}
