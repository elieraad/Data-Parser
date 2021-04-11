import { Component, EventEmitter, Output } from '@angular/core';
import { retryWhen } from 'rxjs/operators';
import { BingoService } from '../bingo/bingo.service';

@Component({
  selector: 'app-spinning-number',
  templateUrl: './spinning-number.component.html',
  styleUrls: ['./spinning-number.component.scss']
})
export class SpinningNumberComponent {

  value: number;
  @Output() valueChanged: EventEmitter<number> = new EventEmitter()

  constructor(public bingoService: BingoService) {
    this.value = 0;
  }

  public chooseValue() {
    this.bingoService.values.sort(() => (Math.random() > .5) ? 1 : -1);
    this.bingoService.tries--;
    this.animateValue(0);
  }

  public animateValue(curr: number) {
    this.value = this.bingoService.values[curr];
    if (curr < this.bingoService.values.length - 1) window.requestAnimationFrame(() => this.animateValue(curr + 1));
    else if (curr == this.bingoService.values.length - 1) this.valueChanged.emit(this.bingoService.values.pop());
  }
}
