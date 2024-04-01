import { Action, createReducer, on } from "@ngrx/store";
import { ClientStateInterface } from "./clientState.interface";
import { clearSelectedClientAction, createClientAction, createClientFailureAction, createClientSuccessAction, deleteClientSuccessAction, getAllClientsSuccessAction, getClientByIdSuccessAction, getTypesOfClients, setSelectedClientAction, updateClientSuccessAction } from "./client.actions";

const initialState: ClientStateInterface = {
    allClients: null,
    types: null,
    error: null,
    client: null,
    selectedClient: {_id: "0", task_name: "", description: "", status: "", i: 0, createdAt:""}
}

const clientReducer = createReducer(
    initialState,
    on(
        getAllClientsSuccessAction,
        (state, action): ClientStateInterface => ({
            ...state, allClients: action.clients
        })
    ),
    on(
        getTypesOfClients,
        (state): ClientStateInterface => {
            if(!state.allClients) {
                return {...state, error: 'Clients are not defined.'}
            }
            const allTypes = state.allClients.map(client => client.status);
            const uniqueTypes = new Set(allTypes);
            return {...state, types: [...uniqueTypes]}
        }
    ),
    on(
        createClientAction,
        (state): ClientStateInterface => ({
            ...state
        })
    ),
    on(
        createClientSuccessAction,
        (state, action): ClientStateInterface => {
            const newClients = [...state.allClients, action.client];
            return {...state, allClients: newClients}
        }
    ),
    on(
        createClientFailureAction,
        (state, action): ClientStateInterface => ({
            ...state, error: action.errors
        })
    ),
    on(
        deleteClientSuccessAction,
        (state, action): ClientStateInterface => {
            const newClients = state.allClients.filter(client => client._id !== action._id);
            return {...state, allClients: newClients}
        }
    ),
    on(
        setSelectedClientAction,
        (state, action): ClientStateInterface => {
            return {
                ...state,
                selectedClient: action.client
            }
        }
    ),
    on(
        clearSelectedClientAction,
        (state): ClientStateInterface => {
            return {
                ...state,
                selectedClient: null
            }
        }
    ),
    on(
        updateClientSuccessAction,
        (state, action): ClientStateInterface => {
            const newClient = action.client;
            const newClients = state.allClients.map(client => {
                if (client._id === newClient._id) {
                    return newClient
                }
                return client
            });
            return {...state, allClients: newClients}
        }
    )

)

export function reducers(state: ClientStateInterface, action: Action) {
    return clientReducer(state, action)
}

