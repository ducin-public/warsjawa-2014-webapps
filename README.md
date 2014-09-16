# Modern webapp development workflow/tools

## workshop scenario

26th September 2014,
[Warsjawa](http://warsjawa.pl/)  
[Tomasz Ducin](http://pl.linkedin.com/pub/tomasz-ducin/4b/34a/822)

> JavaScript has been under phenomenal development during recent years. As an indirect result of browser wars, node.js has been introduced, which enabled developers to run JS on the server side. Thanks to this, lots of professional tools have been created: npm (package manager), grunt (automating, building), bower (assets manager), yeoman (skeleton generators). Additionally, many other tools could be executed on the server-side from now on, e.g. end-to-end testing without a browser (phantom/casper). This has promoted JS applications to full-professional projects with stable development workflow: building, testing, deployment - where everything is automated using well-known tools such as jenkins or git.

> Nowadays, the possibilities of JavaScript are a lot more than colourful forms written with obtrusive mixture of jquery and html, as it used to be some time ago. During this talk, I want to show what JavaScript can do now - what are the tools, how you can use them and why are they useful. And it doesn't matter what single-page-app framework you use (angular, bb, ember) or what server-side technology you use (the server itself doesn't have to rely on node.js).

----

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## intro

### prerequisites
 - node/npm installed, v0.10+
 - git installed, github account
 - shell (bash, powershell, etc.)
 - modern browser

I'm gonna use linux/ubuntu and chrome.

### plan
 - separate tools: npm, bower, grunt, yo
 - combining tools: yeoman workflow
 - _only if we have time: travis-ci, modernizr_

### aim
 - how to turn [raw development code](https://github.com/jashkenas/underscore/blob/master/underscore.js) into [production app](http://google.com) *fast*


----

# [npm](https://www.npmjs.org/): node package manager

![Node package manager logo](images/npm-small.png "npm logo")

[npm search](https://www.npmjs.org/search?q=warsjawa)

install a package globally:

    [sudo] npm install -g <package>

or locally:

    npm install <package>
    npm install <package> --save
    npm install <package> --save-dev

more in the [docs](https://www.npmjs.org/doc/cli/npm-install.html). Use search and install a module, e.g. jquery (no deps), backbone (deps), underscore (independent on backbone):

    mkdir project && cd project
    npm install [...]

:exclamation: don't do `sudo npm install <package>` (sudo, non-global), see
 - `~/.npm`
 - `/usr/lib/node_modules`

nitialize project manually (grab [minimalistic example](files/package.json)):

    # inside project directory
    #EDITOR package.json # creating manifest file

or automatically:

    npm init # creating manifest file

fetch dependencies from existent project:

    git clone https://github.com/tkoomzaaskz/warsjawa-2014-webapps
    cd warsjawa-2014-webapps
    npm install

publish/unpublish package (`package.json` file needed with `name` and `version` specified):

    npm publish
    npm unpublish [--force]


----

# [bower](http://bower.io/): web assets manager

![Bower web assets manager logo](images/bower-small.png "bower logo")

:question: when to use `npm` and when `bower` ([SO question](http://stackoverflow.com/a/21199026), [another SO question](http://stackoverflow.com/q/15092345/769384), [extensive guide](http://tech.pro/tutorial/1190/package-managers-an-introductory-guide-for-the-uninitiated-front-end-developer))

[bower search](http://bower.io/search/)

install bower tool:

    [sudo] npm install -g bower

initialize manually (grab [minimalistic example](files/bower.json)):

    $EDITOR bower.json # creating manifest file

or automatically:

    bower init # creating manifest file

:question: purpose of _main file_ ([SO question](http://stackoverflow.com/questions/20391742/what-is-the-main-property-when-doing-bower-init))

install packages:

    bower install <package>
    bower install <package> --save
    bower install <package> --save-dev

:exclamation: dependencies (install underscore, then backbone, then marionette and check underscore version each time)

:exclamation: installed bower_components are bower packages themselves and their dependencies may be fetched as well. Step into marionette and run `bower install`

:exclamation: ignore devDependencies: `bower install <package> --production`



:question: bower `depencencies` vs `devDepencencies` ([SO question](http://stackoverflow.com/a/19341028/769384))

register your package:

    bower register <my-package-name> <git-endpoint>

:exclamation: git only, git tags

more about [creating and maintaining bower packages ](http://bob.yexley.net/creating-and-maintaining-your-own-bower-package/)

[customize](http://bower.io/docs/config/) bower:

    $EDITOR .bowerrc

grab an [example](files/.bowerrc) (or [this one](https://github.com/tkoomzaaskz/warsjawa-2014-webapps/blob/master/files/.bowerrc) if previous link is broken) that overrides `bower_components` to `src/vendor`


----

# [grunt](http://gruntjs.com/): task runner ##

![Grunt task runner logo](images/grunt-small.png "grunt logo")

[grunt search](http://gruntjs.com/plugins)

:exclamation: example [Gruntfile](Gruntfile.js) from this repo with tasks: clean, concat, replace, watch

install grunt tool:

    [sudo] npm install -g grunt-cli
    npm install grunt --save-dev

:question: `grunt-cli` and `grunt` are separate - why is that

initialize manually (grab [this repo example](Gruntfile.js)):

    $EDITOR Gruntfile.js

or automatically... First, install templates. This includes manually creating empty directory which will contain templates and then cloning git repositories there:

    mkdir ~/.grunt-init
    git clone https://github.com/gruntjs/grunt-init-gruntfile.git ~/.grunt-init/gruntfile
    # git clone https://github.com/gruntjs/grunt-init-jquery.git ~/.grunt-init/jquery

Install `grunt-init` module, providing new binary:

    [sudo] npm install -g grunt-init

and finally generate Gruntfile.js:

    grunt-init gruntfile

:question: more [grunt-init tasks](http://stackoverflow.com/a/18745996/769384).

### basic grunt configuration - plugins, targets

:exclamation: analyse generated gruntfile

grunt API: see [docs](http://gruntjs.com/getting-started#an-example-gruntfile)

basic working example: see [this repo example](Gruntfile.js)

### example tasks

:exclamation: `grunt-contrib-*`

static code analysis:

    npm install grunt-contrib-jshint --save-dev

release build:

    npm install grunt-contrib-uglify --save-dev

background automatic tasks:

    npm install grunt-contrib-watch --save-dev

more tasks:
[copy](https://github.com/gruntjs/grunt-contrib-copy),
[concat](https://github.com/gruntjs/grunt-contrib-concat),
[cssmin](https://github.com/gruntjs/grunt-contrib-cssmin),
[sass](https://github.com/gruntjs/grunt-contrib-sass)/[compass](https://github.com/gruntjs/grunt-contrib-compass),
[requirejs](https://github.com/gruntjs/grunt-contrib-requirejs),
[compress](https://github.com/gruntjs/grunt-contrib-compress)

### more

:question: how about alternatives: [gulp](http://gulpjs.com/), [brunch](http://brunch.io/)? See [grunt vs brunch](http://alxhill.com/blog/articles/brunch-coffeescript-angular/) or [grunt vs gulp vs brunch](http://blog.toggl.com/2014/03/grunt-vs-gulp-vs-brunch/) subjective comparisons


----

# [yo](http://yeoman.io/): project scaffolding

![Yeoman project scaffolding logo](images/yeoman-small.png "yeoman logo")

[yeoman search](http://yeoman.io/generators/)

install yeoman tool:

    [sudo] npm install -g yo

search `generator-*` node modules (`npm search generator-`)

## using generators

install specific generator:

    [sudo] npm install -g generator-webapp

and run it:

    mkdir my-yo-project
    cd my-yo-project
    yo webapp

if running `grunt` fails on PhantomJS, your test depencencies may not be satisfied. Need to run:

    cd test
    bower install
    cd ..

## yeoman workflow

:exclamation: everything is configured for you. Really.

build the entire application:

    grunt build

open your application (source version):

    grunt serve

and built version:

    grunt serve:dist

analyse the new Gruntfile. As long as you can ;)

## backbone generator

install [generator-backbone](https://github.com/yeoman/generator-backbone):

    [sudo] npm install -g generator-backbone

and follow [typical workflow](https://github.com/yeoman/generator-backbone#typical-workflow) instructions.

Read more basics at http://yeoman.io/learning/


----

# [travis](https://travis-ci.org/): continuous integration ##

![Travis-ci logo](images/travis-small.png "travis-ci logo")

 - register account (using github account)
 - create stub test command
 - update package.json (my-test-command may be simply: `"grunt test"`):
```
"scripts": {
    "test": <my-test-command>
}
```
 - create travis manifest file (grab [example](files/.travis.yml) or [this](https://github.com/tkoomzaaskz/warsjawa-2014-webapps/blob/master/files/.travis.yml) if previous link is broken):
```
$EDITOR .travis.yml
```
 - push to github


----

# practice

 - [sinon.js](http://sinonjs.org/) problem: install it with bower and [grunt-bower-task](https://github.com/yatskevich/grunt-bower-task) (rely on [this article](https://muffinresearch.co.uk/using-sinon-js-with-bower-why-is-sinon-foo-undefined/))

![Modernizr logo](images/modernizr-small.png "moedrnizr logo")

[feature test suite](http://modernizr.github.io/Modernizr/test/)

## further practice

 - try out [angular-based tutorial](http://yeoman.io/codelab.html)
