import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HerosService } from "./heros.service";
import { createHeroAction, createHeroFailureAction, createHeroSuccessAction, deleteHeroAction, deleteHeroFailureAction, deleteHeroSuccessAction, getAllHerosAction, getAllHerosFailureAction, getAllHerosSuccessAction, updateHeroAction, updateHeroFailureAction, updateHeroSuccessAction } from "./hero.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { HeroInterface } from "./hero.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

@Injectable()
export class CreateHeroEffect {

    getAllHero$ = createEffect(() => this.actions$.pipe(
        ofType(getAllHerosAction),
        switchMap(_ => {
            return this.herosService.getHeroes().pipe(
                map((heros: HeroInterface[]) => {
                    return getAllHerosSuccessAction({ heros })
                })
            )
        }),
        catchError((errorResponse: HttpErrorResponse) => {
            return of(getAllHerosFailureAction({ errors: errorResponse.error.errors }))
        })
    ));

    createHero$ = createEffect(() => this.actions$.pipe(
        ofType(createHeroAction),
        switchMap(({ hero }) => {
            return this.herosService.createHero(hero).pipe(
                map((hero: HeroInterface) => {
                    return createHeroSuccessAction({ hero })
                })
            )
        }),
        catchError((errorResponse: HttpErrorResponse) => {
            return of(createHeroFailureAction({ errors: errorResponse.error.errors}))
        })
    ));

    deleteHero$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteHeroAction),
            switchMap(({ id }) => {
                return this.herosService.deleteHero(id).pipe(
                    map(() => {
                        return deleteHeroSuccessAction({ id })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(deleteHeroFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    updateHero$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateHeroAction),
            switchMap(({ hero }) => {
                return this.herosService.updateHero(hero).pipe(
                    map((hero: HeroInterface) => {
                        return updateHeroSuccessAction({ hero })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(updateHeroFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    constructor(private herosService: HerosService, private actions$: Actions) { }

}