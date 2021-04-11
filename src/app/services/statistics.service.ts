import { Injectable } from '@angular/core';
import { Pair } from '../models/pair';


@Injectable({
    providedIn: 'root',
})
export class StatisticsService {

    countFrequency(result: number[][]): number[] {
        let frequency = new Array(42);
        frequency.fill(0);
        for (let draw = 0; draw < result.length; draw++) {
            for (let ball = 0; ball < result[draw].length; ball++) {
                frequency[result[draw][ball] - 1]++;
            }
        }
        return frequency;
    }

    public topKFrequent(nums: number[], k: number) {
        const hashToArray = Object.entries(nums)
        const sortedArray = hashToArray.sort((a, b) => b[1] - a[1])
        const sortedElements = sortedArray.map(num => parseInt(num[0]) + 1)
        return sortedElements.slice(0, k)
    }

    public leastKFrequent(nums: number[], k: number) {
        const hashToArray = Object.entries(nums)
        const sortedArray = hashToArray.sort((a, b) => a[1] - b[1])
        const sortedElements = sortedArray.map(num => parseInt(num[0]) + 1)
        return sortedElements.slice(0, k)
    }

    public frequentPairs(nums: number[][], topK: number[], n: number) {
        const sortedArray = topK.sort((a, b) => a - b);

        let hash = new Map<Pair, number>();
        for (let i = 0; i < sortedArray.length - 1; i++) {
            for (let j = i + 1; j < sortedArray.length; j++) {
                const p = new Pair(sortedArray[i], sortedArray[j]);
                let freq = 0;
                for (let row = 0; row < nums.length; row++) {
                    if (nums[row].includes(p.item1) && nums[row].includes(p.item2)) freq++;
                }
                hash.set(p, freq);
            }
        }

        return new Map([...hash].sort(([k1, v1], [k2, v2]) => v2 - v1).slice(0, n));
    }

    public winner(result: number[][], numbers: number[]): number {
        const sortedArray = numbers.sort((a, b) => a - b);
        for (let i = 0; i < result.length; i++) if (this.equals(result[i], sortedArray)) return i + 1;
        return -1;
    }

    private equals(draw: number[], numbers: number[]) {
        for (let i = 0; i < 6; i++) if (draw[i] != numbers[i]) return false;
        return true;
    }
}
