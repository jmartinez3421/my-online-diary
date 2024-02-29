import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {getHeaders} from "../../helpers/headers.helper";
import {PageResponse, PagesResponse} from "../../models/page.model";

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  baseUrl = `${environment.baseURL}/page`;

  constructor(private http: HttpClient) { }

  getTodayPage() {
    const url = `${this.baseUrl}/${new Date().toISOString()}`;
    const headers = getHeaders();

    return this.http.get<PageResponse>(url, {headers});
  }

  savePage(pid: string, main: string, notes: string, feeling: string) {
    const url = `${this.baseUrl}/${pid}`;
    const headers = getHeaders();
    const body = {main, notes, feeling};

    return this.http.put<PageResponse>(url, body, {headers});
  }

  getPage(date: Date){
    const url = `${this.baseUrl}/${date.toISOString()}`;
    const headers = getHeaders();

    return this.http.get<PageResponse>(url, {headers});
  }

  getAllPages() {
    const url = `${this.baseUrl}`;
    const headers = getHeaders();

    return this.http.get<PagesResponse>(url, {headers});
  }
}
