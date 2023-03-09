import { setAuthAxios, publicRequest, userRequest } from '../../utils/requestMethods';
import { errorMsg } from '../constants';
import errorHandler from '../../utils/errorHandler';
import {
  userLoginRequestAction,
  userLoginSuccessAction,
  userLoginErrorAction,
  userLogoutAction,
  registerRequestAction,
  registerSuccessAction,
  registerErrorAction,
  userDetailsRequestAction,
  userDetailsSuccessAction,
  userDetailsErrorAction,
  userDetailsResetAction,
  updateUserRequestAction,
  updateUserSuccessAction,
  updateUserErrorAction,
} from './UserActions';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequestAction());
    const { data } = await publicRequest.post(`/api/users/login`, { email, password });
    dispatch(userLoginSuccessAction(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
    setAuthAxios(data.token);
  } catch (error) {
    const message = errorHandler(error);
    dispatch(userLoginErrorAction(message));
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogoutAction());
  dispatch(userDetailsResetAction());
  //   dispatch(listUserResetAction());
  document.location.href = './login';
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(registerRequestAction());
    const { data } = await publicRequest.post(`/api/users`, { name, email, password });
    dispatch(registerSuccessAction(data));
    dispatch(userLoginSuccessAction(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
    setAuthAxios(data.token);
  } catch (error) {
    const message = errorHandler(error);
    dispatch(registerErrorAction(message));
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(userDetailsRequestAction());
    const { data } = await userRequest.get(`/api/users/${id}`);
    dispatch(userDetailsSuccessAction(data));
  } catch (error) {
    const message = errorHandler(error);
    if (message === errorMsg) {
      dispatch(logout());
    }
    dispatch(userDetailsErrorAction(message));
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch(updateUserRequestAction());
    const { data } = await userRequest.put(`/api/users/profile`, user);
    console.log(data);
    dispatch(updateUserSuccessAction(data));
    // dispatch(userLoginSuccessAction(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
    setAuthAxios(data.token);
  } catch (error) {
    const message = errorHandler(error);
    if (message === errorMsg) {
      dispatch(logout());
    }
    dispatch(updateUserErrorAction(message));
  }
};
