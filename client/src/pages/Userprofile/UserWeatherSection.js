import React, { useEffect, useState } from 'react';
import { useGeolocation } from '../UserLocation/useGeolocation';

const directions = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
];

export default function UserWeatherSection() {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const weekday = date.toLocaleString('default', { weekday: 'long' });
  const day = date.getDate();

  const { data } = useGeolocation({ watching: false });

  const [weather, setWeatherAPI] = useState({})

  const findDirection = (degrees) => {
    const points = Math.round(degrees / 22.5)
    const index = points % 16;
    const direction = directions[index]
    return direction
  }

  const fetchWeather = async () => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${data?.coords?.latitude}&lon=${data?.coords?.longitude}&appid=${API_KEY}`,
    );
    const json = await response.json();
    
    const compassDirection = findDirection(json?.wind?.deg)
    
    setWeatherAPI({
      temperature: json?.main?.temp,
      weather: json?.weather[0]?.main,
      city: json?.name,
      country: json?.sys?.country,
      windSpeed: json?.wind?.speed,
      compassDirection: compassDirection
    })
  };

  useEffect(() => {
    if (!data || weather.temperature) return;
    fetchWeather();
  }, [data]);

  return (
    <section
      style={{
        margin: '48px',
        width: '300px',
        height: '200px',
        borderRadius: '6px',
        backgroundColor: 'rgb(127, 210, 244)',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p>{weather.weather}</p>
      <div style={{ display: 'flex' }}>
        <article
          style={{
            fontSize: '32px',
            borderRight: '1px solid white',
            paddingRight: '16px',
            marginRight: '16px',
          }}
        >
          {weather.temperature}&deg;
        </article>
        <article style={{ display: 'flex', alignItems: 'center' }}>
          {weekday}, {day} {month}
          <br />
          {weather.city}, {weather.country}
        </article>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 'auto',
          marginBottom: '0',
          alignSelf: 'bottom',
        }}
      >
        <article>
          <p>Wind Speed</p>
          <p style={{ fontSize: '20px' }}>{weather.windSpeed}km/h</p>
        </article>
        <article>
          <p>Wind Direction</p>
          <p style={{ fontSize: '20px' }}>{weather.compassDirection}</p>
        </article>
        <article>
          <p>UVI</p>
          <p style={{ fontSize: '20px' }}>10</p>
        </article>
      </div>
    </section>
  );
}
