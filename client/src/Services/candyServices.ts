import { Review } from "./../../../server/src/models/reviewModel";
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
  CANDY_DELETE_REQUEST,
  CANDY_DELETE_SUCCESS,
  CANDY_DELETE_FAIL,
  CANDY_UNLIKE_FAIL,
  CANDY_UNLIKE_SUCCESS,
  CANDY_UNLIKE_REQUEST,
  CANDY_LIKE_FAIL,
  CANDY_LIKE_SUCCESS,
  CANDY_LIKE_REQUEST,
} from "../Constants/candyConstants.ts";
import { Candy } from "../Util/types.ts";
import { RootState } from "../store.ts";

export const listCandies =
  (keyword: string = "", rating: string = "") =>
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
      formData.append("image", candy.image); // Assuming image contains the file or file path

      const response = await axios.post("/api/upload", formData, config);
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

export const deleteCandy =
  (id: string) =>
  async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({
        type: CANDY_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axios.delete(`/api/CANDY/${id}`, config);

      dispatch({ type: CANDY_DELETE_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: CANDY_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
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
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (typeof candy.image !== "string") {
        const formData = new FormData();
        formData.append("image", candy.image); // Assuming image contains the file or file path

        const response = await axios.post("/api/upload", formData, config);
        const candyWithImage = {
          ...candy,
          image: response.data,
        };

        const { data } = await axios.put(
          `/api/candy/${candyWithImage._id}`,
          candyWithImage,
          config
        );
        dispatch({ type: CANDY_UPDATE_SUCCESS, payload: data });
      } else {
        const { data } = await axios.put(
          `/api/candy/${candy._id}`,
          candy,
          config
        );
        dispatch({ type: CANDY_UPDATE_SUCCESS, payload: data });
      }
    } catch (error: any) {
      dispatch({
        type: CANDY_UPDATE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };
export const likeCandy =
    (candyId: string) =>
        async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
          try {
            dispatch({ type: CANDY_LIKE_REQUEST });
            const {
              userLogin: { userInfo },
            } = getState();

            if (!userInfo) {
              throw new Error('User not authenticated');
            }


            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
              },
            };

            console.log('config', config)

            await axios.post(`/api/candy/${candyId}/like`, { userId: userInfo.id }, config);

            dispatch({ type: CANDY_LIKE_SUCCESS });
          } catch (error: any) {
            dispatch({
              type: CANDY_LIKE_FAIL,
              payload:
                  error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
            });
          }
        };

export const unlikeCandy =
    (candyId: string) =>
        async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
          try {
            dispatch({ type: CANDY_UNLIKE_REQUEST });

            const {
              userLogin: { userInfo },
            } = getState();

            if (!userInfo) {
              throw new Error('User not authenticated');
            }

            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
              },
            };
            console.log('userInfo', userInfo);

            await axios.post(`/api/candy/${candyId}/unlike`, { userId: userInfo.id }, config);

            dispatch({ type: CANDY_UNLIKE_SUCCESS });
          } catch (error: any) {
            dispatch({
              type: CANDY_UNLIKE_FAIL,
              payload:
                  error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
            });
          }
        };
export const createCandyReview = (
  candyId: string,
  review: Review,
  isAuthenticatedWithGoogle: boolean
) => {
  return async (
    dispatch: Dispatch,
    getState: () => RootState
  ): Promise<void> => {
    try {
      dispatch({
        type: "CANDY_CREATE_REVIEW_REQUEST",
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `/api/candy/${candyId}/reviews`,
        { review, isAuthenticatedWithGoogle },
        config
      );

      dispatch({ type: "CANDY_CREATE_REVIEW_SUCCESS" });
    } catch (error: any) {
      dispatch({
        type: "CANDY_CREATE_REVIEW_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
