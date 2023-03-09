import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ProfileTabs from '../components/Profile/ProfileTabs';
import Orders from './../components/Profile/Orders';
import moment from 'moment';
import { getUserDetails } from './../Redux/User/UserAsyncRequest';
import { listOrders } from '../Redux/Order/OrderAsyncRequest';
import { TEXT } from '../data/Constants';
import { orderListSelector } from '../Redux/Order/OrderSelector';
import { userLoginSelector } from '../Redux/User/UserSelector';
import userImg from '../assets/user.png';

const ProfileScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const { userInfo } = useSelector(userLoginSelector);
  const { loading, error, orders } = useSelector(orderListSelector);

  useEffect(() => {
    dispatch(listOrders());
    dispatch(getUserDetails('profile'));
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src={userImg} alt="userprofileimage" />
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{userInfo.name}</strong>
                  </h5>
                  <span className="author-card-position">
                    <>
                      {TEXT.register_title} {moment(userInfo.createdAt).format('LL')}
                    </>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div className="d-flex align-items-start">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical">
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true">
                    {TEXT.settings}
                  </button>
                  <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false">
                    {TEXT.orders}
                    <span className="badge2">{orders ? orders.length : 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab">
              <ProfileTabs />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab">
              <Orders orders={orders} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProfileScreen);
