import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfigComponent} from "../config/config.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [DialogService]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('header') header!: ElementRef;

  visibleSidebar: boolean = false;

  @Input() showMenu: boolean = false;

  ref!: DynamicDialogRef;

  constructor(private dialogService: DialogService) {
  }

  ngAfterViewInit(): void {
    if(this.header){
      const headerHeight = this.header.nativeElement.offsetHeight;
      const root = document.querySelector(':root') as HTMLElement;
      if(root){
        root.style.setProperty('--header-height', `${headerHeight}px`);
      }
    }
  }

  logout() {
    this.visibleSidebar = false;
    sessionStorage.removeItem('token');
  }

  showConfig(){
    this.ref = this.dialogService.open(ConfigComponent, {
      header: 'Settings',
      width: '95%',
      contentStyle: {"max-height": "90vh", "overflow": "auto"},
      baseZIndex: 10000,
      closable: true,
      maximizable: false,
    });
  }

}
