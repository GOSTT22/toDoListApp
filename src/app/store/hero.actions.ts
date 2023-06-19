import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "./action-types";
import { HeroInterface } from "./hero.interface";


export const getAllHerosAction = createAction(
    ActionTypes.GET_ALL_HEROS
)

export const getAllHerosSuccessAction = createAction(
    ActionTypes.GET_ALL_HEROS_SUCCESS,
    props<{ heros: HeroInterface[] }> ()
)

export const getAllHerosFailureAction = createAction(
    ActionTypes.GET_ALL_HEROS_FAILURE,
    props<{ errors: string }> ()
)

export const getTypesOfHeros = createAction(
    ActionTypes.GET_TYPES_OF_HEROS
)