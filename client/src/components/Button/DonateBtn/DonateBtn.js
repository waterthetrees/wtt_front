import React from 'react';
import './DonateBtn.scss';

const DonateBtn = () => {
  return (
    <div className="donate-btn">
      <a
        href="https://opencollective.com/waterthetrees/donate"
        target="_blank"
        rel="noreferrer"
      >
        Donate
      </a>
    </div>
  );
};

export default DonateBtn;
