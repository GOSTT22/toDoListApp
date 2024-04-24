import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../action-types";
import { LoginInterface, RegisterInterface, SesionInterface } from "./auth.interface";


export const getLoginDataAction = createAction(
    ActionTypes.GET_LOGIN_DATA
)
//
// register
//
export const createRegisterDataAction = createAction(
    ActionTypes.CREATE_REGISTER_DATA,
    props<{ register: RegisterInterface }>()
)

export const createRegisterDataSuccesAction = createAction(
    ActionTypes.CREATE_REGISTER_DATA_SUCCESS,
    props<{ register: RegisterInterface }>()
)

export const createRegisterDataFailureAction = createAction(
    ActionTypes.CREATE_REGISTER_DATA_FAILURE,
    props<{ errors: string }>()
)

//
// LOGIN
//
export const createLoginDataAction = createAction(
    ActionTypes.CREATE_LOGIN_DATA,
    props<{ login: LoginInterface }>()
)

export const createLoginDataSuccesAction = createAction(
    ActionTypes.CREATE_LOGIN_DATA_SUCCESS,
    props<{ sesion: SesionInterface }>()
)

export const createLoginDataFailureAction = createAction(
    ActionTypes.CREATE_LOGIN_DATA_FAILURE,
    props<{ errors: string }>()
)


