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
| Global commands    | Description                                                                                                               |
|--------------------|---------------------------------------------------------------------------------------------------------------------------|
| `init`             | Initiates Fronthack working directory for new project                                                                     |
| `help`             | Displays help                                                                                                             |

| Project commands   | Description                                                                                                               |
|--------------------|---------------------------------------------------------------------------------------------------------------------------|
| `watch`            | Runs gulp-based task to watch for Sass and HTML changes in **src** directory and compile the output to **dist** directory |
| `new`              | Creates new Sass component and receives ready Sass code if it exists in Fronthack's repository                            |
| `purge-styleguide` | Removes all styleguide related files and data from the project if do not need it                                          |

Example: `fronthack init`
