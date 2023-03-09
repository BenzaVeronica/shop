import { logout } from '../User/UserAsyncRequest';
import { publicRequest, userRequest } from '../../utils/requestMethods';
import errorHandler from '../../utils/errorHandler';
import { errorMsg } from './../constants';
import {
  listProductDetailRequestAction,
  listProductDetailSuccessAction,
  listProductDetailErrorAction,
  createProductReviewRequestAction,
  createProductReviewSuccessAction,
  createProductReviewErrorAction,
  listProductRequestAction,
  listProductSuccessAction,
  listProductErrorAction,
} from './ProductActions';

//PRODUCT LIST
export const listProduct =
  (keyword = ' ', pageNumber = ' ') =>
  async (dispatch) => {
    try {
      dispatch(listProductRequestAction());
      const { data } = await publicRequest.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`,
      );
      dispatch(listProductSuccessAction(data));
    } catch (error) {
      const message = errorHandler(error);
      dispatch(listProductErrorAction(message));
    }
  };

//SINGLE PRODUCT
export const listProductDetail = (id) => async (dispatch) => {
  try {
    dispatch(listProductDetailRequestAction());
    const { data } = await publicRequest.get(`/api/products/${id}`);
    dispatch(listProductDetailSuccessAction(data));
  } catch (error) {
    const message = errorHandler(error);
    dispatch(listProductDetailErrorAction(message));
  }
};

//PRODUCT REVIEW CREATE
export const createProductReview = (productId, review) => async (dispatch) => {
  try {
    dispatch(createProductReviewRequestAction());
    const { data } = await userRequest.post(`/api/products/${productId}/review`, review);
    dispatch(createProductReviewSuccessAction(data));
  } catch (error) {
    const message = errorHandler(error);
    if (message === errorMsg) {
      dispatch(logout());
    }
    dispatch(createProductReviewErrorAction(message));
  }
};
