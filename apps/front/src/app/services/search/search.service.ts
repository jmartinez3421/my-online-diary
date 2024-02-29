import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {getHeaders} from "../../helpers/headers.helper";
import {PagesResponse} from "../../models/page.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = `${environment.baseURL}/search`;

  constructor(private http: HttpClient) { }

  searchPage(query: string){
    const url = (query !== '')? `${this.baseUrl}/page?${query}` : `${this.baseUrl}/page`;
    const headers = getHeaders();

    return this.http.get<PagesResponse>(url, {headers});
  }
}
