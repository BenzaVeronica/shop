import React from 'react';
import { ABOUT } from '../../data/Constants';
import aboutImg from '../../assets/about.jpg';

const CompanyInfo = () => {
  return (
    <div className="container">
      <div className="col-xs-12">
        <div className="company-info">
          <img src={aboutImg} alt="about" />
          <p>{ABOUT}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CompanyInfo);
