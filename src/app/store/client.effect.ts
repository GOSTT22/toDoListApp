import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ClientsService } from "./clients.service";
import { createClientAction, createClientFailureAction, createClientSuccessAction, deleteClientAction, deleteClientFailureAction, deleteClientSuccessAction, getAllClientsAction, getAllClientsFailureAction, getAllClientsSuccessAction, updateClientAction, updateClientFailureAction, updateClientSuccessAction } from "./client.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { ClientInterface } from "./client.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

@Injectable()
export class CreateClientEffect {

    getAllClient$ = createEffect(() => this.actions$.pipe(
        ofType(getAllClientsAction),
        switchMap(_ => {
            return this.clientsService.getClients().pipe(
                map((clients: ClientInterface[]) => {
                    const indexClietns: ClientInterface[] = clients.map((client, i) => {
                        client.i = ++i;
                        return client 
                    })
                    return getAllClientsSuccessAction({clients: indexClietns })
                })
            )
        }),
        catchError((errorResponse: HttpErrorResponse) => {
            return of(getAllClientsFailureAction({ errors: errorResponse.error.errors }))
        })
    ));

    createClient$ = createEffect(() => this.actions$.pipe(
        ofType(createClientAction),
        switchMap(({ client }) => {
            return this.clientsService.createClient(client).pipe(
                map((client: ClientInterface) => {
                    return createClientSuccessAction({ client })
                })
            )
        }),
        catchError((errorResponse: HttpErrorResponse) => {
            return of(createClientFailureAction({ errors: errorResponse.error.errors}))
        })
    ));

    deleteClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteClientAction),
            switchMap(({ _id }) => {
                return this.clientsService.deleteClient(_id).pipe(
                    map(() => {
                        return deleteClientSuccessAction({ _id })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(deleteClientFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    updateClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateClientAction),
            switchMap(({ client }) => {
                return this.clientsService.updateClient(client).pipe(
                    map((client: ClientInterface) => {
                        return updateClientSuccessAction({ client })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(updateClientFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    constructor(private clientsService: ClientsService, private actions$: Actions) { }

}