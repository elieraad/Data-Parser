import { Injectable } from '@angular/core';
import { Pair } from '../models/pair';

@Injectable({
    providedIn: 'root'
})
export class BingoService {
    bingo: number[][];
    covers: boolean[][];
    scratched: number = 0;
    tries: number = 15;
    values: number[];

    constructor() {
        this.bingo = [];
        this.covers = [];
        this.values = [];
        this.initBingo();
    }

    initBingo(): void {
        this.tries = 15;
        this.bingo = [];
        this.covers = [];
        this.values = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => (Math.random() > .5) ? 1 : -1);
        let bingoValues = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => (Math.random() > .5) ? 1 : -1);
        let coverValues: boolean[] = new Array(25).fill(false);
        while (bingoValues.length) {
            this.bingo.push(bingoValues.splice(0, 5));
            this.covers.push(coverValues.splice(0, 5));
        }
    }

    public scratch(value: number): Pair {
        let pair: Pair = new Pair(0, 0);
        for (let i = 0; i < this.bingo.length; i++) {
            let idx = this.bingo[i].findIndex(x => x == value)
            if (idx != -1) {
                this.covers[i][idx] = true;
                return new Pair(i, idx);
            }
        }
        return pair;
    }

    public win(pair: Pair): boolean {
        if ((this.covers[pair.item1].find(covered => !covered) == undefined)
            || (this.covers.map(x => x[pair.item2]).find(covered => !covered) == undefined)
            || (pair.item1 == pair.item2 && this.checkBackSlash())
            || (pair.item1 + pair.item2 + 1 == this.bingo.length && this.checkForwardSlash())) return true;

        return false;
    }

    public checkBackSlash(): boolean {
        for (let i = 0; i < this.bingo.length; i++) {
            if (!this.covers[i][i]) return false;
        }
        return true;
    }

    public checkForwardSlash(): boolean {
        let j = this.bingo.length;
        for (let i = 0; i < this.bingo.length; i++) {
            if (!this.covers[i][--j]) return false;
        }
        return true;
    }

}