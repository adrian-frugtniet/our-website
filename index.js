// Server side entry point
require("babel-register");

// Make CSS requires no-op on the server
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};

const express = require('express');
const app = express();


const webpackConfig = require('./webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack')(webpackConfig);

app.use(webpackMiddleware(webpack, {
  publicPath: '/js/'
}));

const appRoutes = require('./app/server/app');
app.use(appRoutes);

const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT, ()=>{
  console.log('App is listening on port ' + listener.address().port);
});