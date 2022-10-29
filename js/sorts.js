function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swapAsync(idx1, idx2, time = 0) {
  await sleep(time);
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

function swapSync(idx1, idx2) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

const colors = [
  // from left to right
  { r: 102, g: 0, b: 51 },
  { r: 204, g: 0, b: 153 },
  { r: 0, g: 0, b: 255 },
  { r: 0, g: 255, b: 0 },
  { r: 255, g: 255, b: 0 },
  { r: 255, g: 71, b: 26 },
  { r: 255, g: 0, b: 0 }
];

class Element {
  constructor(value, idx) {
    this.value = value;
    this.r = this.g = this.b = 0;

    let group_length = width / (colors.length - 1),
      group_idx;

    for (let i = colors.length - 2; i >= 0; i--) {
      group_idx = group_length * i;
      if (idx < group_idx) continue;

      this.r = map(
        idx,
        group_idx,
        group_idx + group_length,
        colors[i].r,
        colors[i + 1].r
      );
      this.g = map(
        idx,
        group_idx,
        group_idx + group_length,
        colors[i].g,
        colors[i + 1].g
      );
      this.b = map(
        idx,
        group_idx,
        group_idx + group_length,
        colors[i].b,
        colors[i + 1].b
      );
      break;
    }
  }
}

async function bubble() {
  const num_it = 10,
    time = 1;

  let changed = true;

  do {
    for (let it = 0; it < num_it && changed; it++) {
      changed = false;

      for (let i = 1; i < arr.length; i++)
        if (arr[i - 1].value > arr[i].value) {
          swapSync(i - 1, i);
          changed = true;
        }
    }
    await sleep(time);
  } while (changed);
}

async function cocktail() {
  const num_it = 10,
    time = 1;

  let swapped = true,
    start = 0,
    end = arr.length - 1;

  while (swapped) {
    for (let it = 0; it < num_it && swapped; it++) {
      swapped = false;

      for (let i = start; i < end; ++i) {
        if (arr[i].value > arr[i + 1].value) {
          swapSync(i, i + 1);
          swapped = true;
        }
      }

      if (!swapped) break;

      swapped = false;

      --end;

      for (let i = end - 1; i >= start; --i) {
        if (arr[i].value > arr[i + 1].value) {
          swapSync(i, i + 1);
          swapped = true;
        }
      }

      ++start;
    }
    await sleep(time);
  }
}

async function insertion() {
  const num_it = 10,
    time = 1;
  let it = 0;

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i],
      j = i - 1;

    while (j >= 0 && arr[j].value > key.value) {
      swapSync(j, j + 1);
      j--;

      it++;
      if (it < num_it) continue;
      it = 0;
      await sleep(time);
    }
  }
}

async function binaryInsertion() {
  const binarySearch = (item, low, high) => {
    if (high <= low) return item > arr[low].value ? low + 1 : low;

    let mid = (low + high) >> 1;

    if (item == arr[mid].value) return mid + 1;

    if (item > arr[mid].value) return binarySearch(item, mid + 1, high);
    return binarySearch(item, low, mid - 1);
  };

  const num_it = 10,
    time = 1;

  let it = 0;

  for (let i = 1; i < arr.length; ++i) {
    let j = i - 1,
      loc = binarySearch(arr[i].value, 0, j);

    while (j >= loc) {
      swapSync(j, j + 1);
      j--;

      it++;

      if (it < num_it) continue;

      it = 0;
      await sleep(time);
    }
  }
}

async function gnome() {
  const num_it = 10,
    time = 1;

  let index = 1,
    it = 0;

  while (index < arr.length) {
    if (index == 0) index++;
    if (arr[index].value >= arr[index - 1].value) index++;
    else swapSync(index, --index);

    it++;

    if (it < num_it) continue;

    it = 0;
    await sleep(time);
  }
}

async function optimizedGnome() {
  const num_it = 10,
    time = 1;

  let it = 0;

  const gnomeSort = async max => {
    let index = max;

    while (index > 0 && arr[index - 1].value > arr[index].value) {
      swapSync(index, --index);

      it++;

      if (it < num_it) continue;

      it = 0;
      await sleep(time);
    }
  };

  for (let i = 1; i < arr.length; i++) await gnomeSort(i);
}

async function oddEven() {
  const num_it = 10,
    time = 1;

  let isSorted = false,
    it = 0;

  while (!isSorted) {
    isSorted = true;

    for (let i = 1; i <= arr.length - 2; i += 2) {
      if (arr[i].value <= arr[i + 1].value) continue;

      swapSync(i, i + 1);
      isSorted = false;

      it++;
      if (it < num_it) continue;
      it = 0;
      await sleep(time);
    }

    for (let i = 0; i <= arr.length - 2; i += 2) {
      if (arr[i].value <= arr[i + 1].value) continue;

      swapSync(i, i + 1);
      isSorted = false;

      it++;

      if (it < num_it) continue;

      it = 0;
      await sleep(time);
    }
  }
}

async function comb() {
  const getNextGap = gap => {
    gap = Math.floor((gap * 10) / 13);
    return gap < 1 ? 1 : gap;
  };

  const num_it = 10,
    time = 1;

  let gap = arr.length,
    swapped = true,
    it = 0;

  while (gap != 1 || swapped) {
    gap = getNextGap(gap);
    swapped = false;

    for (let i = 0; i < arr.length - gap; i++) {
      if (arr[i].value > arr[i + gap].value) {
        swapSync(i, i + gap);
        swapped = true;

        it++;
        if (it < num_it) continue;
        it = 0;
        await sleep(time);
      }
    }
  }
}

