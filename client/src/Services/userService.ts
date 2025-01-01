import axios, { AxiosError } from 'axios';
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from '../Constants/userConstants';
import { UserInfo } from '../util/types';

export const login = (email: string, password: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: LOGIN_REQUEST,
        });

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };

        const { data }: { data: UserInfo } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
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

export const register = (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: REGISTER_REQUEST,
        });

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };

        const { data }: { data: UserInfo } = await axios.post(
            '/api/users',
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

        localStorage.setItem('userInfo', JSON.stringify(data));
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
