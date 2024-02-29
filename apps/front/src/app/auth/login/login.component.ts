import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isEmail, strongPassword} from "../../helpers/regexp.helper";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(isEmail)]],
      password: ['', [Validators.required, Validators.pattern(strongPassword)]]
    });
  }

  isValid(field: string):boolean{
    return this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched || false;
  }

  login(){
    if(this.loginForm.valid){
      const {email, password} = this.loginForm.controls;
      this.authService.login(email.value, password.value)
        .subscribe( ({ok, msg}) => {
          if(ok){
            this.messageService.add({key: 'tr', severity:'success', summary: 'Success', detail: 'Login successful'});
            setTimeout(() => {
              this.router.navigateByUrl('/diary');
            }, 1000);
          }else{
            this.messageService.add({key: 'tr', severity:'error', summary: 'Error', detail: msg});
          }
        });
    }
  }

  //TODO: Remember password modal

}
