import axios, { AxiosError } from "axios";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_GOOGLE_LOGIN_SUCCESS,
  USERֹֹֹ_GOOGLEֹ_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_FAILED,
  USER_LOGOUT,
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
} from "../Constants/userConstants";
import { UserInfo } from "../util/types";
import { RootState } from "../store";
import { Dispatch } from "redux";

export const googleLogin = (tokenId) => async (dispatch: any) => {
  try {
    dispatch({
      type: USERֹֹֹ_GOOGLEֹ_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/googleLogin",
      JSON.stringify({ tokenId }),
      config
    );

    dispatch({
      type: USER_GOOGLE_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_GOOGLE_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data }: { data: UserInfo } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const err = error as AxiosError;
      dispatch({
        type: LOGIN_FAIL,
        payload:
          err.response && (err.response.data as { message: string }).message
            ? (err.response.data as { message: string }).message
            : err.message,
      });
    }
  };

export const register =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data }: { data: UserInfo } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const err = error as AxiosError;
      dispatch({
        type: REGISTER_FAIL,
        payload:
          err.response && (err.response.data as { message: string }).message
            ? (err.response.data as { message: string }).message
            : err.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const getUserDetails =
  (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const updateUserProfile =
  (user: any) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put("/api/users/profile", user, config);

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
