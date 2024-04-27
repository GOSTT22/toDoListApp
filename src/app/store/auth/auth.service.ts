import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { LoginInterface, RegisterInterface } from "./auth.interface";
import { tap, catchError, delay} from 'rxjs/operators';

@Injectable()
export class AuthService {
    // private url = '/login';

    constructor(private http: HttpClient) { }

    // getClients(): Observable<ClientInterface[]> {
    //     return this.http.get<ClientInterface[]>(this.url).pipe(
    //         tap(_ => console.log('fetched clients')),
    //         catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
    //     )
    // }

    createLogin(newLogin: LoginInterface): Observable<any> {
        return this.http.post<LoginInterface>("http://localhost:3000/login", newLogin).pipe(
          tap(_ => console.log('Login create')),
          catchError((error) => throwError(error))
        );
    }

    createRegister(newRegsiter:RegisterInterface): Observable<any> {
      return this.http.post<RegisterInterface>("http://localhost:3000/register", newRegsiter).pipe(
        tap(_ => console.log('Register create')),
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