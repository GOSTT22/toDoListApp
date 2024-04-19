import { ClientStateInterface } from "./task/clientState.interface";
import { AuthStateInterface } from "./auth/authState.interface";

export interface AppStateInterface {
    client: ClientStateInterface
    auth: AuthStateInterface
}