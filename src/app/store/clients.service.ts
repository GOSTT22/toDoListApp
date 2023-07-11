import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { ClientInterface } from "./client.interface";
import { tap, catchError, delay} from 'rxjs/operators';

@Injectable()
export class ClientsService {
    private url = '/api/clients';

    constructor(private http: HttpClient) { }

    getClients(): Observable<ClientInterface[]> {
        return this.http.get<ClientInterface[]>(this.url).pipe(
            tap(_ => console.log('fetched clients')),
            catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        )
    }

    createClient(newClient: ClientInterface): Observable<any> {
        return this.http.post<ClientInterface>(this.url, newClient).pipe(
          tap(_ => console.log('added new Client')),
          catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        );
    }

    deleteClient(id: number): Observable<any> {
        return this.http.delete<ClientInterface>(this.url + '/' + id).pipe(
            tap(_ => {
                console.log('Client was deleted');
            }),
            catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
            , delay(1200));
    }

    updateClient(ClientForUpdating: ClientInterface): Observable<any> {
        return this.http.put(this.url + '/' + ClientForUpdating.id, ClientForUpdating).pipe(
          tap(_ => console.log(`updated client with id=${ClientForUpdating.id}`)),
          catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        );
    }

}