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

export const createHeroAction = createAction(
    ActionTypes.CREATE_HERO,
    props<{ hero: HeroInterface }>()
)

export const createHeroSuccessAction = createAction(
    ActionTypes.CREATE_HERO_SUCCESS,
    props<{ hero: HeroInterface }>()
)

export const createHeroFailureAction = createAction(
    ActionTypes.CREATE_HERO_FAILURE,
    props<{ errors: string }>()
)

export const getHeroByIdAction = createAction(
    ActionTypes.GET_HERO_BY_ID,
    props<{ id: number }>()
)

export const getHeroByIdSuccessAction = createAction(
    ActionTypes.GET_HERO_BY_ID_SUCCESS,
    props<{ hero: HeroInterface }>()
)

export const getHeroByIdFailureAction = createAction(
    ActionTypes.GET_HERO_BY_ID_FAILURE,
    props<{ errors: string }>()
)

export const deleteHeroAction = createAction(
    ActionTypes.DELETE_HERO,
    props<{ id: number }>()
)

export const deleteHeroSuccessAction = createAction(
    ActionTypes.DELETE_HERO_SUCCESS,
    props<{ id: number }>()
)

export const deleteHeroFailureAction = createAction(
    ActionTypes.DELETE_HERO_FAILURE,
    props<{ errors: string }>()
)

export const setSelectedHeroAction = createAction(
    ActionTypes.SET_SELECTED_HERO,
    props<{ hero: HeroInterface }>()
)

export const clearSelectedHeroAction = createAction(
    ActionTypes.CLEAR_SELECTED_HERO
)

export const updateHeroAction = createAction(
    ActionTypes.UPDATE_HERO,
    props<{ hero: HeroInterface }>()
)

export const updateHeroSuccessAction = createAction(
    ActionTypes.UPDATE_HERO_SUCCESS,
    props<{ hero: HeroInterface }>()
)

export const updateHeroFailureAction = createAction(
    ActionTypes.UPDATE_HERO_FAILURE,
    props<{ errors: string }>()
)
