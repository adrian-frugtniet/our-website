const express = require('express');
const app = express();

// Set up Nunjucks for rendering layouts
const nunjucks = require('nunjucks')
nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  express: app
});

const React = require('react');
const { renderToString } = require('react-dom/server')
const { match, RouterContext } = require('react-router')

import routes from '../routes'

app.get("*", (req, res)=>{
  let urlForRouter = (req.baseUrl + req.url)
  match({routes, location: urlForRouter}, (error, redirectLocation, renderProps)=>{
    if (error) {
      res.status(500).send(error.message)
    } else if(!renderProps) {
      res.status(500).send("Props not found for " + urlForRouter)
    } else {
      var reactContent = renderToString(
        <RouterContext {...renderProps} />
      );

      res.render('layout.html', {content: reactContent})
    }
  });
});

module.exports = app;