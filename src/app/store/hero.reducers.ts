import { Action, createReducer, on } from "@ngrx/store";
import { HeroStateInterface } from "./hero-state.interface";
import { getAllHerosSuccessAction, getTypesOfHeros } from "./hero.actions";

const initialState: HeroStateInterface = {
    allHeros: null,
    types: null,
    error: null
}

const heroReducer = createReducer(
    initialState,
    on(
        getAllHerosSuccessAction,
        (state, action): HeroStateInterface => ({
            ...state, allHeros: action.heros
        })
    ),
    on(
        getTypesOfHeros,
        (state): HeroStateInterface => {
            if(!state.allHeros) {
                return {...state, error: 'Heroes are not defined.'}
            }
            const allTypes = state.allHeros.map(hero => hero.type);
            const uniqueTypes = new Set(allTypes);
            return {...state, types: [...uniqueTypes]}
        }
    )
)

export function reducers(state: HeroStateInterface, action: Action) {
    return heroReducer(state, action)
}

