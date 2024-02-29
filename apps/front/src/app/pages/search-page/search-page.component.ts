import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchService} from "../../services/search/search.service";
import {Page} from "../../models/page.model";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  providers: [MessageService]
})
export class SearchPageComponent implements OnInit {

  searchForm!: FormGroup;

  feelingOptions: any[] = [];
  yesNoOptions: any[] = [];

  results: Page[] = [];
  searched: boolean = false;

  constructor(private fb: FormBuilder, private searchService: SearchService) { }

  ngOnInit(): void {
    this.feelingOptions  = [
      {icon: 'pi pi-minus', value: ''},
      {icon: 'bi bi-emoji-laughing-fill', value: 'happy'},
      {icon: 'bi bi-emoji-neutral-fill', value: 'normal'},
      {icon: 'bi bi-emoji-frown-fill', value: 'sad'}
    ];

    this.yesNoOptions = [
      {icon: 'pi pi-minus', value: ''},
      {label: 'Yes', value: true},
      {label: 'No', value: false}
    ];

    this.searchForm = this.fb.group({
      feeling: [''],
      notes: [''],
      main: ['']
    });
  }

  search(){
    this.searched = true;
    const {feeling, notes, main} = this.searchForm.value;
    let query = '';
    if(feeling !== ''){
      query += `feeling=${feeling}`;
    }
    if(notes !== ''){
      query += `&notes=${notes}`;
    }
    if(main !== ''){
      query += `&main=${main}`;
    }

    this.searchService.searchPage(query).subscribe({
      next: ({pages}) => {
        this.results = pages;
      },
      error: err => console.log(err)
    });
  }

  cleanResults(){
    this.searched = false;
    this.results = [];
    this.searchForm.reset({main: '', notes: '', feeling: ''});
  }
}
