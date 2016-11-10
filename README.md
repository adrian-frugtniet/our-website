# A simple client/server React stack

## Introduction

Over the last few months, I've found myself sucked into learning Node and React. Some people build model trains; some people knit. I make tiny web applications for fun.

Don't laugh, but I've found building user interfaces in React refreshingly simple compared to what I'm used to from PHP and Ruby. React apps are built on a strong inner skeleton: your data. Unlike a Rails app, where you construct HTML templates out of a rat's nest of function calls and instance variables, React apps begin and end with data. What's more, the component model encourages not only sane reuse, but logical separation of concerns, a bit of structural hygiene that makes apps easier to reason about.

That's the good stuff. The trade-off is that React apps rely on a shaky Jenga tower of NPM modules, language features, and other dependencies, which it's on you as a greenhorn JavaScript coder to figure out. A lot of the literature around React is like a pamphlet from a cargo cult; you get lots of details on how to do things, but not _why_ those things should be done or how they work. And because those fundamentals aren't well explained, it's harder for us part-timers to adapt when the best practices change. (Which they do. A lot.)

So you want to build a React app that renders on both the server and client? And all the existing literature seems written for nuclear physicists?

## The features I want

**Server-side rendering:** 



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