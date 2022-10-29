let sort = quick;

function startSorting() {
  arr = shuffle(arr);

  const toggle = () => {
    document.body.classList.toggle("inactive");
  };

  toggle();

  sort().then(toggle);
}

document.querySelector("[data-dropdown-list]").onclick = e => {
  if (e.target.tagName.toLowerCase() !== "li") return;

  sort = {
    bubble: bubble,
    "cocktail shaker": cocktail,
    insertion: insertion,
    "binary insertion": binaryInsertion,
    gnome: gnome,
    "optimized gnome": optimizedGnome,
    "odd / even": oddEven,
    comb: comb,
    shell: shell,
    selection: selection,
    "double selection": doubleSelection,
    heap: heap,
    "in place merge": merge,
    quick: quick,
    intro: intro
  }[e.target.textContent];

  closeDropdown();

  document
    .querySelectorAll("[data-selected]")
    .forEach(el => (el.innerText = e.target.textContent));
};
