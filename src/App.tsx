import { useEffect, useState } from 'react';
import DarkMode from './assets/dark-mode.svg?react';
import LightMode from './assets/light-mode.svg?react';
import Button from './components/button/Button';
import Card from './components/card/Card';
import Page from './components/page/Page';

export default function App() {
  const [darkTheme, setDarkTheme] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      document.documentElement.getAttribute('theme') === 'dark',
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      'theme',
      darkTheme ? 'dark' : 'light',
    );

    localStorage.setItem('theme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  return (
    <Page>
      <Card>
        <h1>Tenki</h1>
      </Card>

      <Button
        className="themeToggleButton"
        onClick={() => setDarkTheme((prev) => !prev)}
      >
        {darkTheme ? <LightMode /> : <DarkMode />}
      </Button>
    </Page>
  );
}
