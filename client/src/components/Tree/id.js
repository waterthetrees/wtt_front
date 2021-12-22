const MIN_LAT = -90;
const MAX_LAT = 90;
const MIN_LON = -180;
const MAX_LON = 180;

export const hashcode = (s) => {
  let h = 0;
  let i = s.length;
  while (i > 0) {
    h = ((h << 5) - h + s.charCodeAt(--i)) | 0;
  }
  return Math.abs(h);
};

// This code originally appeared here: https://github.com/sunng87/node-geohash/blob/master/main.js#L127-L161
export const geohashToInt = (latitude, longitude, bitDepth) => {
  bitDepth = bitDepth || 52;

  let bitsTotal = 0;
  let combinedBits = 0;
  let mid = null;
  let maxLat = MAX_LAT;
  let minLat = MIN_LAT;
  let maxLon = MAX_LON;
  let minLon = MIN_LON;

  while (bitsTotal < bitDepth) {
    combinedBits *= 2;
    if (bitsTotal % 2 === 0) {
      mid = (maxLon + minLon) / 2;
      if (longitude > mid) {
        combinedBits += 1;
        minLon = mid;
      } else {
        maxLon = mid;
      }
    } else {
      mid = (maxLat + minLat) / 2;
      if (latitude > mid) {
        combinedBits += 1;
        minLat = mid;
      } else {
        maxLat = mid;
      }
    }
    bitsTotal++;
  }
  return combinedBits;
};

export const IDForTree = (data) => {
  const [common, scientific, city, lat, lng] = data;
  const hashed = geohashToInt(lat, lng, 52);
  const encoded = hashcode(`${city}-${common}-${scientific}-${hashed}`);
  return encoded;
};

export const GetId = (data) => {
  if (data.filter(Boolean).length === 5) {
    return IDForTree(data);
  }
  return null;
};
