import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SearchPageComponent } from './search-page/search-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { TodayPageComponent } from './today-page/today-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import {ProgressBarModule} from "primeng/progressbar";
import {SharedModule} from "../shared/shared.module";
import {SelectButtonModule} from "primeng/selectbutton";
import {EditorModule} from "primeng/editor";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
import {PipesModule} from "../pipes/pipes.module";
import {AccordionModule} from "primeng/accordion";


@NgModule({
  declarations: [
    CalendarPageComponent,
    HomePageComponent,
    TodayPageComponent,
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ProgressBarModule,
    SharedModule,
    SelectButtonModule,
    EditorModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule,
    CalendarModule,
    PaginatorModule,
    PipesModule,
    AccordionModule
  ]
})
export class PagesModule { }
