import { LoginInterface, SesionInterface } from "./auth.interface";

export interface AuthStateInterface {
    login: LoginInterface | null,
    types: string[] | null,
    error: string | null,
    sesion: SesionInterface | null
    
}