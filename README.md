# webtrack-assessment

webtrack-assessment is a simple CRUD application built using mongo, 
nodejs and express. It is written using ES6 javascript and it 
incorporates babel for transpiling server-side code to ES5 and webpack 
for bundling  client-side modules

## Quickstart 
```
  clone the repo
  cd into repo directory
  setup a .env file in the project root directory with the following fields:
    ENV
    mongoDBDev
    mongoDBProd
  npm install
  npm run build
  npm start
```
**Note : Please make sure your MongoDB is running.** 
For MongoDB installation guide 
see [this](https://docs.mongodb.org/v3.0/installation/). 
You can also set up a mongo database on [Mongolab](https://mlab.com/)

Also you may want to change the node and npm version in package.json to the version 
you're running. `npm3` is required to install dependencies properly.

## In Development
1. Set `ENV=development` in .env file
2. Set `mongoDBDev=connection_string` in .env file
3. Run command `npm run build`  
4. Run command `npm start`
5. Navigate to `localhost:3000` in your browser

## In Production
1. Set `ENV=production` in .env file
2. Set `mongoDBProd=connection_string` in .env file
3. Run command `npm run build`  
3. Run command `npm run production-bundle`  
4. Run command `npm start`
5. Navigate to `localhost:3000` in your browser

## Heroku Deployment
Consult [this documentation](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
**Note: You will need to set up config vars**. To configure `ENV` and 
`mongoDBProd` options. The Procfile is setup already. **Using Heroku CLI, 
You will have to run** `heroku config:set NPM_CONFIG_PRODUCTION=false`
in order to install devdependencies for building and bundling code.


### Webpack Configuration
webtrack-assessment uses Webpack for bundling modules. There are two 
types of webpack config provided: `webpack.config.js` for development 
and `webpack.prod.config.js` for production.

### Available commands
1. `npm start` - starts express server with hot loading enabled
2. `npm run lint` - runs eslint to check for lint errors
3. `npm run removebuild` - deletes build folder
4. `npm run transpile` - converts server-side ES6 code to ES5 build
5. `npm run build` - removes build folder and converts server-side ES6 code to ES5 build
6. `npm run production-bundle` - creates client-side production bundle
7. `npm run postinstall` - command runs after installation of node modules - 
    useful on code deploy to cloud providers like heroku
8. `npm run heroku-postbuild` - heroku specific command that builds 
    client-side production assets


