import React from 'react';
import { Link } from 'react-router-dom';
import Message from '../Common/Error';
import Loading from '../Common/Loading';
import moment from 'moment';
import { CURRENCY, TEXT } from '../../data/Constants';

const Orders = ({ loading, error, orders }) => {
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              {TEXT.order.no_orders}
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: '12px',
                }}>
                {TEXT.btns.link_to_shop}
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>{TEXT.order.id}</th>
                    <th>{TEXT.order.status}</th>
                    <th>{TEXT.order.date_create_pay}</th>
                    <th>{TEXT.order.summa}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className={`${order.isPaid ? 'alert-success' : 'alert-danger'}`}
                      key={order._id}>
                      <td>
                        <a href={`/order/${order._id}`} className="link">
                          {order._id}
                        </a>
                      </td>
                      <td>{order.isPaid ? <>{TEXT.order.paid}</> : <>{TEXT.order.not_paid}</>}</td>
                      <td>
                        {order.isPaid
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
                      </td>
                      <td>
                        {order.totalPrice} {CURRENCY}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
