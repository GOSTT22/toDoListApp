import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "./auth.service";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { LoginInterface, SesionInterface } from "./auth.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { createLoginDataAction, createLoginDataFailureAction, createLoginDataSuccesAction } from "./auth.actions";

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
            return of(createLoginDataFailureAction({ errors: errorResponse.error.errors}))
        })
    ));

    // deleteClient$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(deleteClientAction),
    //         switchMap(({ _id }) => {
    //             return this.clientsService.deleteClient(_id).pipe(
    //                 map(() => {
    //                     return deleteClientSuccessAction({ _id })
    //                 })
    //             )
    //         }),
    //         catchError((errorResponse: HttpErrorResponse) => {
    //             return of(deleteClientFailureAction(
    //                 { errors: errorResponse.error.errors }
    //             ))
    //         })
    //     )
    // );

    // updateClient$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(updateClientAction),
    //         switchMap(({ client }) => {
    //             return this.clientsService.updateClient(client).pipe(
    //                 map((client: ClientInterface) => {
    //                     return updateClientSuccessAction({ client })
    //                 })
    //             )
    //         }),
    //         catchError((errorResponse: HttpErrorResponse) => {
    //             return of(updateClientFailureAction(
    //                 { errors: errorResponse.error.errors }
    //             ))
    //         })
    //     )
    // );

    constructor(private authService: AuthService, private actions$: Actions) { }

}