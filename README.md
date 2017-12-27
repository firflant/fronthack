# Fronthack
Fronthack is a framework to convert any design into high quality HTML and CSS
and this is it's commandline generator. For more info visit [fronthack.com](http://fronthack.com/).

## Instalation
```
npm install -g fronthack
```

## Usage

### Generator commands

| Command               | Description                                                                                                          |
|-----------------------|----------------------------------------------------------------------------------------------------------------------|
| `fronthack init`      | Creates a new Fronthack project in current directory                                                                 |
| `fronthack component` | Generates new empty Sass component or receives the ready one if it exists in Fronthack database.                     |
| `fronthack layout`    | Generates new empty Sass file for layout section.                                                                    |
| `fronthack page`      | Generates new empty html page.                                                                                       |
| `fronthack design`    | Attach file with design to given page.                                                                               |
| `fronthack list`      | Displays list of ready components available in [Fronthack database](http://styleguide.fronthack.com/).               |
| `fronthack help`      | Displays help                                                                                                        |

These are only the generator commands usefull to generate new project and Sass
files, but for development you need also the local scripts from below. They
compile Sass and Mustache files into ready output, run local dev server etc.

## Project scripts

| Command               | Description                                                                                                          |
|-----------------------|----------------------------------------------------------------------------------------------------------------------|
| `npm run dev`         | Run a local dev server with helpfull development scripts and livereload.                                             |
| `npm run build`       | Compiles a standalone "dist" directory with minified files, which is ready to deploy to any production envirnoment.  |
| `npm run deploy`      | If your repository is hosted on GitHub, it deploys "dist" directory to Github pages.                                 |


--------------------------------------------------
Fronthack has been founded thanks to project development in [WAAT ltd.](http://waat.eu/)
