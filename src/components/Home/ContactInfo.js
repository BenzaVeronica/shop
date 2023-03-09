import React from 'react';
import { COMPANY_ADRESS, COMPANY_TEL, COMPANY_TIME } from '../../data/Constants';

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-6 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <p>{COMPANY_TIME}</p>
            <a href="tel:+37544565-59-84">{COMPANY_TEL}</a>
          </div>
        </div>
        <div className="col-12 col-md-6 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <p>{COMPANY_ADRESS}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactInfo);
