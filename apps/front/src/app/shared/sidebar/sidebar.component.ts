import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() visible: boolean = false;

  @Output() onHide: EventEmitter<boolean> = new EventEmitter<boolean>();

  menuItems: MenuItem[] = [
    // {
    //   label: 'Home',
    //   icon: 'bi bi-house-door-fill',
    //   routerLink: '/diary/home'
    // },
    // {
    //   label: 'Today',
    //   icon: 'bi bi-pencil-fill',
    //   routerLink: '/diary/today'
    // },
    // {
    //   label: 'Pages',
    //   icon: 'bi bi-calendar-event-fill',
    //   routerLink: '/diary/pages'
    // },
    // {
    //   label: 'Search',
    //   icon: 'bi bi-search',
    //   routerLink: '/diary/search'
    // },
    // {
    //   label: 'Settings',
    //   icon: 'bi bi-gear-fill',
    //   routerLink: '/diary/settings'
    // }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    console.log('logout');
  }
}
