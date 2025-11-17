import { useContext } from 'preact/compat';
import { Theme } from './ThemeProvider';
import { Button, Card, Typography } from './ui';
import { CardDemo } from './components/CardDemo';

function App() {
  const context = useContext(Theme);
  if (!context) {
    throw new Error('App must be used within ThemeProvider');
  }
  const { theme, setTheme, nextTheme } = context;

  const handleThemeToggle = () => setTheme(nextTheme(theme));

  return (
    <Card
      variant="default"
      shadow="none"
      size="xl"
      borderRadius="none"
      borderWidth="none"
    >
      <Typography variant="h1" gutterBottom>
        Hello, Preact!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to your Preact training application.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Current Theme: {theme}
      </Typography>
      <Button variant="primary" size="md" onClick={handleThemeToggle}>
        Toggle Theme ({theme})
      </Button>
      <Typography variant="h2" gutterBottom>
        Button Variants Demo
      </Typography>
      <CardDemo />
    </Card>
  );
}

export default App;
