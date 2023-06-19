import { HeroInterface } from "./hero.interface";

export interface HeroStateInterface {
    allHeros: HeroInterface[] | null,
    types: string[] | null,
    error: string | null
}