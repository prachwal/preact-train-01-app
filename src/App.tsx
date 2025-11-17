import { useContext } from 'preact/compat';
import { LocationProvider, Router, Route } from 'preact-iso';
import { Theme } from './ThemeProvider';
import { Button, Typography, Hamburger, ThemeIcon } from './ui';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home, Settings, About, NotFound } from './pages';
import { themeSignal, isMobileMenuOpenSignal } from './application/signals';
// @ts-ignore
import packageJson from '../package.json';

import './App.scss';

function App() {
  const context = useContext(Theme);
  if (!context) {
    throw new Error('App must be used within ThemeProvider');
  }
  const { setTheme, nextTheme } = context;

  const handleThemeToggle = () => {
    const currentTheme = themeSignal.value;
    const newTheme = nextTheme(currentTheme);
    themeSignal.value = newTheme;
    setTheme(newTheme);
  };

  const toggleMobileMenu = () => {
    isMobileMenuOpenSignal.value = !isMobileMenuOpenSignal.value;
  };

  const closeMobileMenu = () => {
    isMobileMenuOpenSignal.value = false;
  };

  return (
    <ErrorBoundary>
      <LocationProvider>
        <div className="app-wrapper">
          {/* Professional Header with Hamburger */}
          <header className="app-header">
            <div className="app-header__container">
              <div className="app-header__left">
                <Hamburger
                  isOpen={isMobileMenuOpenSignal.value}
                  onClick={toggleMobileMenu}
                  ariaLabel="Toggle navigation menu"
                />
                <Typography variant="h1" className="app-header__title">
                  Preact Training
                </Typography>
              </div>
              <nav className="app-header__nav">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleThemeToggle}
                  className="app-header__theme-btn"
                  aria-label={`Switch to ${nextTheme(themeSignal.value)} theme`}
                >
                  <ThemeIcon theme={themeSignal.value} />
                </Button>
              </nav>
            </div>
          </header>

          {/* Mobile Sidebar Overlay */}
          {isMobileMenuOpenSignal.value && (
            <div className="app-mobile-overlay" onClick={closeMobileMenu} />
          )}

          {/* Main Layout Container */}
          <div className="app-container">
            {/* Aside Navigation */}
            <aside
              className={`app-aside ${
                isMobileMenuOpenSignal.value ? 'app-aside--open' : ''
              }`}
            >
              <nav
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <a
                  href="/"
                  style={{
                    padding: '0.75rem 1rem',
                    textDecoration: 'none',
                    color: 'var(--pta-color-text-primary)',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={closeMobileMenu}
                >
                  <Typography variant="body1">🏠 Home</Typography>
                </a>
                <a
                  href="/settings"
                  style={{
                    padding: '0.75rem 1rem',
                    textDecoration: 'none',
                    color: 'var(--pta-color-text-primary)',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={closeMobileMenu}
                >
                  <Typography variant="body1">⚙️ Settings</Typography>
                </a>
                <a
                  href="/about"
                  style={{
                    padding: '0.75rem 1rem',
                    textDecoration: 'none',
                    color: 'var(--pta-color-text-primary)',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s',
                  }}
                  onClick={closeMobileMenu}
                >
                  <Typography variant="body1">ℹ️ About</Typography>
                </a>
              </nav>
            </aside>

            {/* Main Content with Routing */}
            <main className="app-main">
              <Router>
                <Route path="/" component={Home} />
                <Route path="/settings" component={Settings} />
                <Route path="/about" component={About} />
                <Route default component={NotFound} />
              </Router>
            </main>
          </div>

          {/* Footer */}
          <footer className="app-footer">
            <Typography
              variant="caption"
              color="tertiary"
              align="center"
              gutterBottom={false}
            >
              © 2025 Preact Training v{packageJson.version} · Built with Preact
              + TypeScript + Vite
            </Typography>
          </footer>
        </div>
      </LocationProvider>
    </ErrorBoundary>
  );
}

export default App;
