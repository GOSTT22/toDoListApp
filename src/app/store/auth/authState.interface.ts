import { LoginInterface } from "./login.interface";

export interface AuthStateInterface {
    login: LoginInterface | null,
    types: string[] | null,
    error: string | null,
    
}