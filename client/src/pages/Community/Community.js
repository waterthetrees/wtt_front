import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD

import { Footer } from '@/components/Footer/Footer';
import TreeImage from '@/assets/images/addtree/treefattrunk.png';

=======
import { Footer } from '@/components/Footer/Footer';
>>>>>>> 4be28025c350f55f4e446290fc038ee8a4e8e011
import Communities from './Communities';
import './Community.scss';

export default function Community() {
  return (
    <div className="community">
<<<<<<< HEAD
      <div className="community__logo">
        <img
          className="community__logo__image"
          src={TreeImage}
          alt="tree"
        ></img>
      </div>
      <div className="community__header">
        <h1>Community</h1>
      </div>
      <div className="community__main">
        <div className="community__main__p">
          <span>
            Want a tree planted in front of your house? Have branches that need
            to be
          </span>
          <span className="community__main__p__text">
            trimmed? Is there a stump that needs to be removed?
          </span>
          <span>
            Get in touch with your city tree services, most of the time it is
            free of charge.
          </span>
=======
      <h1>Community</h1>
      <div className="community__main">
        <div className="community__main__p">
          Want a tree planted in front of your house? Have branches that need to
          be trimmed? Is there a stump that needs to be removed? Get in touch
          with your city tree services, most of the time it is free of charge.
>>>>>>> 4be28025c350f55f4e446290fc038ee8a4e8e011
        </div>
        <Communities />
        <div className="community__main__header">
          <h2>Have tree data you want share?</h2>
        </div>
        <div className="community__main__p">
<<<<<<< HEAD
          <span>
            We are always looking to add or update our data to be as current as
            possible. To
          </span>
          <span>
            upload tree data go to our{' '}
            <Link className="community__main__p__link" to={'/'}>
              source page
            </Link>
            .
          </span>
=======
          We are always looking to add or update our data to be as current as
          possible. To upload tree data go to our{' '}
          <Link className="community__main__p__link" to={'/'}>
            source page
          </Link>
>>>>>>> 4be28025c350f55f4e446290fc038ee8a4e8e011
        </div>
      </div>
      <Footer />
    </div>
  );
}
