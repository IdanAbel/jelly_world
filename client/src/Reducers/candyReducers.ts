import {
  CANDY_CREATE_REQUEST,
  CANDY_CREATE_SUCCESS,
  CANDY_CREATE_FAIL,
  CANDY_CREATE_RESET,
  CANDY_LIST_REQUEST,
  CANDY_LIST_SUCCESS,
  CANDY_LIST_FAIL,
  CANDY_DETAILS_REQUEST,
  CANDY_DETAILS_SUCCESS,
  CANDY_DETAILS_FAIL,
  CANDY_UPDATE_REQUEST,
  CANDY_UPDATE_SUCCESS,
  CANDY_UPDATE_FAIL,
  CANDY_UPDATE_RESET,
  CANDY_DELETE_REQUEST,
  CANDY_DELETE_SUCCESS,
  CANDY_DELETE_FAIL,
  CANDY_EXAMPLE_LIST_FAIL,
  CANDY_EXAMPLE_LIST_SUCCESS,
  CANDY_EXAMPLE_LIST_REQUEST,
  CANDY_CREATE_REVIEW_REQUEST,
  CANDY_CREATE_REVIEW_SUCCESS,
  CANDY_CREATE_REVIEW_FAIL,
  CANDY_CREATE_REVIEW_RESET,
    CANDY_LIKE_REQUEST,
    CANDY_LIKE_SUCCESS,
    CANDY_LIKE_FAIL,
    CANDY_UNLIKE_REQUEST,
    CANDY_UNLIKE_SUCCESS,
    CANDY_UNLIKE_FAIL,
} from "../Constants/candyConstants.ts";
import { Candy } from "../Util/types.ts";


interface CandyState {
    loading?: boolean;
    candy?: Candy | undefined;
    error?: string;
    success?: boolean;
}

interface CandyListState {
    loading?: boolean;
    candies?: Candy[];
    error?: string;
}

interface Action {
    type: string;
    payload?: any;
}

export const candyCreateReducer = (
    state: CandyState = {},
    action: Action
): CandyState => {
    switch (action.type) {
        case CANDY_CREATE_REQUEST:
            return { loading: true };
        case CANDY_CREATE_SUCCESS:
            return { loading: false, success: true, candy: action.payload };
        case CANDY_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case CANDY_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const candyListReducer = (
    state: CandyListState = { candies: [] },
    action: Action
): CandyListState => {
    switch (action.type) {
        case CANDY_LIST_REQUEST:
            return { loading: true, candies: [] };
        case CANDY_LIST_SUCCESS:
            return { loading: false, candies: action.payload.candies };
        case CANDY_LIST_FAIL:
            return { loading: false, error: action.payload, candies: [] };
        default:
            return state;
    }
};

export const candyExampleListReducer = (
    state: CandyListState = { candies: [] },
    action: Action
): CandyListState => {
    switch (action.type) {
        case CANDY_EXAMPLE_LIST_REQUEST:
            return { loading: true, candies: [] };
        case CANDY_EXAMPLE_LIST_SUCCESS:
            return { loading: false, candies: action.payload };
        case CANDY_EXAMPLE_LIST_FAIL:
            return { loading: false, error: action.payload, candies: [] };
        default:
            return state;
    }
};

export const candyDetailsReducer = (
  state: CandyState = {},
  action: Action
): CandyState => {
    switch (action.type) {
        case CANDY_DETAILS_REQUEST:
            return { ...state, loading: true };
        case CANDY_DETAILS_SUCCESS:
            return { loading: false, candy: action.payload };
        case CANDY_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const candyUpdateReducer = (
  state: CandyState = {},
  action: Action
): CandyState => {
    switch (action.type) {
        case CANDY_UPDATE_REQUEST:
            return { loading: true };
        case CANDY_UPDATE_SUCCESS:
            return { loading: false, success: true, candy: action.payload };
        case CANDY_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case CANDY_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const candyDeleteReducer = (
    state: CandyState = {},
    action: Action
): CandyState => {
    switch (action.type) {
        case CANDY_DELETE_REQUEST:
            return { loading: true };
        case CANDY_DELETE_SUCCESS:
            return { loading: false, success: true };
        case CANDY_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const candyCreateReviewReducer = (state = {}, action: Action) => {
    switch (action.type) {
      case CANDY_CREATE_REVIEW_REQUEST:
        return { loading: true };
      case CANDY_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true };
      case CANDY_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload };
      case CANDY_CREATE_REVIEW_RESET:
        return {};
      default:
        return state;
    }
  };

export const candyLikeReducer = (    state: CandyState = {},
                                     action: Action) => {
    switch (action.type) {
        case CANDY_LIKE_REQUEST:
            return { ...state, loading: true };
        case CANDY_LIKE_SUCCESS:
            return { ...state, loading: false };
        case CANDY_LIKE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const candyUnlikeReducer = (    state: CandyState = {},
                                       action: Action) => {
    switch (action.type) {
        case CANDY_UNLIKE_REQUEST:
            return { ...state, loading: true };
        case CANDY_UNLIKE_SUCCESS:
            return { ...state, loading: false };
        case CANDY_UNLIKE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};