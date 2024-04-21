export enum ActionTypes {
    GET_ALL_CLIENTS = '[CLIENTS] get all clients',
    GET_ALL_CLIENTS_SUCCESS = '[CLIENTS] get all clients success',
    GET_ALL_CLIENTS_FAILURE = '[CLIENTS] get all clients failure',

    GET_TYPES_OF_CLIETNS = '[CLIENTS] get all types of clients',

    CREATE_CLIENT = '[CLIENTS] create client',
    CREATE_CLIENT_SUCCESS = '[CLIENTS] create client success',
    CREATE_CLIENT_FAILURE = '[CLIENTS] create client failure',

    GET_CLIENT_BY_ID = '[CLIENTS] get client by id',
    GET_CLIENT_BY_ID_SUCCESS = '[CLIENTS] get client by id success',
    GET_CLIENT_BY_ID_FAILURE = '[CLIENTS] get client by id failure',

    DELETE_CLIENT = '[CLIENTS] client hero',
    DELETE_CLIENT_SUCCESS = '[CLIENTS] delete client success',
    DELETE_CLIENT_FAILURE = '[CLIENTS] delete client failure',

    OPEN_TASK_FORM_CLIENT = '[CLIENTS] open task form',
    CLOSE_TASK_FORM_CLIENT = '[CLIENTS] close task form',
    EDIT_MODE_FORM_CLIENT = '[CLIENTS] switch form to edit mode',
    ADD_MODE_FORM_CLIENT = '[CLIENTS] switch form to add mode',


    SET_SELECTED_CLIENT = '[CLIENTS] set selected client',
    CLEAR_SELECTED_CLIENT = '[CLIENTS] clear selected client',

    UPDATE_CLIENT = '[CLIENTS] update client',
    UPDATE_CLIENT_SUCCESS = '[CLIENTS] update client success',
    UPDATE_CLIENT_FAILURE = '[CLIENTS] update client failure',

    GET_LOGIN_DATA ='[AUTH] get data from login form',
    CREATE_LOGIN_DATA ='[AUTH] create data from login form',
    CREATE_LOGIN_DATA_SUCCESS = '[AUTH] create login data success',
    CREATE_LOGIN_DATA_FAILURE = '[AUTH] create login data failure',
}