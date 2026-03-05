import { useEffect, useState } from 'react';
import DarkMode from './assets/dark-mode.svg?react';
import LightMode from './assets/light-mode.svg?react';
import PartlyCloudyDay from './assets/partly-cloudy-day.svg?react';
import Button from './components/button/Button';
import Card from './components/card/Card';
import Page from './components/page/Page';

type Status = 'LOADING' | 'SUCCESS' | 'ERROR';

export default function App() {
  const [darkTheme, setDarkTheme] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      document.documentElement.getAttribute('theme') === 'dark',
  );

  const [status, setStatus] = useState<Status>('LOADING');

  useEffect(() => {
    document.documentElement.setAttribute(
      'theme',
      darkTheme ? 'dark' : 'light',
    );

    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setStatus('SUCCESS');
      },
      () => setStatus('ERROR'),
      {
        enableHighAccuracy: false,
        timeout: 10_000,
        maximumAge: 300_000,
      },
    );
  }, []);

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

      <h2>20º</h2>

      <Button
        className="themeToggleButton"
        onClick={() => setDarkTheme((prev) => !prev)}
      >
        {darkTheme ? <LightMode /> : <DarkMode />}
      </Button>
    </Page>
  );
}
