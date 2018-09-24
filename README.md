# Fronthack
Fronthack is a boilerplate and development tool to convert any design into a
high quality HTML and CSS. For more info visit [fronthack.com](http://fronthack.com/).

## Instalation
```
yarn global add fronthack
```

## Usage

### Generator commands

| Command                      | Description                                                             |
|------------------------------|-------------------------------------------------------------------------|
| `fronthack init`             | Creates a new Fronthack project in current directory.                   |
| `fronthack create-react-app` | Creates new React project with Fronthack included.                      |
| `fronthack component`        | Fetches a component from a Fronthack repository or generates a new one. |
| `fronthack layout`           | Generates a boilerplate for layout section.                             |
| `fronthack page`             | Generates new empty page.                                               |
| `fronthack design`           | Attach file with design to given page.                                  |
| `fronthack list`             | Displays a list of ready components available in Fronthack repository.  |
| `fronthack help`             | Displays help.                                                          |
| `fronthack version`          | Displays currently installed version.                                   |

These are only the generator commands usefull to generate new projects, React
components or Sass files, but you need also the local scripts from below for
development purposes.

## Static project scripts

| Command               | Description                                                                                          |
|-----------------------|------------------------------------------------------------------------------------------------------|
| `yarn start`          | Run a local dev server with helpfull development scripts and livereload.                             |
| `yarn build`          | Compiles a production ready "dist" directory with minified files, which is ready to deploy anywhere. |
| `yarn deploy`         | If your repository is hosted on GitHub, it deploys "dist" directory to Github pages.                 |

## React project scripts

| Command               | Description                                               |
|-----------------------|-----------------------------------------------------------|
| `yarn start`          | Run a local dev server with helpfull development scripts. |
| `yarn build`          | Compiles a production build.                              |

More at [Create React App docs](https://github.com/facebook/create-react-app)

--------------------------------------------------
Fronthack has been founded thanks to project development in [WAAT ltd.](http://waat.eu/)
