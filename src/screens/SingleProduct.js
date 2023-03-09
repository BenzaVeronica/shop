import React, { useEffect, useState } from 'react';
import Header from './../components/Header';
import Rating from '../components/Common/Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, listProductDetail } from '../Redux/Product/ProductAsyncRequest';
import Message from '../components/Common/Error';
import Loading from '../components/Common/Loading';
import { CURRENCY, TEXT } from '../data/Constants';
import { productDetailsSelector, productReviewSelector } from '../Redux/Product/ProductSelector';
import { userLoginSelector } from '../Redux/User/UserSelector';

import moment from 'moment';
import 'moment/locale/ru';
import { createReviewResetAction } from '../Redux/Product/ProductActions';
moment.locale('ru');

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const productId = match.params.id;

  const { loading, error, product } = useSelector(productDetailsSelector);
  const { userInfo } = useSelector(userLoginSelector);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = useSelector(productReviewSelector);

  useEffect(() => {
    if (successCreateReview) {
      setRating(0);
      setComment('');
    }
    dispatch(listProductDetail(productId));
    dispatch(createReviewResetAction());
  }, [dispatch, productId, successCreateReview]);

  const AddtoCartHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      }),
    );
  };
  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>{TEXT.product.price}</h6>
                      <span>
                        {product.price} {CURRENCY}
                      </span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>{TEXT.product.stock}</h6>
                      {product.countInStock > 0 ? <span>{TEXT.yes}</span> : <span>{TEXT.no}</span>}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>{TEXT.product.reviews}</h6>
                      <Rating value={product.rating} text={`${product.numReviews}`} />
                    </div>
                    {product.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>{TEXT.product.count}</h6>
                          <select value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button onClick={AddtoCartHandle} className="round-black-btn">
                          {TEXT.btns.add}
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">{TEXT.reviews.title}</h6>
                {product.reviews.length === 0 && (
                  <Message variant={'alert-info mt-3'}>{TEXT.reviews.no_reviews}</Message>
                )}
                {product.reviews.map((review) => (
                  <div key={review._id} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded ">
                    <div className="review-title">
                      <div className="review-title-inner">
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                      </div>
                      <span>{moment(review.createdAt).calendar()}</span>
                    </div>
                    <div className="alert alert-info mt-3">{review.comment}</div>
                  </div>
                ))}
              </div>
              <div className="col-md-6">
                <h6>{TEXT.reviews.writeReview}</h6>
                <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">{errorCreateReview}</Message>
                  )}
                </div>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>{TEXT.reviews.rating}</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded">
                        <option value="">{TEXT.placeholder_choose}</option>
                        <option value="1">1 - {TEXT.reviews[1]}</option>
                        <option value="2">2 - {TEXT.reviews[2]}</option>
                        <option value="3">3 - {TEXT.reviews[3]}</option>
                        <option value="4">4 - {TEXT.reviews[4]}</option>
                        <option value="5">5 - {TEXT.reviews[5]}</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>{TEXT.reviews.comment}</strong>
                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        required></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-black border-0 p-3 rounded text-white text-uppercase">
                        {TEXT.btns.send}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={'alert-warning'}>
                      {TEXT.reviews.please}{' '}
                      <Link to="/login">
                        " <strong>{TEXT.reviews.register}</strong> "
                      </Link>{' '}
                      {TEXT.reviews.msg}{' '}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
