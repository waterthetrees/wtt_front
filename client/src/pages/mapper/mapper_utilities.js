export function setHoverState(hoveredStateId, hover, sourceLayer) {
  return {
    id: hoveredStateId,
    source: 'public.treedata',
    'source-layer': sourceLayer,
    hover,
  };
}

export function makePopupString(properties) {
  const { common, scientific } = properties;
  const commonString = common ? `<h4>${common}</h4>` : '';
  const scientificString = scientific ? `<h5>${scientific}</h5>` : '';
  const htmlString = `<div>${commonString}${scientificString}</div>`;
  return htmlString;
}
