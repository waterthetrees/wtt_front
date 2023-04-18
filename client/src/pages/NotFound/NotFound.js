import React from 'react';
import './NotFound.scss';
import { Link } from 'react-router-dom';
import ErrorImage from '../../assets/images/404image.svg';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="content-container">
        <div className="error-message">
          <div className="image-container">
            <div className="alert-text">404</div>
            <img src={ErrorImage} alt="404" />
          </div>

          <div className="error-text">
            <p className="text_top">Aww, nuts.</p>
            <p className="text_bottom">
              Looks like you got off track. <br />
              Don’t worry though, there are <br />
              plenty of trees to water!
            </p>
          </div>
        </div>

        <button type="button" className="home-button">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Go to Map
          </Link>
        </button>
      </div>
    </div>
  );
}
