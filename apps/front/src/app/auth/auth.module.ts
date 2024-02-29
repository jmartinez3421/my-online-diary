import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CardModule} from "primeng/card";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {PasswordModule} from "primeng/password";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        AuthRoutingModule,
        CommonModule,
        CardModule,
        PasswordModule,
        SharedModule,
        ReactiveFormsModule,
        InputTextModule,
        InputTextareaModule,
        ToastModule
    ]
})
export class AuthModule { }
