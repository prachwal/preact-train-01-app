import { render } from 'preact';
import App from './App';
import ThemeProvider from './ThemeProvider';
import './styles/index.scss';

if (!document.getElementById('app')) {
  throw new Error('App root element not found');
}

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('app')!
);
