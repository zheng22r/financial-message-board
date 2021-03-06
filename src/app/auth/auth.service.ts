import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";
import { environment } from "../../environments/environment.prod";

const ApiURL = environment.apiUrl + "/user/";

@Injectable({providedIn: "root"})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTime: any;
  private userId: string;
  private authStatusLCheck = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http
      .post(ApiURL + "/signup", authData)
      .subscribe(() => {
        this.router.navigate(["/"]);
      }, error => {
        this.authStatusLCheck.next(false);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        ApiURL + "/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTime(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusLCheck.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 2000
          );
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(["/"]);
        }
      }, error => {
        this.authStatusLCheck.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTime(expiresIn / 1000);
      this.authStatusLCheck.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusLCheck.next(false);
    this.userId = null;
    clearTimeout(this.tokenTime);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTime(duration: number) {
    this.tokenTime = setTimeout(() => {
      this.logout();
    }, duration * 1500);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusLCheck.asObservable();
  }

}
