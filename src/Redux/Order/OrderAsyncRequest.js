import { userRequest } from '../../utils/requestMethods';
import { clearItemsAction } from '../Cart/CartActions';
import { logout } from '../User/UserAsyncRequest';
import { errorMsg } from '../constants';
import errorHandler from '../../utils/errorHandler';
import {
  createOrderRequestAction,
  createOrderSuccessAction,
  createOrderErrorAction,
  orderDetailsRequestAction,
  orderDetailsSuccessAction,
  orderDetailsErrorAction,
  payOrderRequestAction,
  payOrderSuccessAction,
  payOrderErrorAction,
  listOrdersRequestAction,
  listOrdersSuccessAction,
  listOrdersErrorAction,
} from './OrderActions';

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequestAction());
    const { data } = await userRequest.post(`/api/orders`, order);
    dispatch(createOrderSuccessAction(data));
    dispatch(clearItemsAction(data));
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message = errorHandler(error);
    if (message === errorMsg) {
      dispatch(logout());
    }
    dispatch(createOrderErrorAction(message));
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailsRequestAction());
    const { data } = await userRequest.get(`/api/orders/${id}`);
    dispatch(orderDetailsSuccessAction(data));
  } catch (error) {
    const message = errorHandler(error);
    if (message === errorMsg) {
      dispatch(logout());
    }
    dispatch(orderDetailsErrorAction(message));
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch(payOrderRequestAction());
    const { data } = await userRequest.put(`/api/orders/${orderId}/pay`, paymentResult);
    dispatch(payOrderSuccessAction(data));
  } catch (error) {
    const message = errorHandler(error);
    if (message === errorMsg) {
      dispatch(logout());
    }
    dispatch(payOrderErrorAction(message));
  }
};
export const listOrders = () => async (dispatch) => {
  try {
    dispatch(listOrdersRequestAction());
    const { data } = await userRequest.get(`/api/orders/`);
    dispatch(listOrdersSuccessAction(data));
  } catch (error) {
    const message = errorHandler(error);
    if (message === errorMsg) {
      dispatch(logout());
    }
    dispatch(listOrdersErrorAction(message));
  }
};
