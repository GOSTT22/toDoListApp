import { ClientInterface } from "./client.interface";

export interface ClientStateInterface {
    allClients: ClientInterface[] | null,
    types: string[] | null,
    error: string | null,
    client: ClientInterface | null,
    selectedClient: ClientInterface | null,
    isFormOpened: boolean
}