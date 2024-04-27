import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "./authState.interface";
import { createLoginDataAction, createLoginDataFailureAction, createLoginDataSuccesAction, createRegisterDataAction, createRegisterDataFailureAction, createRegisterDataSuccesAction, getLoginDataAction} from "./auth.actions";

const initialState: AuthStateInterface = {
    types: null,
    error: null,
    login: null,
    sesion: null,
    register: null
}

const authReducer = createReducer(
    initialState,
    on(
        getLoginDataAction,
        (state): AuthStateInterface => ({
            ...state
        })
    ),
    on(
        createLoginDataAction,
        (state, action): AuthStateInterface => {
            console.log(state, action, "create action reducer")
            return {...state, ...action}
        }
    ),
    on(
        createLoginDataSuccesAction,
        (state, action): AuthStateInterface => {
            console.log(state, action, "succes action reducer")
            return {...state, sesion: action.sesion}
            
        }
    ),
    on(
        createLoginDataFailureAction,
        (state, action): AuthStateInterface => {
            return {...state, error: action.errors}
        }
    ),
    on(
        createRegisterDataAction,
        (state, action): AuthStateInterface => {
            return {...state, ...action}
        }
    ),
    on(
        createRegisterDataSuccesAction,
        (state, action): AuthStateInterface => {
            console.log(state, action, "succes action reducer")
            return {...state, register: action.register}
            
        }
    ),
    on(
        createRegisterDataFailureAction,
        (state, action): AuthStateInterface => ({
            ...state, error: action.errors
        })
    )

)

export function reducersAuth(state: AuthStateInterface, action: Action) {
    return authReducer(state, action)
}

