import React from 'react';

const loadingImg = 'assets/images/logos/waterthetrees-fatgraff.svg';

const Loading = () => (
  <div className="spinner">
    <img src={loadingImg} alt="Loading..." />
    <h1>Loading...</h1>
  </div>
);

export default Loading;
