# Playwright MCP Setup Guide

This guide explains how to set up and use the Playwright MCP (Model Context Protocol) server for automated browser testing of the Berserk Tattoos website.

## Prerequisites

Before setting up the MCP server, ensure you have the following installed:

1. **Node.js** (version 14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

## Installation Steps

### 1. Install Dependencies

Navigate to the project directory and install the required packages:

```bash
cd berserk-tattoos-website
npm install
```

This will install all dependencies including:
- `@playwright/test` - Playwright testing framework
- `playwright` - Browser automation
- `@playwright/mcp` - MCP server integration

### 2. Install Browser Binaries

After installing dependencies, install the browser binaries:

```bash
npx playwright install
```

This downloads the necessary browser binaries for Chromium, Firefox, and WebKit.

### 3. Verify Installation

Test that everything is working:

```bash
npx playwright --version
```

## Configuration Files

### MCP Configuration (`mcp-config.json`)

The MCP server configuration is stored in `mcp-config.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    }
  }
}
```

### Playwright Configuration (`playwright.config.js`)

The Playwright test configuration includes:
- Test directory: `./tests`
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile device testing
- Local development server setup
- Screenshot and video recording on failures

## Running Tests

### Available Scripts

The following npm scripts are available:

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in headed mode (visible browser)
npm run test:headed

# Debug tests
npm run test:debug

# Start MCP server
npm run mcp:start
```

### Test Categories

The test suite includes:

1. **Homepage Tests** (`tests/homepage.spec.js`)
   - Page loading and navigation
   - Artist cards display
   - Gallery functionality
   - Contact information
   - Mobile responsiveness
   - SEO meta tags
   - Accessibility features

2. **Booking Tests** (`tests/booking.spec.js`)
   - Booking form functionality
   - Form validation
   - Artist selection

3. **Artists Tests** (`tests/artists.spec.js`)
   - Artist page loading
   - Portfolio display
   - Booking integration

4. **Performance Tests** (`tests/performance.spec.js`)
   - Page load times
   - Core Web Vitals
   - Image optimization
   - Mobile optimization
   - JavaScript error checking

## MCP Server Usage

### Starting the MCP Server

To start the Playwright MCP server:

```bash
npm run mcp:start
```

This will start the MCP server that can be used by AI assistants and other tools to interact with your website through browser automation.

### MCP Server Features

The MCP server provides:
- Browser automation capabilities
- Screenshot capture
- Form interaction
- Navigation testing
- Performance monitoring
- Accessibility testing

## Development Workflow

### 1. Local Development Server

The Playwright configuration includes a local development server that starts automatically when running tests:

```javascript
webServer: {
  command: 'python -m http.server 3000',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}
```

### 2. Running Tests During Development

While developing, you can run tests in watch mode:

```bash
npx playwright test --watch
```

### 3. Debugging Tests

For debugging specific tests:

```bash
npx playwright test --debug tests/homepage.spec.js
```

## CI/CD Integration

### GitHub Actions

Add this workflow to `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout: 60m
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## Troubleshooting

### Common Issues

1. **Node.js not found**
   - Install Node.js from [nodejs.org](https://nodejs.org/)
   - Restart your terminal after installation

2. **Browser binaries missing**
   - Run `npx playwright install`
   - Check your internet connection

3. **Tests failing**
   - Ensure the local server is running
   - Check that all required files exist
   - Verify image paths are correct

4. **MCP server not starting**
   - Check Node.js version (14+ required)
   - Verify npm packages are installed
   - Check for port conflicts

### Getting Help

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [Node.js Documentation](https://nodejs.org/docs/)

## Next Steps

1. **Customize Tests**: Modify test files to match your specific requirements
2. **Add More Tests**: Create additional test files for new features
3. **Performance Monitoring**: Set up continuous performance monitoring
4. **Accessibility Testing**: Enhance accessibility test coverage
5. **Visual Regression**: Add visual regression testing capabilities

## Maintenance

### Regular Updates

Keep dependencies updated:

```bash
npm update
npx playwright install
```

### Test Maintenance

- Review and update tests when adding new features
- Remove obsolete tests
- Update selectors when UI changes
- Monitor test execution times

---

For questions or issues, refer to the project documentation or contact the development team.
