import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/login_request';
import { LoginResponse } from '../models/login-response';
import { RegisterRequest } from '../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/api/auth/login`,
      request
    );
  }
  getProtectedData() {
  return this.http.get<string>(
    `${this.apiUrl}/api/protected`
  );
}

register(request: RegisterRequest) {
  return this.http.post(
    `${this.apiUrl}/api/auth/register`,
    request
  );
}
logout() {
  localStorage.removeItem('token');
}
}