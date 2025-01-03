import {
    JELLY_CREATE_REQUEST,
    JELLY_CREATE_SUCCESS,
    JELLY_CREATE_FAIL,
    JELLY_CREATE_RESET,
    JELLY_LIST_REQUEST,
    JELLY_LIST_SUCCESS,
    JELLY_LIST_FAIL,
    JELLY_DETAILS_REQUEST,
    JELLY_DETAILS_SUCCESS,
    JELLY_DETAILS_FAIL,
    JELLY_UPDATE_REQUEST,
    JELLY_UPDATE_SUCCESS,
    JELLY_UPDATE_FAIL,
    JELLY_UPDATE_RESET,
    JELLY_DELETE_REQUEST,
    JELLY_DELETE_SUCCESS,
    JELLY_DELETE_FAIL,
} from "../Constants/jellyConstants";
import {Jelly} from "../Util/types.ts";


interface JellyState {
    loading?: boolean;
    jelly?: Jelly;
    error?: string;
    success?: boolean;
}

interface JellyListState {
    loading?: boolean;
    jellies?: Jelly[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

export const jellyCreateReducer = (
    state: JellyState = {},
    action: Action
): JellyState => {
    switch (action.type) {
        case JELLY_CREATE_REQUEST:
            return { loading: true };
        case JELLY_CREATE_SUCCESS:
            return { loading: false, success: true, jelly: action.payload };
        case JELLY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case JELLY_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const jellyListReducer = (
    state: JellyListState = { jellies: [] },
    action: Action
): JellyListState => {
    switch (action.type) {
        case JELLY_LIST_REQUEST:
            return { loading: true, jellies: [] };
        case JELLY_LIST_SUCCESS:
            return { loading: false, jellies: action.payload };
        case JELLY_LIST_FAIL:
            return { loading: false, error: action.payload, jellies: [] };
        default:
            return state;
    }
};

export const jellyDetailsReducer = (
    state: JellyState = { jelly: {} },
    action: Action
): JellyState => {
    switch (action.type) {
        case JELLY_DETAILS_REQUEST:
            return { ...state, loading: true };
        case JELLY_DETAILS_SUCCESS:
            return { loading: false, jelly: action.payload };
        case JELLY_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const jellyUpdateReducer = (
    state: JellyState = { jelly: {} },
    action: Action
): JellyState => {
    switch (action.type) {
        case JELLY_UPDATE_REQUEST:
            return { loading: true };
        case JELLY_UPDATE_SUCCESS:
            return { loading: false, success: true, jelly: action.payload };
        case JELLY_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case JELLY_UPDATE_RESET:
            return { jelly: {} };
        default:
            return state;
    }
};

export const jellyDeleteReducer = (
    state: JellyState = {},
    action: Action
): JellyState => {
    switch (action.type) {
        case JELLY_DELETE_REQUEST:
            return { loading: true };
        case JELLY_DELETE_SUCCESS:
            return { loading: false, success: true };
        case JELLY_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};