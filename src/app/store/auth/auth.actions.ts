import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../action-types";
import { LoginInterface } from "./login.interface";


export const getLoginDataAction = createAction(
    ActionTypes.GET_LOGIN_DATA
)

