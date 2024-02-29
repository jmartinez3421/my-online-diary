import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PagesService} from "../../services/pages/pages.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-today-page',
  templateUrl: './today-page.component.html',
  styleUrls: ['./today-page.component.scss'],
  providers: [MessageService]
})
export class TodayPageComponent implements OnInit {

  pagePid: string = '';
  date: Date = new Date();
  pageForm!: FormGroup;
  feelingOptions: any[] = [];

  constructor(private fb: FormBuilder, private pagesService: PagesService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.feelingOptions = [
      {icon: 'bi bi-emoji-laughing-fill', value: 'happy'},
      {icon: 'bi bi-emoji-neutral-fill', value: 'normal'},
      {icon: 'bi bi-emoji-frown-fill', value: 'sad'}
    ];

    this.pageForm = this.fb.group({
      main: [''],
      notes: [''],
      feeling: ['', Validators.required]
    });

    this.pagesService.getTodayPage().subscribe({
      next: ({page}) => {
        this.pagePid = page._id;
        this.pageForm.setValue({main: page.main, notes: page.notes, feeling: page.feeling});
      },
      error: err => console.log(err)
    });
  }

  save(){
    if(this.pageForm.valid && this.pagePid !== ''){
      const {main, notes, feeling} = this.pageForm.value;
      this.pagesService.savePage(this.pagePid, main, notes, feeling).subscribe({
        next: ({page}) => {
          this.messageService.add({key: 'tr', severity:'success', summary: 'Success', detail: 'Saved successfully'});
        },
        error: err => {
          console.log(err);
          this.messageService.add({key: 'tr', severity:'error', summary: 'Error', detail: 'Error while saving'});
        }
      });
    }
  }

}
