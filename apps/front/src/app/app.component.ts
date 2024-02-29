import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-online-diary';

  isAuth: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if(this.router.url.includes('auth')){
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }
    });


  }

}
