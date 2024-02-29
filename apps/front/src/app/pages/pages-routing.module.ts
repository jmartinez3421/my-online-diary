import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {TodayPageComponent} from "./today-page/today-page.component";
import {CalendarPageComponent} from "./calendar-page/calendar-page.component";
import {SearchPageComponent} from "./search-page/search-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'today', component: TodayPageComponent },
      { path: 'pages', component: CalendarPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: '**', redirectTo: 'home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
