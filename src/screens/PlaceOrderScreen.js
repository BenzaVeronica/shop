import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import Message from '../components/Common/Error';
import { createOrder } from '../Redux/Order/OrderAsyncRequest';
import { CURRENCY, TEXT } from '../data/Constants';
import addDecimals from '../utils/addDecimals';
import { userLoginSelector } from '../Redux/User/UserSelector';
import { cartSelector } from '../Redux/Cart/CartSelector';
import { orderCreateSelector } from '../Redux/Order/OrderSelector';
import { createOrderResetAction } from '../Redux/Order/OrderActions';

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { userInfo } = useSelector(userLoginSelector);

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  //   cart.assemblyPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice))
    //  + Number(cart.assemblyPrice)
    .toFixed(2);

  const { order, success, error } = useSelector(orderCreateSelector);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch(createOrderResetAction());
    }
  }, [history, dispatch, success, order]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        // assemblyPrice: cart.assemblyPrice,
        totalPrice: cart.totalPrice,
      }),
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>{TEXT.roles.customer}</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
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
                  {TEXT.order.country}: {cart.shippingAddress.country}
                </p>
                <p>
                  {TEXT.order.pay}: {cart.paymentMethod}
                </p>
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
                  {TEXT.order.address}: {cart.shippingAddress.city}, {cart.shippingAddress.address},{' '}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">{TEXT.cart.title}</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
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
                    {cart.itemsPrice} {CURRENCY}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{TEXT.order.shipping}</strong>
                  </td>
                  <td>
                    {cart.shippingPrice} {CURRENCY}
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <strong>Assembly</strong>
                  </td>
                  <td>{cart.assemblyPrice} {CURRENCY}</td>
                </tr>*/}
                <tr>
                  <td>
                    <strong className="text-uppercase">{TEXT.order.shipping}</strong>
                  </td>
                  <td>
                    {cart.totalPrice} {CURRENCY}
                  </td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                {TEXT.btns.order}
              </button>
            )}
            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
