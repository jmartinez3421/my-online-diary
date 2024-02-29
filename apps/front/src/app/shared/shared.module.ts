import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import { InputComponent } from './input/input.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SidebarComponent } from './sidebar/sidebar.component';
import {RouterModule} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { ConfigComponent } from './config/config.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {InputSwitchModule} from "primeng/inputswitch";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    HeaderComponent,
    InputComponent,
    SidebarComponent,
    FooterComponent,
    SubheaderComponent,
    ConfigComponent
  ],
  exports: [
    HeaderComponent,
    InputComponent,
    FooterComponent,
    SubheaderComponent
  ],
    imports: [
        CommonModule,
        SidebarModule,
        ButtonModule,
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        SelectButtonModule,
        InputSwitchModule,
        ToastModule
    ]
})
export class SharedModule {
}
