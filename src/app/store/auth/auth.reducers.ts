import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "./authState.interface";
import { createLoginDataAction, createLoginDataFailureAction, createLoginDataSuccesAction, createRegisterDataAction, createRegisterDataFailureAction, createRegisterDataSuccesAction, getLoginDataAction, getMeInfoAction, getMeInfoFailureAction, getMeInfoSuccesAction} from "./auth.actions";

const initialState: AuthStateInterface = {
    types: null,
    error: null,
    login: null,
    sesion: null,
    register: null,
    profile: null
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
            localStorage.setItem("token", action.sesion.token)
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
            location.reload()
            return {...state, register: action.register}
            
        }
    ),
    on(
        createRegisterDataFailureAction,
        (state, action): AuthStateInterface => {
            console.log(state, action, "failure action reducer")
            return {...state, error: action.errors}
        }
    ),
    on(
        getMeInfoAction,
        (state, action): AuthStateInterface => {
            return {...state, ...action}
        }
    ),
    on(
        getMeInfoSuccesAction,
        (state, action): AuthStateInterface => {
            console.log(state, action, "succes action reducer")
            return {...state, profile: action.profile}
            
        }
    ),
    on(
        getMeInfoFailureAction,
        (state, action): AuthStateInterface => {
            console.log(state, action, "failure action reducer")
            return {...state, error: action.errors}
        }
    )

)

export function reducersAuth(state: AuthStateInterface, action: Action) {
    return authReducer(state, action)
}

