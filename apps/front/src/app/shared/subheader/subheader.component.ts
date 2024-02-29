import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {

  @Input() title: Date | string = '';
  @Input() saveBtn: boolean = false;
  @Output() onSave: EventEmitter<boolean> = new EventEmitter();
  isDate = false;

  constructor() { }

  ngOnInit(): void {
    this.isDate = this.title instanceof Date;
  }

  save(){
    this.onSave.emit(true);
  }
}
