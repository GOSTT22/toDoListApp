import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../action-types";
import { LoginInterface } from "./login.interface";


export const getLoginDataAction = createAction(
    ActionTypes.GET_LOGIN_DATA
)

export const createLoginDataAction = createAction(
    ActionTypes.CREATE_LOGIN_DATA,
    props<{ login: LoginInterface }>()
)

export const createLoginDataSuccesAction = createAction(
    ActionTypes.CREATE_LOGIN_DATA_SUCCESS,
    props<{ login: LoginInterface }>()
)

export const createLoginDataFailureAction = createAction(
    ActionTypes.CREATE_LOGIN_DATA_FAILURE,
    props<{ errors: string }>()
)


