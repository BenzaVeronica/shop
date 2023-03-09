import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Common/Loading';
import Message from '../components/Common/Error';
import { getOrderDetails, payOrder } from '../Redux/Order/OrderAsyncRequest';
import moment from 'moment';
import { useState } from 'react';
import { CURRENCY, TEXT } from '../data/Constants';
import addDecimals from '../utils/addDecimals';
import StripeCheckout from 'react-stripe-checkout';
import { orderDetailsSelector, payOrderSelector } from '../Redux/Order/OrderSelector';
import { payOrderResetAction } from '../Redux/Order/OrderActions';
import { userLoginSelector } from '../Redux/User/UserSelector';
import logoHorizImg from '../assets/logo1.png';

const KEY = process.env.REACT_APP_STRIPE;

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const { userInfo } = useSelector(userLoginSelector);
  const { order, loading, error } = useSelector(orderDetailsSelector);
  const pay = useSelector(payOrderSelector);

  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
  }

  useEffect(() => {
    if (!order) {
      dispatch(payOrderResetAction());
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order]);

  const [stripeToken, setStripeToken] = useState(null);
  useEffect(() => {
    if (order && stripeToken && !order.isPaid) {
      dispatch(
        payOrder(orderId, {
          tokenId: stripeToken.id,
          amount: order.totalPrice,
        }),
      );
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, stripeToken]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>{TEXT.roles.customer}</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>{TEXT.order_info}</strong>
                    </h5>
                    <p>
                      {TEXT.order.country}: {order.shippingAddress.country}
                    </p>
                    <p>
                      {TEXT.order.pay}: {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          {TEXT.order.paid} {moment(order.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          {TEXT.order.not_paid}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>{TEXT.order.shipping}</strong>
                    </h5>
                    <p>
                      {TEXT.order.address}: {order.shippingAddress.city},{' '}
                      {order.shippingAddress.address}, {order.shippingAddress.postalCode}
                    </p>
                    {order.isDelivered ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          {TEXT.order.deliv} {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          {TEXT.order.not_deliv}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">{TEXT.order.msg}</Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
                      <div className="order-product row" key={index}>
                        <div className="col-md-3 col-6">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.productId}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                          <h4>{TEXT.order.qty}</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                          <h4>{TEXT.order.result}</h4>
                          <h6>
                            {item.qty * item.price} {CURRENCY}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              {/* total */}
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>{TEXT.products}</strong>
                      </td>
                      <td>
                        {order.itemsPrice} {CURRENCY}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>{TEXT.order.shipping}</strong>
                      </td>
                      <td>
                        {order.shippingPrice} {CURRENCY}
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <strong>Assembly</strong>
                      </td>
                      <td>{order.assemblyPrice} {CURRENCY}</td>
                    </tr> */}
                    <tr>
                      <td>
                        <strong className="text-uppercase">{TEXT.order.result}</strong>
                      </td>
                      <td>
                        {order.totalPrice} {CURRENCY}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {!order.isPaid && (
                  <StripeCheckout
                    email={userInfo.email}
                    image={logoHorizImg}
                    name={`${TEXT.order.result} ${order.totalPrice} ${CURRENCY}`}
                    panelLabel={TEXT.btns.pay}
                    token={onToken}
                    stripeKey={KEY}>
                    <button className="round-black-btn">{TEXT.btns.pay}</button>
                  </StripeCheckout>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
