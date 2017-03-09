# Fronthack
Framework to convert any design into high quality HTML and CSS with own Command Line Interface

## Instalation
```
npm install -g fronthack
```

## Usage
```
fronthack <command>
```

### Available global commands

| Command          | Description                                                                                                               |
|------------------|---------------------------------------------------------------------------------------------------------------------------|
| `init`           | Creates a new [Fronthack](http://fronthack.com/) project in current directory                                             |
| `help`           | Displays help                                                                                                             |

### Available project commands
Commands to be used inside Fronthack project

| Command          | Description                                                                                                               |
|------------------|---------------------------------------------------------------------------------------------------------------------------|
| `watch`          | Runs gulp-based task to watch for Sass and HTML changes in **src** directory and compile the output to **dist** directory |
| `component`      | Generates new empty Sass component or receives the ready one if it exists in Fronthack's repository.                      |
| `layout`         | Generates new empty Sass file for layout section.                                                                         |

Example: `fronthack init`
