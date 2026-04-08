import { JwtDecodeOptions } from './../../../../../node_modules/jwt-decode/build/cjs/index.d';
import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser, loginUser } from '../../interfaces/auth-user';
import { enviroment } from '../../../enviroments/enviroment';
import { API_BASE_URL } from '../../../token/api-toen';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient = inject(HttpClient);
  _router = inject(Router);

  _baseURl = inject(API_BASE_URL);
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    afterNextRender(() => {
      this.isLoggedUser();
    });
  }
  registerUser(userInfo: AuthUser): Observable<any> {
    return this._httpClient.post(`${this._baseURl}/auth/signup`, userInfo);
  }
  loginUser(userInfo: loginUser): Observable<any> {
    return this._httpClient.post(`${this._baseURl}/auth/signin`, userInfo);
  }
  savaUser() {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
      console.log(this.userData);
    }
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/auth']);
  }
  isLoggedUser() {
    if (localStorage.getItem('userToken')) {
      this.userData.next(jwtDecode(localStorage.getItem('userToken')!));
      return true;
    } else {
      return false;
    }
  }
}
