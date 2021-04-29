/* eslint-disable no-param-reassign */
function setHoverState(hoveredStateId, hover, sourceLayer, layerId) {
  return {
    id: hoveredStateId,
    source: layerId,
    sourceLayer,
    hover,
  };
}

function makePopupString(properties) {
  const { common, scientific } = properties;
  const commonString = common ? `<h4>${common}</h4>` : '';
  const scientificString = scientific ? `<h5>${scientific}</h5>` : '';
  const htmlString = `<div>${commonString}${scientificString}</div>`;
  return htmlString;
}

export default function mouseMoveMap(map, layerId, hoveredStateId, popup) {
  map.on('mousemove', layerId, (e) => {
    if (e.features.length > 0) {
      if (e.features[0].properties.id_tree) {
        hoveredStateId = e.features[0].properties.id_tree;
        const hoverState = setHoverState(hoveredStateId, false, hoveredStateId, layerId);
        map.setFeatureState(hoverState);
        map.setFeatureState({ ...hoverState, ...{ hover: true } });
        map.getCanvas().style.cursor = 'pointer';

        const coordinates = e.features[0].geometry.coordinates.slice();
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const HTML = makePopupString(e.features[0].properties);
        popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
      }
    }
  });
}
