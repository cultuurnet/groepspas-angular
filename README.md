## angular
The angular application for the groepspas project

## Configuration
Copy the config/config.dist.json file to config/config.json, and modify the configuration based on your environment.

```
{
  "publicPath": "http://localhost:3000", # the url where the application will be hosted. Example: http://www.uitpas.be/groepspas
  "apiUrl": "http://vagrant.loc/silex/web/", # The location of the API
  "baseUrl" : "", # The base url. Used for internal links. When hosted on www.uitpas.be/groepspas, set this to groepspas
  "title": "UitID Groepspas" # Title of the application
}
```

## Installation

```bash
$ npm install -g typescript
$ npm install -g webdriver-manager
$ npm install
$ npm start
```

## Production Build
```bash
$ npm run build
```

## Running Unit Tests
```bash
$ npm test
```

