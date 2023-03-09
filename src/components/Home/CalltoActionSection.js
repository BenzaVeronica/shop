import React from 'react';
import { TEXT } from '../../data/Constants';

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2 className="text-uppercase">{TEXT.mainpage.advertising.title}</h2>
              <p>{TEXT.mainpage.advertising.subtitle}</p>
              <form className="form-section">
                <input placeholder="Email" name="email" type="email" />
                <input value={TEXT.btns.subscribe} name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CalltoActionSection);
