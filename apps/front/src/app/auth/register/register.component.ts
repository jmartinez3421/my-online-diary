import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {isEmail, strongPassword} from "../../helpers/regexp.helper";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  invalidEmail: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(isEmail)]],
      password: ['', [Validators.required, Validators.pattern(strongPassword)]],
      safeQuestion: ['', Validators.required],
      safeAnswer: ['', Validators.required]
    });
  }

  isValid(field: string):boolean{
    return this.registerForm.get(field)?.invalid && this.registerForm.get(field)?.touched || false;
  }

  checkEmail(){
    const {email} = this.registerForm.controls;
    this.invalidEmail = false;
    if(email.valid){
      this.authService.checkEmail(email.value)
        .subscribe( ({ok, msg}) => {
          if(!ok){
            this.invalidEmail = true;
            email.setErrors({incorrect: true});
          }else{
            this.invalidEmail = false;
          }
        });
    }
  }

  register(){
    if(this.registerForm.valid){
      const {name, email, password, safeQuestion, safeAnswer} = this.registerForm.value;
      this.authService.register(name, email, password, safeQuestion, safeAnswer)
        .subscribe( ({ok, msg}) => {
          if(ok){
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Register successful'});
            setTimeout(() => {
              this.router.navigateByUrl('/diary');
            }, 1000);
          }else{
            this.messageService.add({severity:'error', summary: 'Error', detail: msg});
          }
        });
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
}
