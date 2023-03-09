import { publicRequest } from '../../utils/requestMethods';
import {
  addtToCartAction,
  removeFromCartAction,
  savePaymentMethodAction,
  saveShippingAddressAction,
} from './CartActions';

export const addtToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await publicRequest.get(`/api/products/${id}`);
  dispatch(addtToCartAction(data, qty));
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeFromCartAction(id));
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch(saveShippingAddressAction(data));
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch(savePaymentMethodAction(data));
  localStorage.setItem('PaymentMethod', JSON.stringify(data));
};
