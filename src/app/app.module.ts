import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ParserService } from './services/parser.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { LoaderInterceptor } from './loader/loader.interceptor';
import { StatisticsService } from './services/statistics.service';
import { ChartsModule } from 'ng2-charts';
import { SpinningNumberComponent } from './spinning-number/spinning-number.component';
import { BingoComponent } from './bingo/bingo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BingoService } from './bingo/bingo.service';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    SpinningNumberComponent,
    BingoComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [ParserService, LoaderService, StatisticsService, BingoService, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
