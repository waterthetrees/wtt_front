# waterthetrees

Water The Trees is a platform that crowd sources tree planting and maintenance. We believe in the power of trees to restore natural habitat for animals, insects, and fauna. We are interesting in continuous massive tree planting events to help sequester carbon and stabilize climate change extremes.

## Hacktoberfest!

We are participating in [hacktoberfest](https://hacktoberfest.com)!! Get 4 PR's merged and get a tree planted! 
We are looking for help with the following: [HELP WANTED PROJECT BOARD](https://github.com/orgs/waterthetrees/projects/2/views/7)
Our stack is React, Node, Mapbox, and Postgres. 

## Join Us!

Water the Trees is an open source project run by tree planting volunteers and developers at Code for America. We are looking for developers, designers, and tree planting volunteers to help us build this platform. We are also looking for tree planting organizations to help us build this platform. If you are interested in joining us, please email us at [info@waterthetrees.com](mailto:info@waterthetrees.com) or join our #project-waterthetrees channel on [slack](sfbrigade.slack.com).

### INSTALL GIT

1. install git https://git-scm.com/downloads
2. Install node with nvm
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
nvm install 18;
```

### CLONE REPO

1. Open terminal and run this

```shell
git clone https://github.com/waterthetrees/wtt_front.git;
cd wtt_front;
nvm use;
```

### BUILD AND START JUST FRONT END

1. Command T (on osx)

```shell
cd wtt_front;
npm run start:dev;
```

### BUILD AND START FULL STACK APP [FOLLOW DIRECTIONS HERE](https://github.com/waterthetrees/waterthetrees)

If you want to run wtt_server and wtt_db locally:
Run one of these to connect to your localhost instead of dev.waterthetrees.com.
```shell
npm run start;
npm run start:docker;
npm run start:nodemon;
```