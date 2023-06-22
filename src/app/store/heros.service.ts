import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { HeroInterface } from "./hero.interface";
import { tap, catchError, delay} from 'rxjs/operators';

@Injectable()
export class HerosService {
    private url = '/api/heroes';

    constructor(private http: HttpClient) { }

    getHeroes(): Observable<HeroInterface[]> {
        return this.http.get<HeroInterface[]>(this.url).pipe(
            tap(_ => console.log('fetched heroes')),
            catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        )
    }

    createHero(newHero: HeroInterface): Observable<any> {
        return this.http.post<HeroInterface>(this.url, newHero).pipe(
          tap(_ => console.log('added new Hero')),
          catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        );
    }

    deleteHero(id: number): Observable<any> {
        return this.http.delete<HeroInterface>(this.url + '/' + id).pipe(
            tap(_ => {
                console.log('Hero was deleted');
            }),
            catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
            , delay(1200));
    }

    updateHero(HeroForUpdating: HeroInterface): Observable<any> {
        return this.http.put(this.url + '/' + HeroForUpdating.id, HeroForUpdating).pipe(
          tap(_ => console.log(`updated hero with id=${HeroForUpdating.id}`)),
          catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        );
    }

}