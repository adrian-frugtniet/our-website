# A simple client/server React stack

So you want to build a React app that renders on both the server and client? And all the existing literature seems written for nuclear physicists?

## Introduction

Don't laugh, but I've found building user interfaces in React refreshingly simple compared to what I'm used to from PHP and Ruby.

### Basic architecture

At the bottom of my pile of Express routes, I have an app that takes any route it's given and hands it off to React for rendering.  

## Keep React routes out of your root-level component

On the server side, you need to use `RouterContext`; on the client, you use `Router`. If you're using Redux, its `Provider` thingy needs to wrap the root-level object, which is one of those two.

You need your app routes to be in a separate module so that either of these can grab them, and so they can be designed in an agnostic way.

```jsx
# routes.jsx
module.exports = (
  <Route path="/" component={Home} />
)
```

## Use webpack-dev-middleware

I know, I know -- it's supposedly for "advanced" users. But I've found that when trying to build an isomorphic app, using `webpack-dev-server` requires me to bridge the webserver (which is rendering server-side components) to the dev server, and having them run in a single process makes things simpler, albeit at the cost of hot module reloading. (HMR is hot, but not so hot that I need to make developing my app a living hell.)

## Make CSS module loading a no-op outside webpack

## Move start, build, and other scripts into bash