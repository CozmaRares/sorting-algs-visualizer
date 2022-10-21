class Element {
    constructor(value, idx) {
        this.value = value;
        this.r = this.g = this.b = 0;

        let colors = [
            // from left to right
            { r: 102, g: 0, b: 51 },
            { r: 204, g: 0, b: 153 },
            { r: 0, g: 0, b: 255 },
            { r: 0, g: 255, b: 0 },
            { r: 255, g: 255, b: 0 },
            { r: 255, g: 71, b: 26 },
            { r: 255, g: 0, b: 0 },
        ];

        let group_length = width / (colors.length - 1),
            group_idx;

        for (let i = colors.length - 2; i >= 0; i--) {
            group_idx = group_length * i;
            if (idx < group_idx) continue;

            this.r = map(idx, group_idx, group_idx + group_length, colors[i].r, colors[i + 1].r);
            this.g = map(idx, group_idx, group_idx + group_length, colors[i].g, colors[i + 1].g);
            this.b = map(idx, group_idx, group_idx + group_length, colors[i].b, colors[i + 1].b);
            break;
        }
    }
}

function get_num_iterations() {
    let val = parseInt(document.getElementById("skip").value);

    if (isNaN(val)) document.getElementById("skip").value = val = 1;

    return val;
}

function get_time() {
    let time = parseInt(document.getElementById("time").value);

    if (isNaN(time)) document.getElementById("time").value = time = 10;

    return time;
}

function get_concurrency() {
    return document.getElementById("concurrent").checked;
}

function get_data_slow_algs() {
    return [get_time(), get_num_iterations()];
}

function get_data_fast_algs() {
    return get_time();
}

function get_data_divide_et_impera() {
    return [get_time(), get_concurrency()];
}

async function bubble_sort() {
    let changed, i, it, num_it, time;
    changed = true;
    [time, num_it] = get_data_slow_algs();

    do {
        for (it = 0; it < num_it && changed; it++) {
            changed = false;

            for (i = 1; i < arr.length; i++)
                if (arr[i - 1].value > arr[i].value) {
                    swap_sync(i - 1, i);
                    changed = true;
                }
        }
        await sleep(time);
    } while (changed);
}

async function cocktail_sort() {
    let swapped = true,
        start = 0,
        end = arr.length - 1,
        i,
        it,
        num_it,
        time;
    [time, num_it] = get_data_slow_algs();

    while (swapped) {
        for (it = 0; it < num_it && swapped; it++) {
            swapped = false;

            for (i = start; i < end; ++i) {
                if (arr[i].value > arr[i + 1].value) {
                    swap_sync(i, i + 1);
                    swapped = true;
                }
            }

            if (!swapped) break;

            swapped = false;

            --end;

            for (i = end - 1; i >= start; --i) {
                if (arr[i].value > arr[i + 1].value) {
                    swap_sync(i, i + 1);
                    swapped = true;
                }
            }

            ++start;
        }
        await sleep(time);
    }
}

async function insertion_sort() {
    let i, j, key, it, num_it, time;
    it = 0;
    [time, num_it] = get_data_slow_algs();

    for (i = 1; i < arr.length; i++) {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j].value > key.value) {
            swap_sync(j, j + 1);
            j--;

            it++;
            if (it < num_it) continue;
            it = 0;
            await sleep(time);
        }
    }
}

async function binary_insertion_sort() {
    const binarySearch = (item, low, high) => {
        if (high <= low) return item > arr[low].value ? low + 1 : low;

        let mid = (low + high) >> 1;

        if (item == arr[mid].value) return mid + 1;

        if (item > arr[mid].value) return binarySearch(item, mid + 1, high);
        return binarySearch(item, low, mid - 1);
    };

    let loc, i, j, it, num_it, time;
    it = 0;
    [time, num_it] = get_data_slow_algs();

    for (i = 1; i < arr.length; ++i) {
        j = i - 1;

        loc = binarySearch(arr[i].value, 0, j);

        while (j >= loc) {
            swap_sync(j, j + 1);
            j--;

            it++;
            if (it < num_it) continue;
            it = 0;
            await sleep(time);
        }
    }
}

async function gnome_sort() {
    let index = 1,
        it = 0,
        num_it,
        time;
    [time, num_it] = get_data_slow_algs();

    while (index < arr.length) {
        if (index == 0) index++;
        if (arr[index].value >= arr[index - 1].value) index++;
        else swap_sync(index, --index);

        it++;
        if (it < num_it) continue;
        it = 0;
        await sleep(time);
    }
}

