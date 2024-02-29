import { Component, OnInit } from '@angular/core';
import {QuotesService} from "../../services/quotes/quotes.service";
import {Quote} from "../../models/quote.model";
import {ConfigService} from "../../services/config/config.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  showQuote: boolean = true;
  qod!: Quote;
  loading = false;

  constructor(private quoteService: QuotesService, private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.getActualConfig().subscribe(config => {
      if(config){
        this.showQuote = config.quote;
        if(this.showQuote){
          this.getQod();
        }
      }
    });
  }

  getQod(){
    if(this.quoteService.qod){
      this.qod = this.quoteService.qod;
    }else{
      this.loading = true;
      this.quoteService.getQuote().subscribe(async resp => {
        if (resp.ok) {
          this.qod = resp.content;
        }
      }).add(() => this.loading = false);
    }
  }

}
