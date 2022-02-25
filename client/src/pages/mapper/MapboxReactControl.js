import React from 'react';
import ReactDOM from 'react-dom';

export class MapboxReactControl {
  container = null;
  map = null;
  type = null;
  props = null;

  constructor({ type, props = {} }) {
    this.type = type;
    this.props = props;
  }

  onAdd(map) {
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    ReactDOM.render(React.createElement(this.type, { ...this.props, map }), this.container);

    return this.container
  }

  onRemove() {
    if (this.container) {
      // Force the React components to do any unmounting that's needed.
      ReactDOM.render(null, this.container);
      this.container.parentNode.removeChild(this.container);
      this.container = null;
      this.map = null;
    }
  }
}
