import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Toast from './../Common/Toast';
import Loading from '../../components/Common/Loading';
import Message from '../Common/Error';
import { updateUserProfile } from '../../Redux/User/UserAsyncRequest';
import { TEXT, TOASTOBJECTS } from '../../data/Constants';
import { userDetailsSelector, userUpdateProfileSelector } from '../../Redux/User/UserSelector';

const ProfileTabs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toastId = React.useRef(null);

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(userDetailsSelector);
  const { loading: updateLoading } = useSelector(userUpdateProfileSelector);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(TEXT.errors.psw_not_match, TOASTOBJECTS);
      }
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        }),
      );
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(TEXT.errors.update_profile, TOASTOBJECTS);
      }
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">{TEXT.user.name}</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">{TEXT.user.email}</label>
            <input
              className="form-control"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">{TEXT.user.new_psw}</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">{TEXT.user.confirm_psw}</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">{TEXT.forms.update_profile}</button>
      </form>
    </>
  );
};

export default ProfileTabs;
