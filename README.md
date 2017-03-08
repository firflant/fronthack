# fronthack-cli
A command line interface for [Fronthack](http://fronthack.com/)

## Instalation
```
npm install -g fronthack-cli
```

## Usage
```
fronthack <command>
```

### Avaliable commands
| Global commands  | Description                                                                                                               |
|------------------|---------------------------------------------------------------------------------------------------------------------------|
| `init`           | Initiates Fronthack working directory for new project                                                                     |
| `help`           | Displays help                                                                                                             |

| Project commands | Description                                                                                                               |
|------------------|---------------------------------------------------------------------------------------------------------------------------|
| `watch`          | Runs gulp-based task to watch for Sass and HTML changes in **src** directory and compile the output to **dist** directory |
| `component'      | Generates new empty Sass component or receives the ready one if it exists in Fronthack's repository.                      |
| `layout`         | Generates new empty Sass file for layout section.                                                                         |

Example: `fronthack init`
