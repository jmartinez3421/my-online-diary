import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Router
} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> | boolean {
      return this.authService.validateToken()
        .pipe(
          tap( ok => {
            if(!ok){
              this.router.navigateByUrl('/auth/login');
            }
          })
        );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validateToken()
      .pipe(
        tap( ok => {
          if(!ok){
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
}
