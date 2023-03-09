import { combineReducers } from 'redux';
import {
  productListReducer,
  productDetailsReducer,
  productCreateReviewReducer,
} from './Product/ProductReducers';
import { cartReducer } from './Cart/CartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './User/UserReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListReducer,
  payOrderReducer,
} from './Order/OrderReducers';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  payOrder: payOrderReducer,
  orderList: orderListReducer,
});

export default rootReducer;
