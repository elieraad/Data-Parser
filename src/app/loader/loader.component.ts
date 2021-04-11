import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input('loading')
  loading: boolean = false;

  @Input('percentage')
  percentage: number = 0;

  constructor(private loaderService: LoaderService) {
    this.loaderService.httpLoading$.subscribe((v) => this.loading = v);
    this.loaderService.percentageLoading$.subscribe((v) => this.percentage = v);
  }

  ngOnInit(): void {
  }

}
