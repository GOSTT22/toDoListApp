import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { iCars } from "./cars.interface";
import { tap, catchError, map} from 'rxjs/operators';

@Injectable()
export class CarsService {
    private url = '/api/car';

    wasUpdated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(public http: HttpClient) { }

    setWasUpdated(value: boolean): void {
        this.wasUpdated$.next(value);
    }

    getWasUpdated(): BehaviorSubject<boolean> {
        return this.wasUpdated$;
    }

    getAllCars(): Observable<iCars[]> {
        return this.http.get<iCars[]>(this.url).pipe(
            tap(_ => console.log('fetched all cars')),
            catchError((error) => throwError(`Server do not response.`))
        )
    }

    getCarByID(id: number): Observable<iCars> {
        return this.http.get<iCars[]>(this.url).pipe(
          map((heros: iCars[]) => heros.find(item => item.id === id)),
          catchError((error) => throwError(`Server do not response.`))
        )
      }

    deleteCar(id: number): Observable<any> {
        console.log(id);
        console.log(this.url);
        return this.http.delete<iCars>(this.url + '/' + id).pipe(
          tap(_ => { console.log('Car was deleted'); }),
          catchError((error) => throwError(`Server do not response.`)));
    }

    createCar(newCar: iCars): Observable<any> {
        return this.http.post<iCars>(this.url, newCar).pipe(
          tap(_ => {
            console.log('added new Hero');
            this.setWasUpdated(true);
        }),
          catchError((error) => throwError(`Server do not response.`))
        );
    }

    updateCar(CarForUpdating: iCars): Observable<any> {
        return this.http.put(this.url + '/' + CarForUpdating.id, CarForUpdating).pipe(
          tap(_ => {
            this.setWasUpdated(true);
            console.log(`updated hero with id=${CarForUpdating.id}`)}),
          catchError((error) => throwError(`Server do not response.`))
        );
      }

}