# Build Tools
The Build Tools aim to cater for vary needs of the Big Bite team when creating new sites, plugins and themes for projects. This means we need to have a tooling structure that allows us to develop in isolation when building a plugin or theme along side a whole site project without having to switch or configure tooling for when we change contexts. This package contains everything the tooling needs as well as the relevant webpack configuration to meet these needs.

# Setup
Once we have the package on a package manager, you should be able to simply use NPM to install it using the below command:

```bash
npm i -D @bigbite/build-tools
```

In the mean time, you may need to add the package using the git url and version:

```bash
npm i -D git+ssh://git@github.com:bigbite/build-tools.git#1.0.0
```

## Setup Webpack
As the package contains a dependency of `webpack` and `webpack-cli` along with all the other features in the setup, you should not need to add those to your project. All you need to do is create your `webpack.config.js` file in the root of your project and add the following:

```js
module.exports = require('@bigbite/build-tools');
```

## Prettier
You will need to set the prettier config as prettier does not support the ability to assign a config through code. Add the build tools under the `prettier` key to your `package.json`.

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "prettier": "@bigbite/build-tools/configs/prettier",
  "dependencies": {}
}
```

## Additional Setup.
Copy/merge the applicable contents of the below files to their respective files in your project.

| From | To | Description |
|:--|:--|:--|
| `.gitignore.build-tools` | `.gitignore` | Build Tools may generate some files that don't need to be committed to a repo. They're listed in here. |

# Structuring your project
The Build Tools work on an entrypoint system that not only allows you to define multiple for a single project, but also allows for building multiple projects at the same time. Each project you're attempting to build should have at least one entrypoint. Lets say we have 3 projects, 2 plugins and a theme, spread across a WordPress VIP site, we would have the following directory structure (assuming root is `wp-content`).

```
/client-mu-plugins
  /my-plugin
/plugins
  /another-cutom-plugin
/themes
  /my-theme
```

That would be very familiar for many. However, when taking entrypoints into account we would have this.

```
/client-mu-plugins
  /my-plugin
    /src
      /entrypoints
        /editor.js
        /frontend.js
/plugins
  /another-cutom-plugin
    /src
      /entrypoints
        /editor.js
/themes
  /my-theme
    /src
      /entrypoints
        /frontend.js
```

As you can see we do not work from a single entrypoint directory in the root of the site, but each project (plugin/theme) has their own directory with one or more entrypoint files inside. This allows us target specific projects for any build and to work on a single project (or multiple if you need to) in isolation, not having to worry or wait for all other plugins as part of the build. As you will find below, we build can build many, a few or even all from a single command.

# Usage
```bash
build-tools build
```

| **Positionals** | | |
|:--|:--|:--|
| `projects` | _optional_ | Comma separated list of projects to build. _[[usage](#individual-projects)]_ |

| **Options** | |
|:--|:--|
| `--once` | Run the build process only once. |
| `--production` | Compile the assets for production. |
| `--quiet` | Runs the build process with reduced output. |

## Individual Projects
You can define a project by using the `project` positional when using the build command by placing the project name after the `build` command.

```bash
build-tools build my-plugin
```

The `project` positional can also take comma separated values if you need to build more than one project at a given time.

```bash
build-tools build my-plugin,my-theme
```

Notice that each defined project is not a full path, nor an entry point. We use the directory name as the project and the build tools then look for those as defined in the [Structuring Your Project guide above](#structuring-your-project), seeking through `client-mu-plugins`,`plugins` and `themes`.

## Site-wide
If you need to build an entire sites worth of projects, which will often be the case come deployment, you can build all applicable projects by running the command from within your `wp-content` directory.

```bash
build-tools build
```

# Getting your Assets
As we're building each project as if it were its own entity, we do not create monolithic assets that cover all projects or an entire site. Instead each project will have those compiled assets within a `dist` directory. This includes both styles and scripts. Each entrypoint for a project becomes its own asset also. If we take the structure example from earlier, if we were to create a production build, we end up with...

```
/client-mu-plugins
  /my-plugin
    /dist
      /scripts
        /editor-h12h2.js
        /frontend-8sa8a.js
      /inc
        /asset-settings.php
      /src
        /entrypoints
          /editor.js
          /frontend.js
/plugins
  /another-cutom-plugin
    /dist
      /scripts
        /editor-kajsj.js
      /inc
        /asset-settings.php
      /src
        /entrypoints
          /editor.js
/themes
  /my-theme
    /dist
      /scripts
        /frontend-ha45a.js
      /inc
        /asset-settings.php
      /src
        /entrypoints
          /frontend.js
```

Notice the random hash/string after the generated assets? These are different for each production asset and are changed every time it is run to aid in cache busting when we have new assets. Understandably, you might be asked how you can retrieve that if it is randomly generated. This is where the `{project-path}/inc/asset-settings.php` file that has also been created comes in. This holds definitions that reference the filenames that have been generated so you are able to use them and use those without having to worry about updating your code each time assets are updated. Here's an example:

```php
define( 'MY_PLUGIN_EDITOR_JS', 'editor-h12h2.js' );
define( 'MY_PLUGIN_FRONTEND_JS', 'frontend-8sa8a.js' );
```

You should include these in your plugin;

```php
// my-plugin/my-plugin.php
/*
Plugin Name: My Plugin
Plugin URI: https://bigbite.net/
...etc
...etc
*/

define( 'MY_PLUGIN_DIR', rtrim( plugin_dir_path( __FILE__ ), '/' ) );

require_once MY_PLUGIN_DIR . 'src/asset-settings.php';

// Other includes, code, etc...
```

Which can then be used as such within your WordPress plugin or theme.

```php
wp_enqueue_script( 'my-plugin-editor', plugins_url( 'dist/scripts/' . MY_PLUGIN_EDITOR_JS, __FILE__ ), [], '1.0.1' );
```

These references are created by taking the `name` value from you `package.json` and combining that with the entry point and it's file type.

## Available Configs

* `browserlist`
* `eslint`
* `postcss`
* `prettier`
* `stylelint`

# Development & Contribution
I'd recommend working with [Yalc](https://github.com/wclr/yalc) for local package development. This package allows for local package development in a similar way that `npm/yarn link` works, but [aims to correct a number of issues and pitfalls](https://github.com/yarnpkg/yarn/issues/1761#issuecomment-259706202) that those bring. Here is a basic step-by-step guide for using Yalc for local package development.

1. Install Yalc globally so it can be accessed from anywhere.
```
npm i yalc -g
```

2. Clone the build-tools repo and publish the package with Yalc (don't worry, this doesn't go anywhere near npm publish)
```
git clone git@github.com:bigbite/build-tools.git
cd build-tools
yalc publish
```

3. In your test project, add the build-tools package via Yalc - this acts as a replacement for `npm i` or `yarn add`.
```
yalc add @bigbite/build-tools
```