async function optimized_gnome_sort() {
    let i, it, num_it, time;
    [time, num_it] = get_data_slow_algs();

    const gnomeSort = async (max) => {
        let index = max;

        while (index > 0 && arr[index - 1].value > arr[index].value) {
            swap_sync(index, --index);

            it++;
            if (it < num_it) continue;
            it = 0;
            await sleep(time);
        }
    };

    for (i = 1; i < arr.length; i++) await gnomeSort(i);
}

async function odd_even_sort() {
    let isSorted, i, j, it, num_it, time;
    isSorted = false;
    it = 0;
    [time, num_it] = get_data_slow_algs();

    while (!isSorted) {
        isSorted = true;

        for (i = 1; i <= arr.length - 2; i = i + 2) {
            if (arr[i].value <= arr[i + 1].value) continue;

            swap_sync(i, i + 1);
            isSorted = false;

            it++;
            if (it < num_it) continue;
            it = 0;
            await sleep(time);
        }

        for (j = 0; j <= arr.length - 2; j = j + 2) {
            if (arr[j].value <= arr[j + 1].value) continue;

            swap_sync(j, j + 1);
            isSorted = false;

            it++;
            if (it < num_it) continue;
            it = 0;
            await sleep(time);
        }
    }
}

async function comb_sort() {
    const getNextGap = (gap) => {
        gap = Math.floor((gap * 10) / 13);
        return gap < 1 ? 1 : gap;
    };

    let gap = arr.length,
        swapped = true,
        i,
        it = 0,
        num_it,
        time;

    [time, num_it] = get_data_slow_algs();

    while (gap != 1 || swapped) {
        gap = getNextGap(gap);
        swapped = false;

        for (i = 0; i < arr.length - gap; i++) {
            if (arr[i].value > arr[i + gap].value) {
                swap_sync(i, i + gap);
                swapped = true;

                it++;
                if (it < num_it) continue;
                it = 0;
                await sleep(time);
            }
        }
    }
}

async function shell_sort() {
    let gap, i, j, temp, it, num_it, time;
    [time, num_it] = get_data_slow_algs();

    for (gap = arr.length >> 1; gap > 0; gap >>= 1) {
        for (i = gap; i < arr.length; i++) {
            temp = arr[i];

            for (j = i; j >= gap && arr[j - gap].value > temp.value; j -= gap) {
                swap_sync(j, j - gap);

                it++;
                if (it < num_it) continue;
                it = 0;
                await sleep(time);
            }
        }
    }
}

async function selection_sort() {
    let i, j, min_idx, time;
    time = get_data_fast_algs();

    for (i = 0; i < arr.length - 1; i++) {
        min_idx = i;

        for (j = i + 1; j < arr.length; j++) if (arr[j].value < arr[min_idx].value) min_idx = j;

        await swap_async(min_idx, i, time);
    }
}

async function double_selection_sort() {
    let smallIndex,
        largeIndex,
        start = 0,
        end = arr.length - 1,
        i,
        time = get_data_fast_algs();

    while (start <= end) {
        smallIndex = start;
        largeIndex = end;

        for (i = start + 1; i <= end; i++) if (arr[i].value < arr[smallIndex].value) smallIndex = i;

        if (smallIndex != start) await swap_async(smallIndex, start, time);

        start++;

        for (i = end - 1; i >= start; i--) if (arr[i].value > arr[largeIndex].value) largeIndex = i;

        if (largeIndex != end) await swap_async(largeIndex, end, time);

        end--;
    }
}

async function heap_sort() {
    let time = get_data_fast_algs();

    const heapify = async (size_of_heap, node) => {
        let largest = node,
            l = 2 * node + 1,
            r = 2 * node + 2;

        if (l < size_of_heap && arr[l].value > arr[largest].value) largest = l;

        if (r < size_of_heap && arr[r].value > arr[largest].value) largest = r;

        if (largest == node) return;

        await swap_async(node, largest, time);
        await heapify(size_of_heap, largest);
    };

    const sort = async () => {
        for (let i = (arr.length >> 1) - 1; i >= 0; i--) await heapify(arr.length, i);

        for (let i = arr.length - 1; i >= 0; i--) {
            await swap_async(0, i, time);
            await heapify(i, 0);
        }
    };

    await sort();
}

