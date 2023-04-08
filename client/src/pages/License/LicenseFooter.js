import React from 'react';

export default function LicenseFooter({ license = '', children }) {
  return (
    <div className="license__footer">
      {license && <div className="license__footer-content">{license}</div>}
      {!license && (
        <div className="license__footer-content">
          Unless otherwise specified, data are licensed as{' '}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-NC-SA
          </a>{' '}
          (Creative Commons – Attribution, Non-commercial, Share-alike). This
          means that you are free to use and distribute the data so long as you
          preserve the original author/source attributions and do not use it
          (without permission) for commercial applications.
        </div>
      )}
      {children}
    </div>
  );
}
