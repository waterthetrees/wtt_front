import React from 'react';
import Communities from './Communities';

import { Footer } from '@/components/Footer/Footer';
import TreeImage from '@/assets/images/addtree/treefattrunk.png'
import './Community.scss';

export default function Community() {
    return (
        <div className='community'>
            <div className='community__logo'>
                <img
                    className='community__logo__image'
                    src={TreeImage}>
                </img>
            </div>
            <div className='community__header'>
                <h1>Community</h1>
            </div>
            <div className='community__main'>
                <div className='community__main__p'>
                    <span>Want a tree planted in front of your house? Have branches that need to be
                    </span>
                    <span className='community__main__p__text'>
                        trimmed? Is there a stump that needs to be removed?
                    </span>
                    <span>
                        Get in touch with your city tree services, most of the time it is free of charge.
                    </span>
                </div>
                <Communities />
                <div className='community__main__header'>
                    <h2>
                        Have tree data you want share?
                    </h2>
                </div>
                <div className='community__main__p'>
                    <span>
                        We are always looking to add or update our data to be as current as possible. To
                    </span>
                    <span>
                        upload tree data go to our <a href="https://waterthetrees.com/">source page</a>.
                    </span>
                </div>
            </div>
            <Footer />
        </div >
    )
}