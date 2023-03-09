import USER_TYPES from './UserConstants';

export const userLoginReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case USER_TYPES.USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_TYPES.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_TYPES.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_TYPES.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case USER_TYPES.USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_TYPES.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_TYPES.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_TYPES.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_TYPES.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_TYPES.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_TYPES.USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_TYPES.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_TYPES.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_TYPES.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
