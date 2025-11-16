import { memo, useContext } from 'preact/compat';
import { Theme } from './ThemeProvider';
import { Button, Card } from './components';

function App() {
  const { theme, setTheme, nextTheme } = useContext(Theme);

  return (
    <Card variant="elevated" shadow="medium" size="xl">
      <h1>Hello, Preact!</h1>
      <p>Welcome to your Preact training application.</p>
      <p>Current Theme: {theme}</p>
      <Button
        variant='primary'
        size="md"
        data-theme={theme}
        onClick={() => {
          const newTheme = nextTheme(theme);
          setTheme(newTheme);
        }}
      >
        Toggle Theme ({theme})
      </Button>

      <h2>Button Variants Demo</h2>
      
      <h3>Button Variants</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="disabled" disabled>Disabled</Button>
      </div>

      <h3>Semantic States</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Button semanticState="success">Success State</Button>
        <Button semanticState="error">Error State</Button>
        <Button semanticState="warning">Warning State</Button>
        <Button semanticState="info">Info State</Button>
      </div>

      <h3>Shadow Variants</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <Button shadow="light">Light Shadow</Button>
        <Button shadow="medium">Medium Shadow</Button>
        <Button shadow="heavy">Heavy Shadow</Button>
      </div>

      <h3>Size Variants</h3>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      <h3>Combined Examples</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary" shadow="medium" size="lg">Primary Large with Shadow</Button>
        <Button variant="success" semanticState="success" shadow="light">Success with State</Button>
        <Button variant="danger" size="sm" shadow="heavy">Danger Small Heavy</Button>
      </div>
    </Card>
  );
}

export default memo(App);
