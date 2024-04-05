import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "./appState.interface";
import { ClientStateInterface } from "./clientState.interface";

export const clientFeatureSelector = createFeatureSelector<
    AppStateInterface,
    ClientStateInterface
>('client');

export const allClientsSelector = createSelector(
    clientFeatureSelector,
    (clientState: ClientStateInterface) => clientState.allClients
)

export const allTypesSelector = createSelector(
    clientFeatureSelector,
    (clientState: ClientStateInterface) => clientState.types
)

export const ErrorSelector = createSelector(
    clientFeatureSelector,
    (clientState: ClientStateInterface) => clientState.error
)

export const isFormOpenedSelecor = createSelector(
    clientFeatureSelector,
    (clientState: ClientStateInterface) => clientState.isFormOpened
)

export const selectSelectedClientSelector = createSelector(
    clientFeatureSelector,
    (clientState: ClientStateInterface) => clientState.selectedClient
)