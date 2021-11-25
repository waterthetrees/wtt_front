# Water the Trees - Frontend

Water the Trees (WTT) is a platform for crowd-sourced tree-planting and maintenance. We believe in the power of trees to restore natural habitats for wildlife and sequester carbon to stabilize the effects of climate change. 

WTT is an open-source project run by volunteers at [Sierra Club San Francisco Bay Chapter](https://www.sierraclub.org/san-francisco-bay), [San Francisco Public Works](https://www.sfpublicworks.org/), and [Code for San Francisco](https://www.sfpublicworks.org/), part of the [Code for America](https://www.codeforamerica.org/) Brigade Network.

## Want to contribute?

First, check out the [WTT Onboarding Guide](https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit?usp=sharing). Then, follow the instructions below.

### Setup

New to coding? Before proceeding, be sure to install [Xcode command line tools](https://www.freecodecamp.org/news/install-xcode-command-line-tools/), [Node](https://nodejs.org/en/download/), [Yarn](https://classic.yarnpkg.com/en/docs/install), and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

1. Install docker https://www.docker.com/get-started. Using Linux? Install [Docker Compose](https://docs.docker.com/compose/install/) as well.
2. Open Terminal and clone down the main repo:
```shell
$ git clone https://github.com/waterthetrees/waterthetrees.git
```
3. Change to the main directory:
```shell
$ cd waterthetrees
```
4. Run these shell scripts to clone down all repos and run docker-compose:
```shell
$ ./clone_repos.sh
$ ./install.sh
```
5. Change to the frontend directory:
```shell
$ cd wtt_front
```
6. Install dependencies:
```shell
$ yarn install
```
7. Launch the Webpack server and have it watch for changes:
```shell
$ npm run start:dev
```
