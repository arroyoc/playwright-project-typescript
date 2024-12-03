# Playwright Test Suite for Authentication and Dashboard

## Overview

This project demonstrates a robust end-to-end testing suite for authentication workflows using **Playwright** and **TypeScript**. It includes tests for user sign-up, sign-in, and dashboard accessibility, implementing industry best practices like the Page Object Model (POM), dynamic waits, and dynamic email generation.

The base URL for the application under test is: [https://arroyoautomation.com](https://arroyoautomation.com).

## Key Features

- **Dynamic Email Generation**: Ensures unique emails for each test run.
- **Page Object Model (POM)**: Modular design for reusable and maintainable test code.
- **Dynamic Waits**: Avoids flaky tests by dynamically waiting for UI elements.
- **Cross-Browser Testing**: Compatible with Chromium, Firefox, and WebKit.
- **HTML Reporting**: Generates detailed test reports for debugging and analysis.

----

## Prerequisites

- Node.js (>=16.x)
- npm or Yarn
- Playwright installed globally (optional)


## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/playwright-project.git
   cd playwright-project

2. Install the required dependencies:
    npm install

3. Install Playwright browsers:
    npx playwright install


## Setup Instructions

Run All Tests:
    npx playwright test

Run Tests in Non-Headless Mode:
    npx playwright test --headed

Run a Specific Test File:
    npx playwright test tests/auth/signupTests.spec.ts

Run Tests in a Specific Browser:
    npx playwright test --project=chromium
    npx playwright test --project=firefox
    npx playwright test --project=webkit


## Generating Reports

View HTML Report:
    npx playwright show-report
