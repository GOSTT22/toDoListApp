import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "./authState.interface";
import { getLoginDataAction} from "./auth.actions";

const initialState: AuthStateInterface = {
    types: null,
    error: null,
    login: null
}

const authReducer = createReducer(
    initialState,
    on(
        getLoginDataAction,
        (state): AuthStateInterface => ({
            ...state
        })
    )
)

export function reducers(state: AuthStateInterface, action: Action) {
    return authReducer(state, action)
}

