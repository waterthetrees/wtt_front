# waterthetrees

Water The Trees is a platform that crowd sources tree planting and maintenance. We believe in the power of trees to restore natural habitat for animals, insects, and fauna. We are interesting in continuous massive tree planting events to help sequester carbon and stabilize climate change extremes.

## Join Us!

https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit
Water the Trees is an open source project run by tree planting volunteers at Sierra Club, Public Works, and developers at Code for America.

### INSTALL GIT

1. install git https://git-scm.com/downloads

### INSTALL DOCKER

1. install docker https://www.docker.com/get-started
2. install docker-compose (only on linux, on osx this installs with docker)

### CLONE REPO

1. Open terminal and run this

```shell
$ git clone https://github.com/waterthetrees/waterthetrees.git
$ cd waterthetrees
```

### BUILD AND START THE DOCKER

1. run shell script to clone all repos and do docker-compose:

```shell
$ ./install_and_build.sh
```

### OPEN TABS and start the servers

1. Command T (on osx)

```shell
$ cd wtt_front;npm start;
```

2. Command T (on osx)

```shell
$ cd wtt_server;npm start;
```

# OTHER STUFF TO INSTALL IF YOU ARE NEW TO NODE DEVELOPMENT

## Install Node.js 14.x and npm

1. On linux

```
$ sudo apt-get install -y nodejs
```

1. On OSX
   https://nodejs.org/en/download/
   https://github.com/tj/n

```
$ npm install -g n
```

## You may also need development tools to build native addons:

1. On linux

```
$ sudo apt-get install gcc g++ make
```

1. On OSX

```
$ xcode-select --install
```

## To install the Yarn package manager, run:

1. On linux

```
$ curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt-get update && sudo apt-get install yarn
```
 

