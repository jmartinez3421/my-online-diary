import {HttpHeaders} from "@angular/common/http";

export const getHeaders = (): HttpHeaders => {
  return new HttpHeaders().set('X-Auth', sessionStorage.getItem('token') || '');
}
