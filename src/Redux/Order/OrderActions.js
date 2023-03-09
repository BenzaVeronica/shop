import ORDER_TYPES from './OrderConstants';

export const createOrderRequestAction = () => ({ type: ORDER_TYPES.ORDER_CREATE_REQUEST });
export const createOrderSuccessAction = (data) => ({
  type: ORDER_TYPES.ORDER_CREATE_SUCCESS,
  payload: data,
});
export const createOrderErrorAction = (message) => ({
  type: ORDER_TYPES.ORDER_CREATE_FAIL,
  payload: message,
});
export const createOrderResetAction = () => ({ type: ORDER_TYPES.ORDER_CREATE_RESET });

export const orderDetailsRequestAction = () => ({ type: ORDER_TYPES.ORDER_DETAILS_REQUEST });
export const orderDetailsSuccessAction = (data) => ({
  type: ORDER_TYPES.ORDER_DETAILS_SUCCESS,
  payload: data,
});
export const orderDetailsErrorAction = (message) => ({
  type: ORDER_TYPES.ORDER_DETAILS_FAIL,
  payload: message,
});

export const payOrderRequestAction = () => ({ type: ORDER_TYPES.ORDER_PAY_REQUEST });
export const payOrderSuccessAction = (data) => ({
  type: ORDER_TYPES.ORDER_PAY_SUCCESS,
  payload: data,
});
export const payOrderErrorAction = (message) => ({
  type: ORDER_TYPES.ORDER_PAY_FAIL,
  payload: message,
});
export const payOrderResetAction = () => ({ type: ORDER_TYPES.ORDER_PAY_RESET });

export const listOrdersRequestAction = () => ({ type: ORDER_TYPES.ORDER_LIST_REQUEST });
export const listOrdersSuccessAction = (data) => ({
  type: ORDER_TYPES.ORDER_LIST_SUCCESS,
  payload: data,
});
export const listOrdersErrorAction = (message) => ({
  type: ORDER_TYPES.ORDER_LIST_FAIL,
  payload: message,
});
export const listOrdersResetAction = () => ({ type: ORDER_TYPES.ORDER_LIST_RESET });
