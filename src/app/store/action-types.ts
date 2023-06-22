export enum ActionTypes {
    GET_ALL_HEROS = '[HEROS] get all heros',
    GET_ALL_HEROS_SUCCESS = '[HEROS] get all heros success',
    GET_ALL_HEROS_FAILURE = '[HEROS] get all heros failure',

    GET_TYPES_OF_HEROS = '[HEROS] get all types of heros',
    // GET_TYPES_OF_HEROS_FAILURE = '[HEROS] get all types of heros failure'

    CREATE_HERO = '[HEROS] create hero',
    CREATE_HERO_SUCCESS = '[HEROES] create hero success',
    CREATE_HERO_FAILURE = '[HEROES] create hero failure',

    GET_HERO_BY_ID = '[HEROS] get hero by id',
    GET_HERO_BY_ID_SUCCESS = '[HEROS] get hero by id success',
    GET_HERO_BY_ID_FAILURE = '[HEROS] get hero by id failure',

    DELETE_HERO = '[HEROS] delete hero',
    DELETE_HERO_SUCCESS = '[HEROS] delete hero success',
    DELETE_HERO_FAILURE = '[HEROS] delete hero failure',

    SET_SELECTED_HERO = '[HEROS] set selected hero',
    CLEAR_SELECTED_HERO = '[HEROS] clear selected hero',

    UPDATE_HERO = '[HEROS] update hero',
    UPDATE_HERO_SUCCESS = '[HEROS] update hero success',
    UPDATE_HERO_FAILURE = '[HEROS] update hero failure'
}