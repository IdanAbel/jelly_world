import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface CandyFilterProps {
    onFilterChange: (searchTerm: string) => void;
}

import axios from 'axios';
import { Dispatch } from 'redux';
import { CANDY_LIST_REQUEST, CANDY_LIST_SUCCESS, CANDY_LIST_FAIL } from '../Constants/candyConstants.ts';
import {Candy} from "../Util/types.ts";
import {RootState} from "../store.ts";

export const listCandies = (
  keyword: string = '',
  maxPrice: number = 10000000,
  rating: string = ''
) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CANDY_LIST_REQUEST });
      const searchKeyword = keyword === 'all' ? '' : keyword;
      const searchRating = rating === 'all' ? '' : rating;

      const { data } = await axios.get(
        `/api/candies?keyword=${searchKeyword}&rating=${searchRating}`
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

export const createCandy = (candy: Candy) => async (dispatch: Dispatch, getState: () => RootState) => {{
    // TODO: create candy
}};
