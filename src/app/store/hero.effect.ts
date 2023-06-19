import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HerosService } from "./heros.service";
import { getAllHerosAction, getAllHerosFailureAction, getAllHerosSuccessAction } from "./hero.actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { HeroInterface } from "./hero.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

@Injectable()
export class CreateHeroEffect {

    constructor(private herosService: HerosService, private actions$: Actions) { }

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
    ))
}