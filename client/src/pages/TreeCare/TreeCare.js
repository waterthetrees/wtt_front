import React from 'react';

import { Card } from '@/components/Card/Card';
import { treecaredata } from '@/pages/TreeCare/treecaredata';

import './TreeCare.scss';

export default function TreeCare() {
  return (
    <div className="treecare">
      <div className="treecare__header">
        <div className="treecare__header-title">
          <h1>Tree Care</h1>
        </div>
      </div>
      <div className="treecare__container">
        {treecaredata.map((item) => (
          <Card key={item.title} data-testid="card">
            <h3>{item.title}</h3>
            <div className="treecare__container-item">{item.text}</div>
          </Card>
        ))}
      </div>
      <div className="treecare__notice">
        Please log your maintenance on the tree info sidebar so we all can track
        the tree&apos;s health. Thank you!
      </div>
      <div className="treecare__footer">
        <div style={{ padding: '50% 0 0 0', position: 'relative' }}>
          <iframe
            title="Street Tree Care"
            src="https://player.vimeo.com/video/416031708?h=948fa392f3&byline=0&portrait=0"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
    </div>
  );
}
