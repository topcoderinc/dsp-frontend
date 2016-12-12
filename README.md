# dsp-fronted

## Requirements
* node v6 (https://nodejs.org)

## Quick Start
* `npm install -g nodemon`
* `npm install`
* `npm run dev`
* Navigate browser to `http://localhost:3000`


## Configuration
Configuration files are located under `config` dir.
See Guild https://github.com/lorenwest/node-config/wiki/Configuration-Files

|Name|Description|
|----|-----------|
|`PORT`| The port to listen|
|`GOOGLE_API_KEY`| The google api key see (https://developers.google.com/maps/documentation/javascript/get-api-key#key)|


## Install dependencies
`npm i`

## Running

|`npm run <script>`|Description|
|------------------|-----------|
|`build`|Build the app|
|`start`|Serves the app in prod mode (use `build` first).|
|`dev`|Start app in the dev mode.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|
|`test`|Run tests using [mocha-webpack](https://github.com/webpack/mocha-loader) for all `*.spec.(js|jsx)` files in the `src` dir.|

## Google Map
In this project module [react-google-maps](https://github.com/tomchentw/react-google-maps) is used to work with google maps. So it can be used for any new functionality.

# Challenges

## [30055900](https://www.topcoder.com/challenge-details/30055900)
## DONE
- All modules were rewritten almost from the scratch because the previous code was very buggy, hard to support and too far from the redux way which is used in the new project. This was the biggest job. Current code is much more robust and is 99% stateless.
- For most important parts detailed unit tests are written.
- Redrawing mission on the map was optimised, no unnecessary redrawing.
- Readme file was cleaned and updated with information about tests and module used to implement google maps for future developers.

## ADDITIONALLY
- These small things from `kbowerma` was added:
- - I know this was not in the challenge req but another thing that would be nice is if the label for PARAM4 changed to “Heading” only if NAV_WAYPOINT is selected. and PARAMA1 label changed to “hold time” only if NAV_WAYPOINT is selected.
- - IT should be, but home and take off should be pinned together with the first click, but then should be able to be dragged or updated with text separately
- All modules integrated with current project styles.
- Test environment was set up. It uses `Mocha`, `Chai` and `Enzyme`. Also, it supports `jsx`, `css-modules` and `webpack resolve aliases`. Even though it's implicitly the scope of the challenge, it was a tangible part.

## NOTES
- As there is no Authorization implemented in the project. In the API I've hardcoded automatic registering and authorization of a dumb user to make requests to the server.
- A lot of files in the repository had the `crlf` line endings. Though `eslint` and `.editorconfig` prescribe using `lf` line endings. So all files were converted to `lf` line endings to pass the linting process and follow configuration.
