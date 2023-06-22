import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "./app-state.interface";
import { HeroStateInterface } from "./hero-state.interface";

export const heroFeatureSelector = createFeatureSelector<
    AppStateInterface,
    HeroStateInterface
>('hero');

export const allHerosSelector = createSelector(
    heroFeatureSelector,
    (heroState: HeroStateInterface) => heroState.allHeros
)

export const allTypesSelector = createSelector(
    heroFeatureSelector,
    (heroState: HeroStateInterface) => heroState.types
)

export const ErrorSelector = createSelector(
    heroFeatureSelector,
    (heroState: HeroStateInterface) => heroState.error
)

export const selectSelectedHeroSelector = createSelector(
    heroFeatureSelector,
    (heroState: HeroStateInterface) => heroState.selectedHero
)