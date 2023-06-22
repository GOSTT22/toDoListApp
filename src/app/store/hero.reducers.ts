import { Action, createReducer, on } from "@ngrx/store";
import { HeroStateInterface } from "./hero-state.interface";
import { clearSelectedHeroAction, createHeroAction, createHeroFailureAction, createHeroSuccessAction, deleteHeroSuccessAction, getAllHerosSuccessAction, getHeroByIdSuccessAction, getTypesOfHeros, setSelectedHeroAction, updateHeroSuccessAction } from "./hero.actions";

const initialState: HeroStateInterface = {
    allHeros: null,
    types: null,
    error: null,
    hero: null,
    selectedHero: {id: 0, name: "", localized_name: "", type: ""}
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
    ),
    on(
        createHeroAction,
        (state): HeroStateInterface => ({
            ...state
        })
    ),
    on(
        createHeroSuccessAction,
        (state, action): HeroStateInterface => {
            const newHeros = [...state.allHeros, action.hero];
            return {...state, allHeros: newHeros}
        }
    ),
    on(
        createHeroFailureAction,
        (state, action): HeroStateInterface => ({
            ...state, error: action.errors
        })
    ),
    on(
        deleteHeroSuccessAction,
        (state, action): HeroStateInterface => {
            const newHeros = state.allHeros.filter(hero => hero.id !== action.id);
            return {...state, allHeros: newHeros}
        }
    ),
    on(
        setSelectedHeroAction,
        (state, action): HeroStateInterface => {
            return {
                ...state,
                selectedHero: action.hero
            }
        }
    ),
    on(
        clearSelectedHeroAction,
        (state): HeroStateInterface => {
            return {
                ...state,
                selectedHero: null
            }
        }
    ),
    on(
        updateHeroSuccessAction,
        (state, action): HeroStateInterface => {
            const newHero = action.hero;
            const newHeros = state.allHeros.map(hero => {
                if (hero.id === newHero.id) {
                    return newHero
                }
                return hero
            });
            return {...state, allHeros: newHeros}
        }
    )

)

export function reducers(state: HeroStateInterface, action: Action) {
    return heroReducer(state, action)
}

