import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { LoginInterface, ProfileInterface, RegisterInterface, SesionInterface } from "./auth.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { createLoginDataAction, createLoginDataFailureAction, createLoginDataSuccesAction, createRegisterDataAction, createRegisterDataFailureAction, createRegisterDataSuccesAction, getMeInfoAction, getMeInfoFailureAction, getMeInfoSuccesAction } from "./auth.actions";
import { Router } from "@angular/router";

@Injectable()
export class CreateAuthEffect {

    createAuth$ = createEffect(() => this.actions$.pipe(
        ofType(createLoginDataAction),
        switchMap(({ login }) => {
            return this.authService.createLogin(login).pipe(
                map((sesion: SesionInterface) => {
                    return createLoginDataSuccesAction({ sesion })
                })
            )
        }),
        catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error, errorResponse.message,"ResponseError")
            return of(createLoginDataFailureAction({ errors: errorResponse.error}))
        })
    ));

    createRegister$ = createEffect(() => this.actions$.pipe(
        ofType(createRegisterDataAction),
        switchMap(({ register }) => {
            return this.authService.createRegister(register).pipe(
                map((register: RegisterInterface) => {
                    return createRegisterDataSuccesAction({ register })
                })
            )
        }),
        catchError((errorResponse: HttpErrorResponse) => {
            return of(createRegisterDataFailureAction({ errors: errorResponse.error}))
        })
    ));

    getProfile$ = createEffect(() => this.actions$.pipe(
        ofType(getMeInfoAction),
        switchMap(_ => {
            return this.authService.getProfile().pipe(
                map((profile: ProfileInterface) => {
                    console.log("no OKAs",profile)
                    return getMeInfoSuccesAction({profile})
                })
            )
        }),
        catchError((errorResponse: HttpErrorResponse) => {
            this.router.navigate(['/auth'])
            return of(getMeInfoFailureAction({ errors: errorResponse.error }))
        })
    ));


    constructor(private authService: AuthService, private actions$: Actions, private router: Router) { }

}