import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "../appState.interface";
import { AuthStateInterface } from "./authState.interface";

export const authFeatureSelector = createFeatureSelector<
    AppStateInterface,
    AuthStateInterface
>('auth');

export const selectAuthError = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.error
)

export const selectAuthToken = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.sesion?.token
)

export const selectProfile = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.profile
)