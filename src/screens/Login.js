import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Common/Error';
import Loading from '../components/Common/Loading';
import { TEXT } from '../data/Constants';
import { login } from '../Redux/User/UserAsyncRequest';
import { userLoginSelector } from '../Redux/User/UserSelector';
import Header from './../components/Header';

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector(userLoginSelector);

  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <input
            type="email"
            placeholder={TEXT.user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={TEXT.user.psw}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{TEXT.btns.login}</button>
          <p>
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              {TEXT.btns.register}
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
