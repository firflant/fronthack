## Dist directory

This directory contains output of running `npm run build` command. If it is
empty, it means that command has not been run yet:

Do not edit HTML or CSS there because it become overridden on next run of this
command. The `dist` is a standalone, production-ready directory and can be
safely deployed to any hosting environment.


### Directory contains following:

- static HTML compiled from Mustache,
- minified CSS compiled from Sass,
- minified JS files,
- compressed assets like images and fonts.
