import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Quote, QuotesResponse} from "../../models/quote.model";
import {asyncScheduler, catchError, map, scheduled} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  qod!: Quote;

  constructor(private http: HttpClient) {
  }

  getQuote(){
    const url = './assets/quotes.json';

    return this.http.get<QuotesResponse>(url)
      .pipe(
        map(({quotes}) => {
          const random = Math.floor(Math.random() * quotes.length);
          return {
            ok: true,
            content: quotes[random]
          };
        }),
        catchError(err =>  scheduled([{ok:false, content: err.error.msg}], asyncScheduler))
      );
  }
}
