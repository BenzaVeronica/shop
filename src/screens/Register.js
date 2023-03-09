import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './../components/Header';
import { register } from '../Redux/User/UserAsyncRequest';
import Message from '../components/Common/Error';
import Loading from '../components/Common/Loading';
import { TEXT } from '../data/Constants';
import { userRegisterSelector } from '../Redux/User/UserSelector';

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const { loading, error, userInfo } = useSelector(userRegisterSelector);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder={TEXT.user.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <button type="submit">{TEXT.btns.register}</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              {TEXT.btns.account} <strong>{TEXT.btns.login}</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
