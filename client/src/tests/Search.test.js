import { isQueryLatLong } from '@/pages/Search/Search';

describe('Test logic in generating search results', () => {
  it('isQueryLatLong with text input', () => {
    expect(
      isQueryLatLong(
        '825 Milwaukee Ave, Deerfield, Illinois 60015, United States',
      ),
    ).toBeFalsy();
  });

  it('isQueryLatLong with invalid lat/long', () => {
    expect(isQueryLatLong('')).toBeFalsy();
  });

  it('isQueryLatLong with valid lat/long', () => {
    expect(isQueryLatLong('37.77538664389438,-122.3949618700733')).toBeTruthy();
    expect(isQueryLatLong('37,-122')).toBeTruthy();
    expect(isQueryLatLong('37.77,-122.39')).toBeTruthy();
  });

  it('isQueryLatLong with valid lat/long with weird formatting', () => {
    expect(
      isQueryLatLong('37.77538664389438, -122.3949618700733'),
    ).toBeTruthy();
    expect(
      isQueryLatLong('  37.77538664389438,  -122.3949618700733  '),
    ).toBeTruthy();
    expect(
      isQueryLatLong(' 37.77538664389438,\n-122.3949618700733 \r '),
    ).toBeTruthy();
  });
});
