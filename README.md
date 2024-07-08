# Horse Racing Project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# run unit tests
npm run test:unit

```

## Description

This project is a horse racing game built with Typescript, Nuxt.js 2 and utilizes Vuex for state management with a responsive interface for optimal user experience.

## Features

- Randomly generate a list of 1-20 horses.
- Create a race schedule consisting of 6 runs.
- Start races sequentially with a single start button.
- Pause the race with the pause button.
- Display run results in order.
- Animate the horses during the race.

## Project Structure

`components/` Contains Vue components used throughout the project.

`pages/` The homepage of the application.

`store/` Vuex store directory, containing state management logic.

`utils/` Utility functions and constants used throughout the project.

- `constants` Constants used for horse colors and names.
- `horse`: TypeScript class and enum for managing individual horses.
  - `move()`: Moves the horse a random distance based on its condition until it reaches or exceeds targetDistance.
  - `getDistance()`: Retrieves the distance the horse has traveled.
  - `resetDistance()`: Resets the traveled distance and sets the status to Standing.
  - `stop()`: Sets the status to Standing, indicating the horse has stopped moving.
  - get `condition()`: Retrieves the horse's condition.
- `round`: TypeScript class for managing rounds of horse races.
  - `selectHorsesToRace()`: void: Randomly selects 10 horses from a given list to participate in the race.
  - `getResults()`: Returns an array of horse IDs that finished the race.
  - `getHorses()`: Returns the list of horses selected for the race.
- `helpers`: Provides functions for formatting ordinal numbers and generating table titles based on round data.

`assets/` Static assets such as images and styles.

- `_fonts` Contains Google Wittgenstein Italic Font file.
- `_variables` Contains SCSS variables defining colors, breakpoints for responsive design, and font styles for consistent theming across the project.
- `_mixins` Contains mixins for custom media screens.
- `svg` Contains SVG files for horse icons.

`tests/` Includes Jest tests for components, pages, and helpers folders.
