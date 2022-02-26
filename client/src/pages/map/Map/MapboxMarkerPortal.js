import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

const events = [
  ['dragstart', 'onDragStart'],
  ['drag', 'onDrag'],
  ['dragend', 'onDragEnd'],
];

export class MapboxMarkerPortal extends PureComponent {
  container = null;
  marker = null;
  addedToMap = false;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.container = document.createElement('div');
    this.marker = new mapboxgl.Marker({
      element: this.container,
      ...this.props.options
    });

    events.forEach(([mapboxName, reactName]) => {
      this.marker.on(mapboxName, (event) => {
        const handler = this.props[reactName];

        if (typeof handler === 'function') {
          handler(event);
        }
      })
    });
  }

  componentWillUnmount() {
    const { map } = this.props;

    if (map && this.marker) {
      this.marker.remove();
      this.marker = null;
      this.container = null;
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, coordinates } = this.props;

    if (coordinates && coordinates !== prevProps.coordinates) {
        this.marker.setLngLat(coordinates)
    }

    // An update to coordinates might come after visible has changed, so we have to check for either.
    if (visible !== prevProps.visible || coordinates !== prevProps.coordinates) {
      if (visible && coordinates) {
        this.add();
      } else {
        this.remove();
      }
    }
  }

  add() {
    if (!this.addedToMap && this.marker && this.props.coordinates) {
      this.marker.addTo(this.props.map);
      this.addedToMap = true;
    }
  }

  remove() {
    if (this.addedToMap) {
      this.marker.remove();
      this.addedToMap = false;
    }
  }

  render() {
    return this.container && this.props.visible
      ? ReactDOM.createPortal(
        this.props.children,
        this.container
      )
      : null;
  }
}
