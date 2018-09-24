## Dist directory

This directory is an output of `yarn build` command. If it is empty, that means
command has not been started yet:

Do not edit HTML or CSS there because it become overridden on next run of this
command. The `dist` is a standalone, production-ready directory and can be
safely deployed to any hosting environment.


### Directory contains following:

- static HTML compiled by Mustache,
- minified CSS compiled from Sass,
- minified JS files,
- compressed assets like images and fonts.
