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
|`REACT_APP_AUTH0_CLIENT_ID`| The auth0 client id |
|`REACT_APP_AUTH0_CLIENT_DOMAIN`| The auth0 client domain |

### Auth0 setup
- Create an account on auth0.
- Click on clients in left side menu, it will redirect you to client page. Click on CREATE CLIENT button
  to create a new client.
- Copy the client id and client domain and export them as environment variables.
- Add `http://localhost:3000` as Allowed callback url's in client settings.

### Add social connections

### Facebook social connection
- To add facebook social connection to auth0, you have to create a facebook app.
  Go to facebook [developers](https://developers.facebook.com/apps) and create a new app.
- Copy the app secret and app id to auth0 social connections facebook tab.
- You have to setup the oauth2 callback in app oauth settings.
- For more information visit auth0 [docs](https://auth0.com/docs/connections/social/facebook)

### Google social connection
- For more information on how to connect google oauth2 client, visit official [docs](https://auth0.com/docs/connections/social/google)

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

