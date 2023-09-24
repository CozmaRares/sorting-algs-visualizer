import "./style.css";
import p5 from "p5";
import { Element, config } from "./src/utils";
import sortingAlgorithms from "./src/sorting";

let arr;
let currentAlgorithm = null;

function getCanvasDimensions() {
  const parse = (str) => parseInt(str.replace("px", ""));

  const container = document.querySelector("#container");
  const styles = getComputedStyle(container);
  const width = parse(styles.width),
    height = parse(styles.height);
  return [width, height];
}

function sketch(s) {
  const generateArray = () =>
    Array.from(
      new Array(s.width),
      (_, index) =>
        new Element(
          s.map(index, 0, s.width, 0, s.height),
          s.width,
          index,
          s.map,
        ),
    );

  s.setup = () => {
    let canvas = s.createCanvas(...getCanvasDimensions());
    canvas.parent("container");
    s.strokeWeight(1);
    s.noFill();
    arr = generateArray();
  };

  s.draw = () => {
    s.background(55, 65, 81);
    arr.forEach((element, idx) => {
      s.stroke(element.red, element.green, element.blue);
      s.line(idx, s.height, idx, s.height - element.value);
    });
  };

  document.querySelector("#start-btn").onclick = async () => {
    if (currentAlgorithm === null) return alert("Please select an algorithm.");

    s.shuffle(arr, true);
    document.body.classList.add("inactive");
    await sortingAlgorithms[currentAlgorithm].func(arr, Element.greater);
    document.body.classList.remove("inactive");
  };
}

const select = document.querySelector(".select-container select");

select.onchange = (e) => {
  const value = e.target.value;
  currentAlgorithm = value === "default" ? null : value;
};

Object.entries(sortingAlgorithms).forEach(([algorithm, { name }]) => {
  const option = document.createElement("option");

  option.value = algorithm;
  option.innerText = name;

  select.append(option);
});

const modal = document.querySelector(".modal");
document.querySelector("#settings").onclick = () => modal.classList.add("open");
document.querySelector("#close").onclick = () => modal.classList.remove("open");

const waitInput = document.querySelector("#wait");
const iterationsInput = document.querySelector("#iterations");

waitInput.value = config.waitBetweenSwaps;
iterationsInput.value = config.iterationsPerFrame;

waitInput.onchange = (e) =>
  (config.waitBetweenSwaps = parseInt(e.target.value));

iterationsInput.onchange = (e) => {
  const iterations = parseInt(e.target.value);

  if (iterations <= 0) {
    iterationsInput.value = config.iterationsPerFrame;
    return alert("Number of iterations cannot be less than or equal to 0.");
  }

  config.iterationsPerFrame = iterations;
};

new p5(sketch);
