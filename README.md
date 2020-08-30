# wtt
## wtt_front

## Features
* React
* React Router
* Redux
* Bootstrap4
* Reactstrap
* Webpack build
* Sass styles

## Quick Start

#### 1. Get the latest version

Clone the latest version of the Portal to your machine by running:

```shell
$ git clone https://github.com/waterthetrees/wtt_front.git
$ cd wtt_front
# Install webpack globally
$ yarn global add --save-dev webpack
# or specific version
$ yarn global add --save-dev webpack@<version>
$ yarn global add --save-dev webpack-cli
```

#### 2. Run `yarn install`

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.


#### 3. API endpoints


* Backend endpoints
```shell
$ server/server-dashboard.js
``` 

#### 4. START ER UP

To build bundle once
```shell
$ webpack
```
If you want to watch for dev changes continuously
```shell
$ webpack -w
```
Start react pages server - change local to dev or live
```shell
$ yarn start local
```

```shell
$ node server/server-dashboard.js local
```

### License
Code written by Rose Meyers, Victoria Tan
Design by Vivien Muller

All code released under Creative Commons Attribution Non-Commercial (CC-BY-NC 4.0)

https://creativecommons.org/licenses/by-nc/4.0/