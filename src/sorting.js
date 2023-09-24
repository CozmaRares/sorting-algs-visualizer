import { config, swapSync, swapAsync, sleep } from "./utils.js";

async function bubble(arr, greater) {
    let changed = true;
    do {
        for (let it = 0; it < config.iterationsPerFrame && changed; it++) {
            changed = false;

            for (let i = 1; i < arr.length; i++)
                if (greater(arr[i - 1], arr[i])) {
                    swapSync(arr, i - 1, i);
                    changed = true;
                }
        }
        await sleep();
    } while (changed);
}

async function cocktail(arr, greater) {
    let swapped = true,
        start = 0,
        end = arr.length - 1;

    while (swapped) {
        for (let it = 0; it < config.iterationsPerFrame && swapped; it++) {
            swapped = false;

            for (let i = start; i < end; ++i) {
                if (greater(arr[i], arr[i + 1])) {
                    swapSync(arr, i, i + 1);
                    swapped = true;
                }
            }

            if (!swapped) break;

            swapped = false;
            --end;

            for (let i = end - 1; i >= start; --i) {
                if (greater(arr[i], arr[i + 1])) {
                    swapSync(arr, i, i + 1);
                    swapped = true;
                }
            }

            ++start;
        }
        await sleep();
    }
}

async function insertion(arr, greater) {
    let it = 0;

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i],
            j = i - 1;

        while (j >= 0 && greater(arr[j], key)) {
            swapSync(arr, j, j + 1);
            j--;

            it++;
            if (it < config.iterationsPerFrame) continue;
            it = 0;
            await sleep();
        }
    }
}

async function gnome(arr, greater) {
    let index = 1,
        it = 0;

    while (index < arr.length) {
        if (index == 0) index++;
        if (!greater(arr[index - 1], arr[index])) index++;
        else swapSync(arr, index, --index);

        it++;

        if (it < config.iterationsPerFrame) continue;

        it = 0;
        await sleep();
    }
}

async function optimizedGnome(arr, greater) {
    let it = 0;

    const gnomeSort = async (max) => {
        let index = max;

        while (index > 0 && greater(arr[index - 1], arr[index])) {
            swapSync(arr, index, --index);

            it++;

            if (it < config.iterationsPerFrame) continue;

            it = 0;
            await sleep();
        }
    };

    for (let i = 1; i < arr.length; i++) await gnomeSort(i);
}

async function oddEven(arr, greater) {
    let isSorted = false,
        it = 0;

    while (!isSorted) {
        isSorted = true;

        for (let i = 1; i <= arr.length - 2; i += 2) {
            if (!greater(arr[i], arr[i + 1])) continue;

            swapSync(arr, i, i + 1);
            isSorted = false;

            it++;
            if (it < config.iterationsPerFrame) continue;
            it = 0;
            await sleep();
        }

        for (let i = 0; i <= arr.length - 2; i += 2) {
            if (!greater(arr[i], arr[i + 1])) continue;

            swapSync(arr, i, i + 1);
            isSorted = false;

            it++;
            if (it < config.iterationsPerFrame) continue;
            it = 0;
            await sleep();
        }
    }
}

async function comb(arr, greater) {
    const getNextGap = (gap) => {
        gap = Math.floor((gap * 10) / 13);
        return gap < 1 ? 1 : gap;
    };

    let gap = arr.length,
        swapped = true,
        it = 0;

    while (gap != 1 || swapped) {
        gap = getNextGap(gap);
        swapped = false;

        for (let i = 0; i < arr.length - gap; i++) {
            if (greater(arr[i], arr[i + gap])) {
                swapSync(arr, i, i + gap);
                swapped = true;

                it++;
                if (it < config.iterationsPerFrame) continue;
                it = 0;
                await sleep();
            }
        }
    }
}

async function shell(arr, greater) {
    let it = 0;

    for (
        let gap = Math.floor(arr.length / 1);
        gap > 0;
        gap = Math.floor(gap / 2)
    ) {
        for (let i = gap; i < arr.length; i++) {
            let temp = arr[i];

            for (let j = i; j >= gap && greater(arr[j - gap], temp); j -= gap) {
                swapSync(arr, j, j - gap);

                it++;

                if (it < config.iterationsPerFrame) continue;
                it = 0;

                await sleep();
            }
        }
    }
}

async function selection(arr, greater) {
    for (let i = 0; i < arr.length - 1; i++) {
        let min_idx = i;

        for (let j = i + 1; j < arr.length; j++)
            if (greater(arr[min_idx], arr[j])) min_idx = j;

        await swapAsync(arr, min_idx, i);
    }
}

