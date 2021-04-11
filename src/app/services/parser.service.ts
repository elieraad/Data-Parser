import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ParserService {

    constructor(private http: HttpClient) {
    }

    getDraw(drawNum: number): Observable<any> {
        return this.http.get('https://www.lldj.com/en/LatestResults/Loto', {
            params: { draw: drawNum.toString() },
            responseType: "text"
        });
    }

    getLatestResults(): Observable<any> {
        return this.http.get('https://www.lldj.com/en/LatestResults', {
            responseType: "text"
        });
    }

    public parseResult(parsedHtml: Document): number[] {
        let elements = parsedHtml.getElementsByClassName("ball big");
        let result: number[] = [];
        for (let i = 0; i < elements.length; i++) {
            result.push(parseInt(elements[i].innerHTML));
        }
        return result;
    }
}
