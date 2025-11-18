# Preact Train 01 App

[![CI/CD Pipeline](https://github.com/prachwal/preact-train-01-app/actions/workflows/ci.yml/badge.svg)](https://github.com/prachwal/preact-train-01-app/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/prachwal/preact-train-01-app/branch/main/graph/badge.svg)](https://codecov.io/gh/prachwal/preact-train-01-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

A comprehensive single-page application built with Preact, Vite, and TypeScript, featuring a complete design system, multiple pages, and extensive testing setup.

## 🚀 Features

- **Modern Tech Stack**: Preact + Vite + TypeScript
- **Design System**: Complete UI component library with 10+ reusable components
- **Routing**: Client-side routing with preact-iso
- **State Management**: @preact/signals for reactive state
- **Theming**: Light/dark/auto theme support with localStorage persistence
- **Testing**: Comprehensive unit tests (Vitest) and e2e tests (Playwright)
- **Build Tools**: Vite for fast development and optimized production builds
- **Code Quality**: TypeScript, ESLint, Stylelint, Prettier
- **Documentation**: Storybook for component documentation
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Deployment**: GitHub Pages ready

## 📦 Tech Stack

- **Framework**: [Preact](https://preactjs.com/) - Fast 3kB alternative to React
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling
- **Language**: [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- **Styling**: SCSS with BEM methodology
- **State**: [@preact/signals](https://preactjs.com/guide/v10/signals/) - Reactive state management
- **Routing**: [preact-iso](https://github.com/preactjs/preact-iso) - Isomorphic routing
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Linting**: ESLint + Stylelint
- **Deployment**: GitHub Pages

## 🏗️ Project Structure

```text
src/
├── application/     # Global state signals
├── data/           # Navigation and configuration data
├── pages/          # Page components (Home, Settings, etc.)
├── services/       # Business logic services
├── styles/         # SCSS stylesheets
├── test/           # Unit tests
├── types/          # TypeScript definitions
├── ui/             # Reusable UI components
└── config/         # Application configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/prachwal/preact-train-01-app.git
cd preact-train-01-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
# Open http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run build && npm run preview
```

## 🧪 Testing

```bash
# Run unit tests
npm run test:run

# Run unit tests with coverage
npm run test:run -- --coverage

# Run e2e tests (locally)
npm run test:e2e

# Run type checking
npm run type-check

# Run CSS linting
npm run lint:css
```

## 📚 Documentation

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## 🚀 Deployment

The application is automatically deployed to GitHub Pages on every push to the `main` branch via GitHub Actions.

- **Production URL**: <https://prachwal.github.io/preact-train-01-app/>
- **CI/CD Pipeline**: Comprehensive testing and deployment workflow

## 🎨 Design System

### Components

- **Button** - Versatile button component with variants and states
- **Card** - Content container with shadows and borders
- **Input** - Form input with validation and icons
- **Select** - Dropdown select with search functionality
- **Typography** - Text styling with semantic variants
- **Grid** - Responsive layout grid
- **Modal** - Overlay dialog component
- **Switch** - Accessible toggle component
- **Hamburger** - Animated menu icon
- **ThemeIcon** - Theme switcher

### Theming

- **Light Theme**: Clean, bright interface
- **Dark Theme**: Easy on the eyes for low-light environments
- **Auto Theme**: Respects system preference
- **Persistent**: Theme choice saved in localStorage

## 📊 Bundle Analysis

- **CSS**: < 12KB gzipped
- **JS**: < 38KB gzipped
- **Total**: Optimized for fast loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Preact](https://preactjs.com/) - Fast alternative to React
- [Vite](https://vitejs.dev/) - Next generation build tool
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vitest](https://vitest.dev/) - Fast unit testing framework
- [Playwright](https://playwright.dev/) - End-to-end testing
- [Storybook](https://storybook.js.org/) - Component documentation

---

Built with ❤️ using Preact and modern web technologies.