async function merge_sort() {
    let time, concurrent;
    [time, concurrent] = get_data_divide_et_impera();

    const merge = async (start, mid, end) => {
        let start2 = mid + 1,
            value,
            index;

        if (arr[mid].value <= arr[start2].value) return;

        while (start <= mid && start2 <= end) {
            if (arr[start].value <= arr[start2].value) {
                start++;
                continue;
            }

            value = arr[start2];
            index = start2;

            while (index > start) arr[index] = arr[--index];

            arr[start] = value;

            start++;
            mid++;
            start2++;

            await sleep(time);
        }
    };

    const recursive_call = concurrent
        ? async (l, m, r) => {
              await Promise.all([sort(l, m), sort(m + 1, r)]);
          }
        : async (l, m, r) => {
              await sort(l, m);
              await sort(m + 1, r);
          };

    const sort = async (l, r) => {
        if (l >= r) return;

        let m = (r + l) >> 1;

        await recursive_call(l, m, r);
        await merge(l, m, r);
    };

    await sort(0, arr.length - 1);
}

async function quick_sort() {
    let time, concurrent;
    [time, concurrent] = get_data_divide_et_impera();

    const partition = async (low, high) => {
        let pivot = arr[high].value,
            i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j].value > pivot) continue;

            i++;
            await swap_async(i, j, time);
        }

        await swap_async(i + 1, high, time);
        return i + 1;
    };

    const recursive_call = concurrent
        ? async (low, pi, high) => {
              await Promise.all([sort(low, pi - 1), sort(pi + 1, high)]);
          }
        : async (low, pi, high) => {
              await sort(low, pi - 1);
              await sort(pi + 1, high);
          };

    const sort = async (low, high) => {
        if (low >= high) return;

        let pi = await partition(low, high);
        await recursive_call(low, pi, high);
    };

    await sort(0, arr.length - 1);
}

async function intro_sort() {
    let time, concurrent;
    [time, concurrent] = get_data_divide_et_impera();

    const max_heap = async (i, heapN, begin) => {
        let temp = arr[begin + i - 1].value,
            child;

        while (i <= heapN / 2) {
            child = 2 * i;

            if (child < heapN && arr[begin + child - 1].value < arr[begin + child].value) child++;

            if (temp >= arr[begin + child - 1].value) break;

            await swap_async(begin + i - 1, begin + child - 1, time);
            i = child;
        }
    };

    const heapify = async (begin, heapN) => {
        for (let i = heapN >> 1; i >= 1; i--) max_heap(i, heapN, begin);
    };

    const heap_sort_ = async (begin, end) => {
        let heapN = end - begin;

        heapify(begin, heapN);

        for (let i = heapN; i >= 1; i--) {
            await swap_async(begin, begin + i, time);
            await max_heap(1, i, begin);
        }
    };

    const insertion_sort_ = async (left, right) => {
        let key, i, j;
        for (i = left; i <= right; i++) {
            key = arr[i].value;
            j = i;

            while (j > left && arr[j - 1].value > key) {
                await swap_async(j, j - 1, time);
                j--;
            }
        }
    };

    const median = (a, b, c) => {
        let max = Math.max(a, Math.max(b, c)),
            min = Math.min(a, Math.min(b, c));

        return a + b + c - max - min;
    };

    const pivot = (a, b, c) => {
        let m = median(arr[a].value, arr[b].value, arr[c].value);

        if (m == arr[a].val) return a;

        if (m == arr[b].val) return b;

        return c;
    };

    const partition = async (low, high) => {
        let pivot = arr[high].value,
            i = low - 1,
            j;

        for (j = low; j <= high - 1; j++) if (arr[j].value <= pivot) await swap_async(++i, j, time);

        await swap_async(++i, high, time);
        return i;
    };

    const recursive_call = concurrent
        ? async (begin, p, end, depth_limit) => {
              await Promise.all([sort(begin, p - 1, depth_limit), sort(p + 1, end, depth_limit)]);
          }
        : async (begin, p, end, depth_limit) => {
              await sort(begin, p - 1, depth_limit);
              await sort(p + 1, end, depth_limit);
          };

    const sort = async (begin, end, depth_limit) => {
        if (end - begin < 16) {
            await insertion_sort_(begin, end);
            return;
        }

        if (depth_limit == 0) {
            await heap_sort_(begin, end);
            return;
        }

        depth_limit--;
        let piv = pivot(begin, ((end + begin) >> 1) + 1, end);
        await swap_async(piv, end);

        let p = await partition(begin, end);

        await recursive_call(begin, p, end, depth_limit);

        let t;

        // there are some cases when it doesn't sort properly
        // and due to my lack of understanding, I've had to resort to this type of measure
        for (piv = begin; piv < end; piv++)
            for (p = piv + 1; p <= end; p++) {
                if (arr[piv].value <= arr[p].value) continue;

                t = arr[piv];
                arr[piv] = arr[p];
                arr[p] = t;
            }
    };

    await sort(0, arr.length - 1, 2 * Math.floor(Math.log(arr.length)));
}
