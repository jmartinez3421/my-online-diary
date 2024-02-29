import { Component, OnInit } from '@angular/core';
import {PagesService} from "../../services/pages/pages.service";
import {Page} from "../../models/page.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss'],
  providers: [MessageService]
})
export class CalendarPageComponent implements OnInit {

  today = new Date();
  filledDates: Date[] = [];
  noteDates: Date[] = [];
  selectedDay: Date = new Date();
  selectedPage!: Page;

  constructor(private pagesService: PagesService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPages();
    this.changeDay();
  }

  changeDay(){
    this.pagesService.getPage(this.selectedDay).subscribe({
      next: ({page}) => {
        this.selectedPage = page;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  isSelected(date: any) {
    return date.day === this.selectedDay.getDate() && date.month === this.selectedDay.getMonth() && date.year === this.selectedDay.getFullYear();
  }

  isFilled(date: any) {
    if(this.filledDates.length === 0) return false;
    const d = new Date(date.year, date.month, date.day);
    return this.filledDates.some(fDate => fDate.getTime() === d.getTime());
  }

  hasNotes(date: any) {
    if(this.noteDates.length === 0) return false;
    const d = new Date(date.year, date.month, date.day);
    return this.noteDates.some(nDate => nDate.getTime() === d.getTime());
  }

  getPages() {
    this.pagesService.getAllPages().subscribe({
      next: ({pages}) => {
        pages.forEach(page => {
          if (page.main !== '') {
            this.filledDates.push(new Date(page.date));
          }else if(page.notes !== ''){
            this.noteDates.push(new Date(page.date));
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  save(){
    this.pagesService.savePage(this.selectedPage._id, this.selectedPage.main, this.selectedPage.notes, this.selectedPage.feeling).subscribe({
      next: ({page}) => {
        this.messageService.add({key: 'tr', severity:'success', summary: 'Success', detail: 'Saved successfully'});
        this.getPages();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({key: 'tr', severity:'error', summary: 'Error', detail: 'Error while saving'});
      }
    });
  }
}
