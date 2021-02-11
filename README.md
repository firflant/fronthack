# Fronthack

Fronthack has been founded to convert any design into a high quality, modular frontend. It is a generator tool in form of a commandline, that ships initial codebases (boilerplates) for **React**, **Next**, **Jekyll** and **Static site** projects. It contains a [variety of UI elements](https://docs.fronthack.com/?path=/story/components-basic-styles--default) that works very well with these boilerplates. It proposes an opinionated worflow for creating [JAMstack](https://jamstack.org/) projects.

#### [Visit website](http://fronthack.com)
#### [Read the docs](https://docs.fronthack.com/)

## Instalation
```
yarn global add fronthack
```

## Usage

### Generator commands

| `fronthack init`      | Initiate a new Fronthack project in picked technology.                                         |
| `fronthack component` | Generate a new blank component or fetch the exists one of that name from Fronthack repository. |
| `fronthack page`      | Generate a new page.                                                                           |
| `fronthack design`    | Pair design file with given page.                                                              |
| `fronthack list`      | Display a list of components available in Fronthack repository.                                |
| `fronthack help`      | Display help.                                                                                  |
| `fronthack version`   | Display currently installed version of Fronthack.                                              |


## Project scripts

| Command               | Description                                                                                   |
|-----------------------|-----------------------------------------------------------------------------------------------|
| `yarn start`          | Runs a local dev server with helpfull development scripts and livereload.                     |
| `yarn build`          | Compiles a standalone "dist" directory with minified files, that are ready to deploy.         |
| `yarn deploy`         | If your repository is hosted on GitHub, it deploys compiled "dist" directory to GitHub pages. |


--------------------------------------------------
Fronthack has been founded thanks to project development in
[WAAT ltd.](http://waat.eu/) and [MVP-Space](http://mvp-space.com/)
