import React, { useEffect } from 'react';
import Header from './../components/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addtToCart, removeFromCart } from '../Redux/Cart/CartAsyncRequest';
import { CURRENCY, TEXT } from '../data/Constants';
import { cartItemsSelector } from '../Redux/Cart/CartSelector';

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cartItems = useSelector(cartItemsSelector);
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addtToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkOutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const changeCountHandler = (e, productId) => {
    dispatch(addtToCart(productId, Number(e.target.value)));
  };

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            {TEXT.cart.title}
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: '12px',
              }}>
              {TEXT.btns.link_to_buy}
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              {TEXT.cart.total}
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {cartItems.map((item) => (
              <div className="cart-iterm row" key={item.name}>
                <div
                  onClick={() => removeFromCartHandler(item.productId)}
                  className="remove-button d-flex justify-content-center align-items-center">
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.productId}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>{TEXT.product.count}</h6>
                  <select value={item.qty} onChange={(e) => changeCountHandler(e, item.productId)}>
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>{TEXT.product.price}</h6>
                  <h4>
                    {item.price} {CURRENCY}
                  </h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub text-uppercase">{TEXT.order.result}:</span>
              <span className="total-price">
                {total} {CURRENCY}
              </span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>{TEXT.btns.continue_shopping}</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0 text-uppercase">
                  <button onClick={checkOutHandler}>{TEXT.btns.order}</button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
