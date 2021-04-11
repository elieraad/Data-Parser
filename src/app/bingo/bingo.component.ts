import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Pair } from '../models/pair';
import { BingoService } from './bingo.service';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.scss']
})
export class BingoComponent {

  @Input() set value(val: number) {
    const pair = this.bingoService.scratch(val);
    let won = this.bingoService.win(pair);
    if (won) {
      this.openDialog(won);
    } else if (this.bingoService.tries == 0) {
      this.openDialog(won);
    }
  }

  openDialog(won: boolean) {
    this.dialog.open(DialogComponent, {
      data: {
        won: won
      }
    }).afterClosed().subscribe(() => this.bingoService.initBingo());
  }

  constructor(public dialog: MatDialog, public bingoService: BingoService) {

  }
}


