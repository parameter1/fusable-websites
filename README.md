# BaseCMS Websites for Randall-Reilly
This monorepo contains the codebase for websites managed by Randall-Reilly. All sites within this repository utilize the [@parameter1/base-cms](https://github.com/parameter1/base-cms) packages, most notably the `marko-web` and `web-cli`.

----
## Requirements
This project supports one of these development environments:
- GitHub Codespaces (preferred)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org) (version 10.x) + [Yarn](https://yarnpkg.com) package manager.

### Additional Resources

- [Parameter1 docs](https://docs.parameter1.com) - For more details about working with the website framework, check out the docs!
- [MarkoJS](https://markojs.com/docs/getting-started/) - Server-side templates are rendered using the Marko templating engine
- [VueJS](https://vuejs.org) - Client-side component templating
- [ExpressJS](https://expressjs.com) - The backend HTTP server handling routing for requests

----
## Getting Started
### Codespaces
To get started with this repository in Codespaces, click on the Code/Codespaces/Create codespace button on the top right, or [click here](https://github.com/codespaces/new?hide_repo_select=true&ref=master&repo=297142576) to customize your codespace instance.

Once your codespace is started, you can access it via the browser, or open it in VSCode natively.

To start a service, change into the site directory and execute the `dev` command:
```sh
cd sites/overdriveonline.com
yarn dev
```

Once the site boot is complete, your container will automatically be port forwarded and can be accessed via the URL in the terminal: http://www-rr-ovd.dev.parameter1.com:9906

Make your changes and commit with the `Git` tab/extension within VSCode, then create a Pull Request like normal.

### Installation
After cloning the repository, execute one of the following commands from the project root (based on your chosen development environment):
```sh
# Docker Compose
docker-compose run --rm yarn install
```

```sh
# Mac/Linux/Windows native
nvm use 10
yarn install
```
Once complete, the project dependencies will be available and the project will be ready to boot.

### Development
To work in this repository, start the application instance for your chosen tenant (such as `eqw`):
```sh
# Docker Compose
docker-compose up eqw
```

```sh
# Mac/Linux native
# Modify variables as needed, see docker-compose.yml

export PORT="80"
export EXPOSED_PORT="9801"
export LIVERELOAD_PORT="19801"
export TENANT_KEY="randallreilly_all"
export SITE_ID="5fce562fd28860bc33b826d6"
export GRAPHQL_URI="https://graphql.virgon.base.parameter1.com"
export OEMBED_URI="https://oembed.virgon.base.parameter1.com"
export RSS_URI="https://rss.virgon.base.parameter1.com"
export SITEMAPS_URI="https://sitemaps.virgon.base.parameter1.com"
export NODE_ENV="development"
export IDENTITYX_GRAPHQL_URI="https://identity-x.parameter1.com/graphql"
export BASE_BROWSE_GRAPHQL_URI="https://base-browse.virgon.base.parameter1.com/graphql"

./node_modules/.bin/basecms-website dev sites/equipmentworld.com
```

```bat
Rem Windows native
Rem Modify variables as needed, see docker-compose.yml

set "PORT=80"
set "EXPOSED_PORT=9801"
set "LIVERELOAD_PORT=19801"
set "TENANT_KEY=randallreilly_all"
set "SITE_ID=5fce562fd28860bc33b826d6"
set "GRAPHQL_URI=https://graphql.virgon.base.parameter1.com"
set "OEMBED_URI=https://oembed.virgon.base.parameter1.com"
set "RSS_URI=https://rss.virgon.base.parameter1.com"
set "SITEMAPS_URI=https://sitemaps.virgon.base.parameter1.com"
set "NODE_ENV=development"
set "IDENTITYX_GRAPHQL_URI=https://identity-x.parameter1.com/graphql"
set "BASE_BROWSE_GRAPHQL_URI=https://base-browse.virgon.base.parameter1.com/graphql"

./node_modules/.bin/basecms-website dev sites/equipmentworld.com
```

### Developing on Microsoft Windows

Due to an issue with [Docker for Windows](https://forums.docker.com/t/file-system-watch-does-not-work-with-mounted-volumes/12038/16), file watching is not supported inside a container. If you are using `Docker Compose` with this project on a Microsoft Windows system, you'll need to ensure that one of the following alternate file watching methods are used.

#### Polling
To enable polling, create a `.env` file at the root of this project and add the following line:
```
GULP_POLLING_ENABLED=true
```

If you need to adjust the polling interval, you can do so by adding `GULP_POLLING_INTERVAL=<value in milliseconds>` to this file. The default is 1000ms.

#### Volume Watcher
Alternatively, you can use the [Docker Windows Volume Watcher](https://github.com/merofeev/docker-windows-volume-watcher) script to monitor changes to files from the host and dispatch update events to your containers. This script requires a working Python and `pip` install on the host machine.

### Testing
Execute one of the following commands to run the project test suite. These tests will be run automatically when changes are submitted or merged, and it's recommended to run the test suite locally before committing.

```sh
# Docker Compose
docker-compose run --rm yarn test
```

```sh
# Mac/Linux/Windows native
nvm use 10
yarn test
```

To run the test suite, execute the `./scripts/test.sh` or `./scripts/test.bat` script from the project root.
