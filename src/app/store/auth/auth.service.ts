import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {
  LoginInterface,
  ProfileInterface,
  RegisterInterface,
} from "./auth.interface";
import { tap, catchError, delay, take } from "rxjs/operators";
import { selectAuthToken } from "./auth.selector";
import { select } from "@ngrx/store";

@Injectable()
export class AuthService {
  store: any;
  // private url = '/login';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem("token");
  }

  getProfile(): Observable<ProfileInterface> {
    // Step 1
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: "Bearer " + this.getToken(),
    });
    return this.http
      .get<ProfileInterface>(
        "http://localhost:3000/api/me?random=" + Math.random(),
        {
          headers: httpHeaders,
        }
      )
      .pipe(
        tap((_) => console.log("fetched profile")),
        catchError((error) =>
          throwError(`Server do not response. Error : ${error.toString()}`)
        )
      );
  }

  createLogin(newLogin: LoginInterface): Observable<any> {
    return this.http
      .post<LoginInterface>("http://localhost:3000/login", newLogin)
      .pipe(
        tap((_) => console.log("Login create")),
        catchError((error) => throwError(error))
      );
  }

  createRegister(newRegsiter: RegisterInterface): Observable<any> {
    return this.http
      .post<RegisterInterface>("http://localhost:3000/register", newRegsiter)
      .pipe(
        tap((_) => console.log("Register create")),
        catchError((error) => throwError(error))
      );
  }

  // deleteClient(_id: string): Observable<any> {
  //     return this.http.delete<ClientInterface>(this.url + '/' + _id).pipe(
  //         tap(_ => {
  //             console.log('Client was deleted');
  //         }),
  //         catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
  //         , delay(1200));
  // }

  // updateClient(ClientForUpdating: ClientInterface): Observable<any> {
  //     console.log(ClientForUpdating);
  //     return this.http.put(this.url + '/' + ClientForUpdating._id, ClientForUpdating).pipe(
  //       tap(_ => console.log(`updated client with _id=${ClientForUpdating._id}`)),
  //       catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
  //     );
  // }
}
