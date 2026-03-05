import { useEffect, useState } from 'react';
import { api } from './api/api';
import DarkMode from './assets/dark-mode.svg?react';
import LightMode from './assets/light-mode.svg?react';
import PartlyCloudyDay from './assets/partly-cloudy-day.svg?react';
import Button from './components/button/Button';
import Card from './components/card/Card';
import Page from './components/page/Page';
import type { OpenMeteoReponse } from './types/OpenMeteoResponse';
import fahrenheitToCelsius from './utils/fahrenheitToCelsius';

type Status = 'LOADING' | 'SUCCESS' | 'ERROR';

export default function App() {
  const [darkTheme, setDarkTheme] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      document.documentElement.getAttribute('theme') === 'dark',
  );

  const [status, setStatus] = useState<Status>('LOADING');

  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute(
      'theme',
      darkTheme ? 'dark' : 'light',
    );

    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus('SUCCESS');

        setPosition(position);
      },
      () => setStatus('ERROR'),
      {
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: 300_000,
      },
    );
  }, []);

  useEffect(() => {
    if (status != 'SUCCESS' || !position) {
      return;
    }

    const fetchData = async () => {
      try {
        const latitude = position.coords.latitude;

        const longitude = position.coords.longitude;

        const response = (
          await api.get(
            `/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
          )
        ).data as OpenMeteoReponse;

        const celsius = response.current_units.temperature_2m.includes('C');

        setTemperature(
          celsius
            ? response.current.temperature_2m
            : fahrenheitToCelsius(response.current.temperature_2m),
        );
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchData();
  }, [status]);

  if (status == 'LOADING') {
    return (
      <Page>
        <h2>Getting your location...</h2>

        <Button
          className="themeToggleButton"
          onClick={() => setDarkTheme((prev) => !prev)}
        >
          {darkTheme ? <LightMode /> : <DarkMode />}
        </Button>
      </Page>
    );
  }

  if (status == 'ERROR') {
    return (
      <Page>
        <h2>Unable to determine your location.</h2>

        <p>Please check your GPS or internet connection.</p>

        <Button
          className="themeToggleButton"
          onClick={() => setDarkTheme((prev) => !prev)}
        >
          {darkTheme ? <LightMode /> : <DarkMode />}
        </Button>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <PartlyCloudyDay className="icon" />

        <h1>Tenki</h1>
      </Card>

      {temperature && <h3>{temperature.toFixed(0)}º</h3>}

      <Button
        className="themeToggleButton"
        onClick={() => setDarkTheme((prev) => !prev)}
      >
        {darkTheme ? <LightMode /> : <DarkMode />}
      </Button>
    </Page>
  );
}
