import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TEXT } from '../data/Constants';
import { savePaymentMethod } from '../Redux/Cart/CartAsyncRequest';
import { shippingAddressSelector } from '../Redux/Cart/CartSelector';
import Header from './../components/Header';

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const shippingAddress = useSelector(shippingAddressSelector);

  if (!shippingAddress) {
    history.push('/shipping');
  }

  //   const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [paymentMethod, setPaymentMethod] = useState(TEXT.pay[1]);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form className="Login2 col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <h6>{TEXT.pay.title}</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked
              />
              <label className="form-check-label">{TEXT.pay[1]}</label>
            </div>
          </div>

          <button type="submit">{TEXT.btns.continue}</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
