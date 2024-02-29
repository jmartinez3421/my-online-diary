import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map, scheduled, asyncScheduler, of, Observable} from "rxjs";
import {BasicResponse} from "../../models/response";
import {getHeaders} from "../../helpers/headers.helper";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    const body = {email, password};
    const url = `${this.baseUrl}/auth/login`

    return this.http.post<any>(url, body)
      .pipe(
        map(resp => {
          sessionStorage.setItem('token', resp.token);
          const response: BasicResponse = {ok: true, msg: 'Login successfully'};
          return response;
        }),
        catchError(err => scheduled<BasicResponse>(of({ok:false, msg: err.error.msg}), asyncScheduler))
      );
  }

  checkEmail(email:string){
    const body = {email};
    const url = `${this.baseUrl}/user/email`;

    return this.http.post<BasicResponse>(url, body)
      .pipe(
        map( resp => {
          return {ok: true, msg: resp.msg}
        }),
        catchError(err => scheduled<BasicResponse>(of({ok:false, msg: err.error.msg}), asyncScheduler))
      );
  }

  register(name: string, email: string, password: string, safeQuestion: string, safeAnswer:string){
    const body = {name, email, password, safeQuestion, safeAnswer};
    const url = `${this.baseUrl}/user`;

    return this.http.post<any>(url, body)
      .pipe(
        map(resp => {
          sessionStorage.setItem('token', resp.token);
          const response: BasicResponse = {ok: true, msg: 'Registered successfully'};
          return response;
        }),
        catchError(err => scheduled<BasicResponse>(of({ok:false, msg: err.error.msg}), asyncScheduler))
      );
  }

  validateToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = getHeaders();

    return this.http.get<any>(url, {headers: headers})
      .pipe(
        map( resp => {
          sessionStorage.setItem('token', resp.token);
          return true;
        }),
        catchError(() => scheduled<boolean>(of(false), asyncScheduler))
      );
  }
}
