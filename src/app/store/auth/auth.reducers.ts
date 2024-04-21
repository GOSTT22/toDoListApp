import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "./authState.interface";
import { createLoginDataAction, createLoginDataFailureAction, createLoginDataSuccesAction, getLoginDataAction} from "./auth.actions";

const initialState: AuthStateInterface = {
    types: null,
    error: null,
    login: null
    // token: null
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
            return {...state}
            
        }
    ),
    on(
        createLoginDataFailureAction,
        (state, action): AuthStateInterface => ({
            ...state, error: action.errors
        })
    ),
)

export function reducersAuth(state: AuthStateInterface, action: Action) {
    return authReducer(state, action)
}

