import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../action-types";
import { ClientInterface } from "./client.interface";


export const getAllClientsAction = createAction(
    ActionTypes.GET_ALL_CLIENTS
)

export const getAllClientsSuccessAction = createAction(
    ActionTypes.GET_ALL_CLIENTS_SUCCESS,
    props<{ clients: ClientInterface[] }> ()
)

export const getAllClientsFailureAction = createAction(
    ActionTypes.GET_ALL_CLIENTS_FAILURE,
    props<{ errors: string }> ()
)

export const getTypesOfClients = createAction(
    ActionTypes.GET_TYPES_OF_CLIETNS
)

export const createClientAction = createAction(
    ActionTypes.CREATE_CLIENT,
    props<{ client: ClientInterface }>()
)

export const createClientSuccessAction = createAction(
    ActionTypes.CREATE_CLIENT_SUCCESS,
    props<{ client: ClientInterface }>()
)

export const createClientFailureAction = createAction(
    ActionTypes.CREATE_CLIENT_FAILURE,
    props<{ errors: string }>()
)

export const getClientByIdAction = createAction(
    ActionTypes.GET_CLIENT_BY_ID,
    props<{ _id: string }>()
)

export const getClientByIdSuccessAction = createAction(
    ActionTypes.GET_CLIENT_BY_ID_SUCCESS,
    props<{ client: ClientInterface }>()
)

export const getClientByIdFailureAction = createAction(
    ActionTypes.GET_CLIENT_BY_ID_FAILURE,
    props<{ errors: string }>()
)

export const deleteClientAction = createAction(
    ActionTypes.DELETE_CLIENT,
    props<{ _id: string }>()
)

export const deleteClientSuccessAction = createAction(
    ActionTypes.DELETE_CLIENT_SUCCESS,
    props<{ _id: string }>()
)

export const deleteClientFailureAction = createAction(
    ActionTypes.DELETE_CLIENT_FAILURE,
    props<{ errors: string }>()
)

export const openTaskFormClientAction = createAction(
    ActionTypes.OPEN_TASK_FORM_CLIENT
)

export const closeTaskFormClientAction = createAction(
    ActionTypes.CLOSE_TASK_FORM_CLIENT
)

export const editModeClientAction = createAction(
    ActionTypes.EDIT_MODE_FORM_CLIENT
)

export const addModeClientAction = createAction(
    ActionTypes.ADD_MODE_FORM_CLIENT
)

export const setSelectedClientAction = createAction(
    ActionTypes.SET_SELECTED_CLIENT,
    props<{ client: ClientInterface }>()
)

export const clearSelectedClientAction = createAction(
    ActionTypes.CLEAR_SELECTED_CLIENT
)

export const updateClientAction = createAction(
    ActionTypes.UPDATE_CLIENT,
    props<{ client: ClientInterface }>()
)

export const updateClientSuccessAction = createAction(
    ActionTypes.UPDATE_CLIENT_SUCCESS,
    props<{ client: ClientInterface }>()
)

export const updateClientFailureAction = createAction(
    ActionTypes.UPDATE_CLIENT_FAILURE,
    props<{ errors: string }>()
)