async function doubleSelection(arr, greater) {
    let start = 0,
        end = arr.length - 1;

    while (start <= end) {
        let smallIndex = start,
            largeIndex = end;

        for (let i = start + 1; i <= end; i++)
            if (greater(arr[smallIndex], arr[i])) smallIndex = i;

        if (smallIndex != start) await swapAsync(arr, smallIndex, start);

        start++;

        for (let i = end - 1; i >= start; i--)
            if (greater(arr[i], arr[largeIndex])) largeIndex = i;

        if (largeIndex != end) await swapAsync(arr, largeIndex, end);

        end--;
    }
}

async function heap(arr, greater) {
    const heapify = async (size, idx) => {
        let largest = idx,
            left = 2 * idx + 1,
            right = 2 * idx + 2;

        if (left < size && greater(arr[left], arr[largest])) largest = left;
        if (right < size && greater(arr[right], arr[largest])) largest = right;
        if (largest === idx) return;

        await swapAsync(arr, idx, largest);
        await heapify(size, largest);
    };

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--)
        await heapify(arr.length, i);

    for (let i = arr.length - 1; i > 0; i--) {
        await swapAsync(arr, 0, i);
        await heapify(i, 0);
    }
}

async function merge(arr, greater) {
    const mergeArr = async (left, mid, right) => {
        let start2 = mid + 1,
            value,
            index;

        if (!greater(arr[mid], arr[start2])) return;

        while (left <= mid && start2 <= right) {
            if (!greater(arr[left], arr[start2])) {
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

            await sleep();
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

async function quick(arr, greater) {
    const partition = async (low, high) => {
        let pivot = arr[high],
            i = low - 1;

        for (let j = low; j < high; j++) {
            if (greater(arr[j], pivot)) continue;

            i++;
            await swapAsync(arr, i, j);
        }

        await swapAsync(arr, i + 1, high);
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

async function intro(arr, greater) {
    const insertionSort = async (begin, end) => {
        for (let i = begin + 1; i <= end; i++) {
            let j = i - 1;

            while (j >= begin && greater(arr[j], arr[j + 1])) {
                await swapAsync(arr, j, j + 1);
                j--;
            }
        }
    };

    const partition = async (low, high) => {
        const pivot = arr[high];

        let i = low - 1;

        for (let j = low; j <= high - 1; j++)
            if (!greater(arr[j], pivot)) await swapAsync(arr, ++i, j);

        swapAsync(arr, i + 1, high);
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

        if (l < size && greater(arr[l + begin], arr[largest + begin])) largest = l;
        if (r < size && greater(arr[largest + begin], arr[r + begin])) largest = r;
        if (largest === idx) return;

        await swapAsync(arr, idx + begin, largest + begin);
        await heapify(largest, begin, size);
    };

    const sort = async (begin, end, depthLimit) => {
        const size = end - begin + 1;

        if (size < 16) return await insertionSort(begin, end);

        if (depthLimit <= 0) {
            for (let i = Math.floor(size / 2) - 1; i >= 0; i--)
                await heapify(i, begin, size);

            for (let i = end; i > begin; i--) {
                await swapAsync(arr, i, begin);
                await heapify(0, begin, i - begin);
            }

            return;
        }

        const mid = begin + Math.floor(size / 2);
        let pivot = median(begin, mid, end);
        await swapAsync(arr, pivot, end);

        pivot = await partition(begin, end);

        depthLimit--;

        await sort(begin, pivot - 1, depthLimit);
        await sort(pivot + 1, end, depthLimit);
    };

    await sort(0, arr.length - 1, 2 * Math.floor(Math.log(arr.length)));
}

const sortingAlgorithms = {
    bubble: { name: "Bubble Sort", func: bubble },
    cocktail: { name: "Cocktail Shaker Sort", func: cocktail },
    insertion: { name: "Insertion Sort", func: insertion },
    gnome: { name: "Gnome Sort", func: gnome },
    optimizedGnome: { name: "Optimized Gnome Sort", func: optimizedGnome },
    oddEven: { name: "Odd/Even Sort", func: oddEven },
    comb: { name: "Comb Sort", func: comb },
    shell: { name: "Shell Sort", func: shell },
    selection: { name: "Selection Sort", func: selection },
    doubleSelection: { name: "Double Selection Sort", func: doubleSelection },
    heap: { name: "Heap Sort", func: heap },
    merge: { name: "In-place Merge Sort", func: merge },
    quick: { name: "Quick Sort", func: quick },
    intro: { name: "Intro Sort", func: intro },
};

export default sortingAlgorithms;
