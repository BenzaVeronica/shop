import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { TEXT } from '../data/Constants';
import { saveShippingAddress } from '../Redux/Cart/CartAsyncRequest';
import { shippingAddressSelector } from '../Redux/Cart/CartSelector';

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const shippingAddress = useSelector(shippingAddressSelector);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <h6 className="text-uppercase">{TEXT.order.title}</h6>
          <input
            type="text"
            placeholder={TEXT.order.address}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={TEXT.order.city}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={TEXT.order.postCode}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={TEXT.order.country}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          <button type="submit">
            {/* <Link to="/payment" className="text-white"> */}
            {TEXT.btns.continue}
            {/* </Link> */}
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
