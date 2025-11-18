import { useContext } from 'preact/compat';
import { LocationProvider, Router, Route } from 'preact-iso';
import { Theme } from './ThemeProvider';
import { Typography, Hamburger, ThemeIcon, ToggleButton } from './ui';
import type { ToggleItem } from './types';
import { ErrorBoundary, Navigation, Footer } from './components';
import { navigationConfig } from './data/navigation';
import { getRoutableItems } from './utils/navigation';
import { NotFound } from './pages';
import { themeSignal, isMobileMenuOpenSignal } from './application/signals';

import './App.scss';

function App() {
  const context = useContext(Theme);
  if (!context) {
    throw new Error('App must be used within ThemeProvider');
  }
  const { setTheme } = context;

  // Theme toggle items for ToggleButton
  const themeItems: ToggleItem[] = [
    {
      value: 'light',
      label: 'Light',
      icon: <ThemeIcon theme="light" />,
      ariaLabel: 'Switch to light theme',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: <ThemeIcon theme="dark" />,
      ariaLabel: 'Switch to dark theme',
    },
    {
      value: 'auto',
      label: 'Auto',
      icon: <ThemeIcon theme="auto" />,
      ariaLabel: 'Switch to auto theme',
    },
  ];

  const handleThemeChange = (newTheme: string) => {
    const theme = newTheme as 'light' | 'dark' | 'auto';
    themeSignal.value = theme;
    setTheme(theme);
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
                <ToggleButton
                  variant="icon"
                  items={themeItems}
                  value={themeSignal.value}
                  onChange={handleThemeChange}
                  ariaLabel="Toggle theme"
                  size="md"
                />
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
              <Navigation onNavigate={closeMobileMenu} />
            </aside>

            {/* Main Content with Dynamic Routing */}
            <main className="app-main">
              <Router>
                {/* Generate routes from navigation config */}
                {getRoutableItems(navigationConfig)
                  .filter(item => item.component && item.path)
                  .map(item => (
                    <Route
                      key={item.id}
                      path={item.path!}
                      component={item.component!}
                    />
                  ))}
                <Route default component={NotFound} />
              </Router>
            </main>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </LocationProvider>
    </ErrorBoundary>
  );
}

export default App;
