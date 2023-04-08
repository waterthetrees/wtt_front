import React from 'react';

export default function LicenseFooter({ license = '', children }) {
  return (
    <div className="license__footer">
      <div className="license__footer-content">
        <div className="license__footer-content-item">{children}</div>
        {license && (
          <div className="license__footer-content-item">{license}</div>
        )}
        {!license && (
          <div className="license__footer-content-item">
            Data is licensed under{' '}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              CC BY-NC-SA (Attribution, Non-commercial, Share-alike).
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
