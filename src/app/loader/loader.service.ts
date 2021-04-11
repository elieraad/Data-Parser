import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public httpLoading$ = new ReplaySubject<boolean>(1);
    public percentageLoading$ = new ReplaySubject<number>(0);
    constructor() { }

    httpProgress(): Observable<boolean> {
        return this.httpLoading$.asObservable();
    }

    setHttpProgressStatus(inprogress: boolean) {
        this.httpLoading$.next(inprogress);
    }

    percentageProgress(): Observable<number> {
        return this.percentageLoading$.asObservable();
    }

    setPercentageProgress(percentage: number) {
        this.percentageLoading$.next(percentage);
    }
}
