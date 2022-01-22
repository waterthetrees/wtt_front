import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class MapboxControlPortal extends Component {
  container = null;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.addToMap();
  }

  componentWillUnmount() {
    const { map } = this.props;

    if (map && this.container) {
      map.remove(this.container);
    }
  }

  componentDidUpdate() {
    // In case the map prop was null when we were first mounted, try to add the control to the map.
    this.addToMap();
  }

  addToMap() {
    const { map, position } = this.props;

    if (map && !this.container) {
      map.addControl(this, position);
    }
  }

  onAdd() {
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    return this.container
  }

  onRemove() {
    if (this.container) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }

  render() {
    return this.container
      ? ReactDOM.createPortal(
        this.props.children,
        this.container
      )
      : null;
  }
}
