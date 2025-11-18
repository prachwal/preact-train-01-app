// Footer Component - Rich footer with links and information

import { Typography, Grid } from '../ui';
import { TwitterIcon, GitHubIcon, DiscordIcon } from '../ui/Icons';
// @ts-ignore
import packageJson from '../../package.json';
import './Footer.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pta-footer">
      <div className="pta-footer__container">
        <Grid
          direction="row"
          gap="xl"
          wrap={true}
          justify="between"
          className="pta-footer__grid"
        >
          {/* About Section */}
          <div className="pta-footer__section">
            <Typography variant="h6" gutterBottom className="pta-footer__title">
              Preact Training
            </Typography>
            <Typography variant="caption" color="tertiary">
              A modern Single Page Application built with Preact, TypeScript,
              and Vite. Demonstrating best practices for component architecture,
              state management, and responsive design.
            </Typography>
            <div className="pta-footer__version">
              <Typography variant="caption" color="tertiary">
                Version {packageJson.version}
              </Typography>
            </div>
          </div>

          {/* Quick Links */}
          <div className="pta-footer__section">
            <Typography variant="h6" gutterBottom className="pta-footer__title">
              Quick Links
            </Typography>
            <nav className="pta-footer__links">
              <a href="/" className="pta-footer__link">
                Home
              </a>
              <a href="/settings" className="pta-footer__link">
                Settings
              </a>
              <a href="/about" className="pta-footer__link">
                About
              </a>
            </nav>
          </div>

          {/* Resources */}
          <div className="pta-footer__section">
            <Typography variant="h6" gutterBottom className="pta-footer__title">
              Resources
            </Typography>
            <nav className="pta-footer__links">
              <a
                href="https://preactjs.com/guide/v10/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="pta-footer__link"
              >
                Documentation ↗
              </a>
              <a
                href="https://github.com/preactjs/preact"
                target="_blank"
                rel="noopener noreferrer"
                className="pta-footer__link"
              >
                Preact on GitHub ↗
              </a>
              <a
                href="https://vitejs.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="pta-footer__link"
              >
                Vite Documentation ↗
              </a>
            </nav>
          </div>

          {/* Legal & Contact */}
          <div className="pta-footer__section">
            <Typography variant="h6" gutterBottom className="pta-footer__title">
              Legal & Contact
            </Typography>
            <nav className="pta-footer__links">
              <a href="/privacy" className="pta-footer__link">
                Privacy Policy
              </a>
              <a href="/terms" className="pta-footer__link">
                Terms of Service
              </a>
              <a href="mailto:contact@example.com" className="pta-footer__link">
                Contact Us
              </a>
              <a
                href="https://github.com/your-username/preact-train-01-app"
                target="_blank"
                rel="noopener noreferrer"
                className="pta-footer__link"
              >
                Project GitHub ↗
              </a>
            </nav>
          </div>
        </Grid>

        {/* Bottom Bar */}
        <div className="pta-footer__bottom">
          <Typography variant="caption" color="tertiary" align="center">
            © {currentYear} Preact Training App · Built with ❤️ using Preact,
            TypeScript & Vite
          </Typography>
          <div className="pta-footer__social">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pta-footer__social-link"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pta-footer__social-link"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pta-footer__social-link"
              aria-label="Discord"
            >
              <DiscordIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
