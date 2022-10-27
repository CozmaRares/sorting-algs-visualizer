// shuffle() already taken by p5.js
function shuff() {
  arr = shuffle(arr);
}

let sort;

function set_sort(idx) {
  sort = [
    bubble,
    cocktail,
    insertion,
    binaryInsertion,
    gnome,
    optimizedGnome,
    oddEven,
    comb,
    shell,
    selection,
    doubleSelection,
    heap,
    merge,
    quick,
    intro
  ][idx];

  document.getElementById("text_").innerText =
    document.getElementById("sorting-algorithms").childNodes[(idx << 1) + 1]
      .innerText + " sort";

  let slow_algs = document.getElementById("slow-algs"),
    divide_et_impera = document.getElementById("divide-et-impera"),
    time_label = document.getElementById("time-label");

  if (idx <= 8) {
    slow_algs.classList.remove("hidden");
    divide_et_impera.classList.add("hidden");
    time_label.innerText = "Time between frames (ms)";
  } else if (idx < 12) {
    slow_algs.classList.add("hidden");
    divide_et_impera.classList.add("hidden");
    time_label.innerText = "Time between swaps (ms)";
  } else {
    slow_algs.classList.add("hidden");
    divide_et_impera.classList.remove("hidden");
    time_label.innerText = "Time between swap (ms)";
  }
}

function start_sort() {
  if (!sort) return alert("Please select a sorting algorithm");

  const disable = () => {
    let start_btn = document.getElementById("start-btn"),
      shuffle_btn = document.getElementById("shuffle-btn");

    document.getElementsByClassName("nav")[0].classList.toggle("inactive");

    start_btn.disabled = !start_btn.disabled;
    shuffle_btn.disabled = !shuffle_btn.disabled;
  };

  disable();

  sort().then(disable);
}
