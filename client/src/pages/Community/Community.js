import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/Footer/Footer';
import Communities from './Communities';
import './Community.scss';

export default function Community() {
  return (
    <div className="community">
      <h1>Community</h1>
      <div className="community__main">
        <div className="community__main__p">
          Want a tree planted in front of your house? Have branches that need to
          be trimmed? Is there a stump that needs to be removed? Get in touch
          with your city tree services, most of the time it is free of charge.
        </div>
        <Communities />
        <div className="community__main__header">
          <h2>Have tree data you want share?</h2>
        </div>
        <div className="community__main__p">
          We are always looking to add or update our data to be as current as
          possible. To upload tree data go to our{' '}
          <Link className="community__main__p__link" to={'/'}>
            source page
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
