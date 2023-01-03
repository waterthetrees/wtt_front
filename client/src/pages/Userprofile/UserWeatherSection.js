import React, { useEffect, useState } from 'react';
import { useGeolocation } from '../UserLocation/useGeolocation';

export default function UserWeatherSection() {
  const date = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const month = months[date.getMonth()];
  const weekday = weekdays[date.getDay()];
  const day = date.getDay();

  const { data } = useGeolocation();

  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [compassDirection, setCompassDirection] = useState('');

  const fetchWeather = async () => {
    if (!data || temperature) return;
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${data?.coords?.latitude}&lon=${data?.coords?.longitude}&appid=${API_KEY}`,
    );
    const json = await response.json();
    console.log(json);
    setTemperature(json.main.temp);
    setWeather(json.weather[0].main);
    setCity(json.name);
    setCountry(json.sys.country);
    setWindSpeed(json.wind.speed);
    const points = Math.round(json.wind.deg / 22.5);
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
    const index = points % 16;

    setCompassDirection(directions[index]);
  };

  useEffect(() => {
    fetchWeather();
  }, [data]);

  console.log(data);

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
      <p>{weather}</p>
      <div style={{ display: 'flex' }}>
        <article
          style={{
            fontSize: '32px',
            borderRight: '1px solid white',
            paddingRight: '16px',
            marginRight: '16px',
          }}
        >
          {temperature}&deg;
        </article>
        <article style={{ display: 'flex', alignItems: 'center' }}>
          {weekday}, {day} {month}
          <br />
          {city}, {country}
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
          <p style={{ fontSize: '20px' }}>{windSpeed}km/h</p>
        </article>
        <article>
          <p>Wind Direction</p>
          <p style={{ fontSize: '20px' }}>{compassDirection}</p>
        </article>
        <article>
          <p>UVI</p>
          <p style={{ fontSize: '20px' }}>10</p>
        </article>
      </div>
    </section>
  );
}
