import { isQueryLatLong } from '@/pages/Search/Search';

describe('Test logic in generating search results', () => {
  it('isQueryLatLong with text input', () => {
    expect(
      isQueryLatLong(
        '825 Milwaukee Ave, Deerfield, Illinois 60015, United States',
      ),
    ).toBeFalsy();
    expect(isQueryLatLong('thirty-seven,one hundred')).toBeFalsy();
    expect(isQueryLatLong('thirty')).toBeFalsy();
  });

  it('isQueryLatLong with invalid lat/long', () => {
    expect(isQueryLatLong('')).toBeFalsy();
    expect(isQueryLatLong('41')).toBeFalsy();
    expect(isQueryLatLong('41,')).toBeFalsy();
    expect(isQueryLatLong('37.77px, -122px')).toBeFalsy();
    expect(isQueryLatLong('37.77--,-122-')).toBeFalsy();
    expect(isQueryLatLong('37.77.12,-122')).toBeFalsy();
    expect(isQueryLatLong('37,-122,37,-122')).toBeFalsy();
    expect(isQueryLatLong('-122.3949618700733, 37.77538664389438')).toBeFalsy();
    expect(
      isQueryLatLong('-122.3949618700733775386643, 37.77538664389438775386643'),
    ).toBeFalsy();
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
    expect(isQueryLatLong('41.03/-99.08')).toBeTruthy();
    expect(
      isQueryLatLong('  37.77538664389438,  -122.3949618700733  '),
    ).toBeTruthy();
    expect(
      isQueryLatLong(' 37.77538664389438,\n-122.3949618700733 \r '),
    ).toBeTruthy();
  });
});
