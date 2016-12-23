## DSP app

## Requirements
* node v6 (https://nodejs.org)

## Quick Start
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
|`API_BASE_URL`| The base URL for Drone API |


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

## Local deploy
    NODE_ENV=production npm run build
    NODE_ENV=production npm run start

## Heroku deploy

### Prerequisites
  - Heroku CLI

### set up
    npm run heroku:[ENV]:init
    npm run heroku:[ENV]:deploy

### update
    npm run heroku:[ENV]:deploy

`npm run heroku:[ENV]:init` will create a new git remote in current git repository and a new app in remote server.

`npm run heroku:[ENV]:deploy` line will push current branch to corresponding remote environment.

`ENV` can be 'prod', 'dev', 'staging', 'test'.
