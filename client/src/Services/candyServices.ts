import axios from "axios";
import { Dispatch } from "redux";
import {
  CANDY_LIST_REQUEST,
  CANDY_LIST_SUCCESS,
  CANDY_LIST_FAIL,
  CANDY_CREATE_REQUEST,
  CANDY_CREATE_SUCCESS,
  CANDY_CREATE_FAIL,
  CANDY_UPDATE_REQUEST,
  CANDY_UPDATE_SUCCESS,
  CANDY_UPDATE_FAIL,
  CANDY_EXAMPLE_LIST_REQUEST,
  CANDY_EXAMPLE_LIST_SUCCESS,
  CANDY_EXAMPLE_LIST_FAIL,
} from "../Constants/candyConstants.ts";
import { Candy } from "../Util/types.ts";
import { RootState } from "../store.ts";

export const listCandies =
  (keyword: string = "", maxPrice: number = 10000000, rating: string = "") =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CANDY_LIST_REQUEST });
      const searchKeyword = keyword === "all" ? "" : keyword;
      const searchRating = rating === "all" ? "" : rating;

      const { data } = await axios.get(
        `/api/candy?keyword=${searchKeyword}&rating=${searchRating}`
      );

      dispatch({ type: CANDY_LIST_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: CANDY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listExampleCandies = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: CANDY_EXAMPLE_LIST_REQUEST });
    const { data } = await axios.get(`/api/candy/example`);
    dispatch({ type: CANDY_EXAMPLE_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: CANDY_EXAMPLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCandy =
  (candy: Candy, isAuthenticatedWithGoogle: boolean) =>
  async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch({ type: CANDY_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

                const formData = new FormData();
                formData.append('image', candy.image); // Assuming image contains the file or file path

                const response = await axios.post('/api/upload', formData, config);
                const candyWithImage = {
                    ...candy,
                    image: response.data,
                    isAuthenticatedWithGoogle,
                };

      const { data } = await axios.post(`/api/candy`, candyWithImage, config);

      dispatch({ type: CANDY_CREATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: CANDY_CREATE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const updateCandy =
  (candy: Candy) => async (dispatch: any, getState: () => RootState) => {
    try {
      dispatch({ type: CANDY_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/candy/${candy.beanId}`,
        candy,
        config
      );

      dispatch({ type: CANDY_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: CANDY_UPDATE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };
