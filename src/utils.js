export const config = {
  waitBetweenSwaps: 1,
  iterationsPerFrame: 1,
};

export function sleep() {
  return new Promise((resolve) => setTimeout(resolve, config.waitBetweenSwaps));
}

export async function swapAsync(arr, idx1, idx2) {
  await sleep();
  swapSync(arr, idx1, idx2);
}

export function swapSync(arr, idx1, idx2) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

const colors = [
  // from left to right
  { red: 102, green: 0, blue: 51 },
  { red: 204, green: 0, blue: 153 },
  { red: 0, green: 0, blue: 255 },
  { red: 0, green: 255, blue: 0 },
  { red: 255, green: 255, blue: 0 },
  { red: 255, green: 71, blue: 26 },
  { red: 255, green: 0, blue: 0 },
];

export class Element {
  constructor(value, maxValue, idx, mapFunction) {
    this.value = value;

    const group_length = maxValue / (colors.length - 1);
    let group_start = Number.MAX_SAFE_INTEGER,
      group_idx = colors.length - 1;

    while (group_idx > 0 && idx < group_start) {
      group_idx--;
      group_start = group_length * group_idx;
    }

    this.red = mapFunction(
      idx,
      group_start,
      group_start + group_length,
      colors[group_idx].red,
      colors[group_idx + 1].red,
    );
    this.green = mapFunction(
      idx,
      group_start,
      group_start + group_length,
      colors[group_idx].green,
      colors[group_idx + 1].green,
    );
    this.blue = mapFunction(
      idx,
      group_start,
      group_start + group_length,
      colors[group_idx].blue,
      colors[group_idx + 1].blue,
    );
  }

  static greater = (a, b) => a.value > b.value;
}
