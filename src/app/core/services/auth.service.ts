import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient) { }

  private apiUrl = 'https://reqres.in/api'

  register(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, data)
  }
  login(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, data)
  }

}
