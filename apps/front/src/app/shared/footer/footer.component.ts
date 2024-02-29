import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {

  @ViewChild('footer') footer!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    if(this.footer){
      const footerHeight = this.footer.nativeElement.offsetHeight;
      const root = document.querySelector(':root') as HTMLElement;
      if(root){
        root.style.setProperty('--footer-height', `${footerHeight}px`);
      }
    }
  }

}
