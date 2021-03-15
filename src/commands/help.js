import commandLineUsage from 'command-line-usage'


export default () => {
  const sections = [
    {
      header: 'Fronthack CLI',
      content: [
        'A commandline generator tool for the projects based on Fronthack ',
        '{underline http://fronthack.com}',
      ],
    },
    {
      header: 'Generator commands',
      content: [
        {
          name: '{cyan fronthack init}',
          summary: 'Initiates a new Fronthack project in selected technology.',
        },
        {
          name: '{cyan fronthack component}',
          summary: 'Generates a new component and if the name matches any from a Fronthack repository, downloads its boilerplate code.',
        },
        {
          name: '{cyan fronthack page}',
          summary: 'Generates a new page.',
        },
        {
          name: '{cyan fronthack design}',
          summary: 'Pairs design file with a selected page.',
        },
        {
          name: '{cyan fronthack list}',
          summary: 'Displays a list of all components available in the Fronthack remote repository.',
        },
        {
          name: '{cyan fronthack help}',
          summary: 'Displays this help.',
        },
        {
          name: '{cyan fronthack version}',
          summary: 'Displays the currently installed version of a Fronthack tool.',
        },
      ],
    },
    {
      header: 'Static HTML project scripts',
      content: [
        {
          name: '{cyan yarn start}',
          summary: 'Runs a local dev server with helpful development scripts and livereload.',
        },
        {
          name: '{cyan yarn build}',
          summary: 'Compiles a standalone, minified and production ready "dist" directory.',
        },
        {
          name: '{cyan yarn deploy}',
          summary: 'If your repository is hosted on GitHub, it deploys compiled "dist" directory to GitHub pages.',
        },
      ],
    },
    {
      header: 'React project scripts',
      content: [
        {
          name: '{cyan yarn start}',
          summary: 'Runs a local dev server.',
        },
        {
          name: '{cyan yarn build}',
          summary: 'Compiles a production build.',
        },
      ],
    },
    {
      header: 'Next.js project scripts',
      content: [
        {
          name: '{cyan yarn dev}',
          summary: 'Runs a local dev server.',
        },
        {
          name: '{cyan yarn build}',
          summary: 'Compiles a production build.',
        },
        {
          name: '{cyan yarn start}',
          summary: 'Starts a production build.',
        },
      ],
    },
    {
      header: 'Updating Fronthack',
      content: [
        {
          name: '{cyan yarn global upgrade fronthack}',
          summary: 'Upgrades the Fronthack package to a latest version.',
        },
      ],
    },
    {
      content: [
        'Looking for more help? Check out the official Fronthack docs: {underline https://docs.fronthack.com}',
      ],
    }
  ]
  const usage = commandLineUsage(sections)
  console.log(usage)
}