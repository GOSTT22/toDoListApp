import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { HeroInterface } from "./hero.interface";
import { tap, catchError} from 'rxjs/operators';

@Injectable()
export class HerosService {
    private url = '/api/heroes';

    constructor(private http: HttpClient) { }

    getHeroes(): Observable<HeroInterface[]> {
        return this.http.get<HeroInterface[]>(this.url).pipe(
            tap(_ => console.log('fetched heroes')),
            catchError((error) => throwError('Server do not response.'))
        )
    }
}