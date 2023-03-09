import USER_TYPES from './UserConstants';

export const userLoginRequestAction = () => ({ type: USER_TYPES.USER_LOGIN_REQUEST });
export const userLoginSuccessAction = (data) => ({
  type: USER_TYPES.USER_LOGIN_SUCCESS,
  payload: data,
});
export const userLoginErrorAction = (message) => ({
  type: USER_TYPES.USER_LOGIN_FAIL,
  payload: message,
});

export const userLogoutAction = () => ({ type: USER_TYPES.USER_LOGOUT });

export const registerRequestAction = () => ({ type: USER_TYPES.USER_REGISTER_REQUEST });
export const registerSuccessAction = (data) => ({
  type: USER_TYPES.USER_REGISTER_SUCCESS,
  payload: data,
});
export const registerErrorAction = (message) => ({
  type: USER_TYPES.USER_REGISTER_FAIL,
  payload: message,
});

export const userDetailsRequestAction = () => ({ type: USER_TYPES.USER_DETAILS_REQUEST });
export const userDetailsSuccessAction = (data) => ({
  type: USER_TYPES.USER_DETAILS_SUCCESS,
  payload: data,
});
export const userDetailsErrorAction = (message) => ({
  type: USER_TYPES.USER_DETAILS_FAIL,
  payload: message,
});
export const userDetailsResetAction = () => ({ type: USER_TYPES.USER_DETAILS_RESET });

export const updateUserRequestAction = () => ({ type: USER_TYPES.USER_UPDATE_PROFILE_REQUEST });
export const updateUserSuccessAction = (data) => ({
  type: USER_TYPES.USER_UPDATE_PROFILE_SUCCESS,
  payload: data,
});
export const updateUserErrorAction = (message) => ({
  type: USER_TYPES.USER_UPDATE_PROFILE_FAIL,
  payload: message,
});
