import { Component } from '@angular/core';
import { ParserService } from './services/parser.service';
import { StatisticsService } from './services/statistics.service';
import { LoaderService } from './loader/loader.service';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Pair } from './models/pair';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  domParser: DOMParser;
  latestDrawNum: number;
  earliestDrawNum: number;
  results: number[][];
  freq: number[];

  topKFrequent: number[];
  leastKFrequent: number[];

  barChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: { data: number[]; label: string; }[];
  frequentPairs: Map<Pair, number>;

  bingoValue: number;
  drawForm: FormGroup;
  inprogress: boolean;

  constructor(private parserService: ParserService, private statisticsService: StatisticsService, private loaderService: LoaderService) {
    this.domParser = new DOMParser();
    this.latestDrawNum = 0;
    this.earliestDrawNum = 0;
    this.results = [];
    this.freq = [];

    this.topKFrequent = [];
    this.leastKFrequent = [];

    this.barChartData = [];
    this.barChartLabels = [];

    this.frequentPairs = new Map<Pair, number>();
    this.bingoValue = 0;

    let drawFormArray = new FormArray([]);
    for (let i = 0; i < 6; i++)drawFormArray.push(new FormControl('', Validators.required));

    this.drawForm = new FormGroup({
      draw: drawFormArray
    });

    this.inprogress = false;
    this.loaderService.httpLoading$.subscribe(inprogress => {
      this.inprogress = inprogress;
      if (!inprogress) {
        this.freq = this.statisticsService.countFrequency(this.results);
        this.topKFrequent = this.statisticsService.topKFrequent(this.freq, 6);
        this.leastKFrequent = this.statisticsService.leastKFrequent(this.freq, 6);
        this.frequentPairs = this.statisticsService.frequentPairs(this.results, this.topKFrequent, 3);
        this.barChartLabels = Array.from({ length: 42 }, (_, i) => `${i + 1}`);
        this.barChartData = [{ data: this.freq, label: 'Times Occurred' }];
      }
    });

    this.parserService.getLatestResults().subscribe(htmlContent => {
      let parsedHtml = this.domParser.parseFromString(htmlContent, 'text/html');
      let value = parsedHtml.getElementById("resultdateinput")?.attributes.getNamedItem("value")?.value;
      if (value != undefined) {
        this.latestDrawNum = parseInt(value);
        this.earliestDrawNum = this.latestDrawNum - 99;
      }
      this.results.push(this.parserService.parseResult(parsedHtml));
      for (let i = this.latestDrawNum; i >= this.earliestDrawNum; i--) this.getDraw(i);
    });
  }

  private getDraw(i: number) {
    this.parserService.getDraw(i).subscribe(htmlContent => {
      let parsedHtml = this.domParser.parseFromString(htmlContent, 'text/html');
      this.results.push(this.parserService.parseResult(parsedHtml));
    });
  }

  public valueChangedHandler(value: number) {
    this.bingoValue = value;
  }

  public checkJackpot() {
    let numbers: number[] = [];

    let empty = false;
    let duplicate = false;
    let outOfRange = false;

    for (let i = 0; i < this.draw.controls.length; i++) {
      const val: string = this.draw.controls[i].value;
      let currentEmpty = (val == "" || val == undefined);
      empty ||= currentEmpty;
      if (!currentEmpty) {
        let int = parseInt(val);
        let currentOutOfRange = int < 1 || int > 42;
        outOfRange ||= currentOutOfRange;
        if (!currentOutOfRange) {
          if (numbers.includes(int)) duplicate = true;
          else numbers.push(int);
        }
      }
    }

    let element: Element = document.getElementsByClassName("error-msg")[0];
    element.innerHTML = "";
    let invalid = empty || duplicate || outOfRange;
    if (invalid) {
      element.innerHTML += "<ul>"
      if (empty) element.innerHTML += "<li>All fields are required</li>";
      if (duplicate) element.innerHTML += "<li>Values cannot contain duplicates</li>";
      if (outOfRange) element.innerHTML += "<li>All values are strictly between 1 and 42</li>";
      element.innerHTML += "</ul>"
    } else {
      let element: Element = document.getElementsByClassName("number-description")[0];
      let draw = this.statisticsService.winner(this.results, numbers);
      if (draw != -1) {
        element.innerHTML = `Congrats you are the winner of Draw #${this.latestDrawNum - draw + 1}`;
      } else {
        element.innerHTML = `Hard Luck, try again different numbers`;
      }
    }
  }


  get draw() {
    return this.drawForm.get("draw") as FormArray;
  }
}

