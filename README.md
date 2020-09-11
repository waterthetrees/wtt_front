# wtt

## wtt_front

## Features

- React
- React Router
- Redux
- Bootstrap4
- Reactstrap
- Webpack build
- Sass styles

## Quick Start

#### 1. Get the latest version

Clone the latest version of the Portal to your machine by running:

```shell
$ git clone https://github.com/waterthetrees/wtt_front.git
$ cd wtt_front
```

...and install Webpack:

```shell
# Install Webpack globally
$ yarn global add --save-dev webpack
$ yarn global add --save-dev webpack-cli

```

In the future (when we get around to it), we should install webpack locally instead of globally.

#### 2. Install dependencies.

```shell
$ yarn install
```

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.

#### 3. START ER UP

##### Build bundle

```shell
$ webpack # to build bundle once
$ webpack -w # to watch for dev changes continuously

```

If you installed webpack globally, you may have to use a slightly different command:

```shell
$ ./node_modules/.bin/webpack
$ ./node_modules/.bin/webpack -w
```

##### Start React pages server

```shell
# use dev or live instead of local when relevant
$ yarn start local
$ node server/server-dashboard.js local
```

### License

Code written by Rose Meyers, Victoria Tan
Design by Vivien Muller

All code released under Creative Commons Attribution Non-Commercial (CC-BY-NC 4.0)

https://creativecommons.org/licenses/by-nc/4.0/
