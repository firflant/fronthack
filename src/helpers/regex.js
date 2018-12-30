/**
 * Regular expressions to use in various places.
 */
export default {
  pascalCase: /([A-Z][a-z0-9]+)+$/,
  kebabCase: /^[a-z0-9]+((\-[a-z0-9]+){1,})?$/,
  projectName: /^[a-zA-Z0-9\-\_]+$/,
  pageUrl: /^[a-zA-Z0-9\-\_\/]+$/,
}
