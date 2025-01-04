import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './Reducers/userReducers';
import { candyCreateReducer } from './Reducers/candyReducers';

export interface RootState {
  userLogin: ReturnType<typeof userLoginReducer>;
  userRegister: ReturnType<typeof userRegisterReducer>;
  userDetails: ReturnType<typeof userDetailsReducer>;
  userUpdateProfile: ReturnType<typeof userUpdateProfileReducer>;
  userList: ReturnType<typeof userListReducer>;
  userDelete: ReturnType<typeof userDeleteReducer>;
  candyCreate: ReturnType<typeof candyCreateReducer>;
}

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  candyCreate: candyCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") as string)
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware as any))
);

export default store;