async function shell() {
  const num_it = 10,
    time = 1;

  let it = 0;

  for (
    let gap = Math.floor(arr.length / 1);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let i = gap; i < arr.length; i++) {
      let temp = arr[i];

      for (let j = i; j >= gap && arr[j - gap].value > temp.value; j -= gap) {
        swapSync(j, j - gap);

        it++;

        if (it < num_it) continue;
        it = 0;

        await sleep(time);
      }
    }
  }
}

async function selection() {
  const time = 1;

  for (let i = 0; i < arr.length - 1; i++) {
    let min_idx = i;

    for (let j = i + 1; j < arr.length; j++)
      if (arr[j].value < arr[min_idx].value) min_idx = j;

    await swapAsync(min_idx, i, time);
  }
}

async function doubleSelection() {
  const time = 1;

  let start = 0,
    end = arr.length - 1;

  while (start <= end) {
    let smallIndex = start,
      largeIndex = end;

    for (let i = start + 1; i <= end; i++)
      if (arr[i].value < arr[smallIndex].value) smallIndex = i;

    if (smallIndex != start) await swapAsync(smallIndex, start, time);

    start++;

    for (let i = end - 1; i >= start; i--)
      if (arr[i].value > arr[largeIndex].value) largeIndex = i;

    if (largeIndex != end) await swapAsync(largeIndex, end, time);

    end--;
  }
}

async function heap() {
  const time = 1;

  const heapify = async (size, idx) => {
    let largest = idx,
      left = 2 * idx + 1,
      right = 2 * idx + 2;

    if (left < size && arr[left].value > arr[largest].value) largest = left;

    if (right < size && arr[right].value > arr[largest].value) largest = right;

    if (largest === idx) return;

    await swapAsync(idx, largest, time);
    await heapify(size, largest);
  };

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--)
    await heapify(arr.length, i);

  for (let i = arr.length - 1; i > 0; i--) {
    await swapAsync(0, i, time);
    await heapify(i, 0);
  }
}

async function merge() {
  const time = 1;

  const mergeArr = async (left, mid, right) => {
    let start2 = mid + 1,
      value,
      index;

    if (arr[mid].value <= arr[start2].value) return;

    while (left <= mid && start2 <= right) {
      if (arr[left].value <= arr[start2].value) {
        left++;
        continue;
      }

      value = arr[start2];
      index = start2;

      while (index > left) arr[index] = arr[--index];

      arr[left] = value;

      left++;
      mid++;
      start2++;

      await sleep(time);
    }
  };

  const sort = async (left, right) => {
    if (left >= right) return;

    let mid = Math.floor((right + left) / 2);

    await sort(left, mid);
    await sort(mid + 1, right);
    await mergeArr(left, mid, right);
  };

  await sort(0, arr.length - 1);
}

async function quick() {
  const time = 1;

  const partition = async (low, high) => {
    let pivot = arr[high].value,
      i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j].value > pivot) continue;

      i++;
      await swapAsync(i, j, time);
    }

    await swapAsync(i + 1, high, time);
    return i + 1;
  };

  const sort = async (low, high) => {
    if (low >= high) return;

    let pivot = await partition(low, high);
    await sort(low, pivot - 1);
    await sort(pivot + 1, high);
  };

  await sort(0, arr.length - 1);
}

async function intro() {
  const time = 0;

  const insertionSort = async (begin, end) => {
    for (let i = begin + 1; i <= end; i++) {
      let j = i - 1;

      while (j >= begin && arr[j].value > arr[j + 1].value) {
        await swapAsync(j, j + 1, time);
        j--;
      }
    }
  };

  const partition = async (low, high) => {
    const pivot = arr[high].value;

    let i = low - 1;

    for (let j = low; j <= high - 1; j++)
      if (arr[j].value <= pivot) await swapAsync(++i, j, time);

    swapAsync(i + 1, high, time);
    return i + 1;
  };

  const median = (a, b, c) => {
    const max = Math.max(a, b, c),
      min = Math.min(a, b, c);

    return a + b + c - min - max;
  };

  const heapify = async (idx, begin, size) => {
    const l = 2 * idx + 1,
      r = 2 * idx + 2;

    let largest = idx;

    if (l < size && arr[largest + begin].value < arr[l + begin].value)
      largest = l;

    if (r < size && arr[largest + begin].value < arr[r + begin].value)
      largest = r;

    if (largest === idx) return;

    await swapAsync(idx + begin, largest + begin, time);
    await heapify(largest, begin, size);
  };

  const sort = async (begin, end, depthLimit) => {
    const size = end - begin + 1;

    if (size < 16) return await insertionSort(begin, end);

    if (depthLimit <= 0) {
      for (let i = Math.floor(size / 2) - 1; i >= 0; i--)
        await heapify(i, begin, size);

      for (let i = end; i > begin; i--) {
        await swapAsync(i, begin, time);
        await heapify(0, begin, i - begin);
      }

      return;
    }

    const mid = begin + Math.floor(size / 2);
    let pivot = median(begin, mid, end);

    await swapAsync(pivot, end, time);

    pivot = await partition(begin, end);

    depthLimit--;

    await sort(begin, pivot - 1, depthLimit);
    await sort(pivot + 1, end, depthLimit);
  };

  await sort(0, arr.length - 1, 2 * Math.floor(Math.log(arr.length)));
}
