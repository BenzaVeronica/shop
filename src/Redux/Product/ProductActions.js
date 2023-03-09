import PRODUCT_TYPES from './ProductConstants';

export const listProductRequestAction = () => ({ type: PRODUCT_TYPES.PRODUCT_LIST_REQUEST });
export const listProductSuccessAction = (data) => ({
  type: PRODUCT_TYPES.PRODUCT_LIST_SUCCESS,
  payload: data,
});
export const listProductErrorAction = (message) => ({
  type: PRODUCT_TYPES.PRODUCT_LIST_FAIL,
  payload: message,
});

export const listProductDetailRequestAction = () => ({
  type: PRODUCT_TYPES.PRODUCT_DETAILS_REQUEST,
});
export const listProductDetailSuccessAction = (data) => ({
  type: PRODUCT_TYPES.PRODUCT_DETAILS_SUCCESS,
  payload: data,
});
export const listProductDetailErrorAction = (message) => ({
  type: PRODUCT_TYPES.PRODUCT_DETAILS_FAIL,
  payload: message,
});

export const createProductReviewRequestAction = () => ({
  type: PRODUCT_TYPES.PRODUCT_CREATE_REVIEW_REQUEST,
});
export const createProductReviewSuccessAction = (data) => ({
  type: PRODUCT_TYPES.PRODUCT_CREATE_REVIEW_SUCCESS,
  payload: data,
});
export const createProductReviewErrorAction = (message) => ({
  type: PRODUCT_TYPES.PRODUCT_CREATE_REVIEW_FAIL,
  payload: message,
});
export const createReviewResetAction = () => ({ type: PRODUCT_TYPES.PRODUCT_CREATE_REVIEW_RESET });
