'use strict'

/**
 * Regular expressions to use in various places.
 */
module.exports = {
  pascalCase: /([A-Z][a-z0-9]+)+$/,
  kebabCase: /^[a-z0-9]+((\-[a-z0-9]+){1,})?$/,
  projectName: /^[a-zA-Z0-9\-\_]+$/,
  pageUrl: /^[a-zA-Z0-9\-\_\/]+$/,
}
