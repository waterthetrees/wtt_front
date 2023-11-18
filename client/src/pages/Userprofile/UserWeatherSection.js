import React, { useEffect, useState } from 'react';
import { useGeolocation } from '../UserLocation/useGeolocation';
import { styled } from '@mui/material';

const WeatherSection = styled('section')`
  margin: 48px;
  width: 300px;
  height: 200px;
  border-radius: 6px;
  background-color: rgb(127, 210, 244);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TemperatureArticle = styled('article')`
  font-size: 32px;
  border-right: 1px solid white;
  padding-right: 16px;
  margin-right: 16px;
`;

const DateArticle = styled('article')`
  display: flex;
  align-items: center;
`;

const MoreInfoContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 0;
  align-self: bottom;
`;

const ValueParagraph = styled('p')`
  font-size: 20px;
`;

const ONE_HOUR = 1000 * 60 * 60;
const WEATHER_CACHE = 'WEATHER_CACHE';

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
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const weekday = currentDate.toLocaleString('default', { weekday: 'long' });
  const day = currentDate.getDate();

  const { data } = useGeolocation({ watching: false });

  // Pleae, add your API_KEY
  const API_KEY = 'write_the_key_here';

  const [weather, setWeatherAPI] = useState({});

  const findDirection = (degrees) => {
    const points = Math.round(degrees / 22.5);
    const index = points % 16;
    const direction = directions[index];
    return direction;
  };

  const fetchWeather = async () => {
    const weatherStorage = JSON.parse(localStorage.getItem(WEATHER_CACHE));
    if (weatherStorage && weatherStorage.expiry > currentDate) {
      setWeatherAPI(weatherStorage.weather);
      return;
    }
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${data?.coords?.latitude}&lon=${data?.coords?.longitude}&appid=${API_KEY}`,
    );
    const json = await response.json();

    const compassDirection = findDirection(json?.wind?.deg);

    const newWeather = {
      temperature: json?.main?.temp,
      weather: json?.weather[0]?.main,
      city: json?.name,
      country: json?.sys?.country,
      windSpeed: json?.wind?.speed,
      compassDirection: compassDirection,
    };

    setWeatherAPI(newWeather);
    localStorage.setItem(
      WEATHER_CACHE,
      JSON.stringify({
        expiry: currentDate.getTime() + ONE_HOUR,
        weather: newWeather,
      }),
    );
  };

  useEffect(() => {
    if (!data || weather.temperature) return;
    fetchWeather();
  }, [data]);

  return (
    <WeatherSection>
      <p>{weather.weather}</p>
      <div style={{ display: 'flex' }}>
        <TemperatureArticle>{weather.temperature}&deg;</TemperatureArticle>
        <DateArticle>
          {weekday}, {day} {month}
          <br />
          {weather.city}, {weather.country}
        </DateArticle>
      </div>
      <MoreInfoContainer>
        <article>
          <p>Wind Speed</p>
          <ValueParagraph>{weather.windSpeed}km/h</ValueParagraph>
        </article>
        <article>
          <p>Wind Direction</p>
          <ValueParagraph>{weather.compassDirection}</ValueParagraph>
        </article>
        <article>
          <p>UVI</p>
          <ValueParagraph>10</ValueParagraph>
        </article>
      </MoreInfoContainer>
    </WeatherSection>
  );
}
