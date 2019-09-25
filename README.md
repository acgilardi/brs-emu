# BRS-Emulator: BrightScript 2D API Emulator
An emulator for the BrightScript 2D API that runs on Chromium based browsers.

## About the Project

As a **BrightScript** developer since 2012, I always wanted a way to test my code without the need of a Roku device, in situations like a long flight or a place without any wireless network available. Then in 2016 I decided to learn about the **[ifDraw2D API](https://developer.roku.com/docs/references/brightscript/interfaces/ifdraw2d.md)** in order to develop games for the platform, so I created a few open source remakes of classic games (see links below at section **Games and Demos**). These projects were very challenging and exciting to develop, but brought me some frustration with it, as very few people outside the USA has access to the Roku platform, so a lot of people could only see [videos of my games](https://www.youtube.com/watch?v=NA59qZk7fQU&list=PLnKUeRkfD6f2JwNfJFiGfUrrg4YVKdcRQ), but never play it.

The development of an emulator for the platform was, to me, a very complex endeavor to start as a _side project_, so I shelved the idea in my _Brain Dump Trello board_, until recently, when I learned about the [**BRS**](https://github.com/sjbarag/brs) open source project, created by [Sean Barag](https://github.com/sjbarag/), that consists of a _command line interpreter_ for **BrightScript**.

This repository is a fork from **BRS** and I keep sending _pull requests_ to the original project, so the interpreter can keep being more powerful and better support the emulator. As [**BRS**](https://github.com/sjbarag/brs) is a command line tool, not all components will be pushed back to it, in particular the UI related ones (roScreen, roCompositor, etc.).

### So can I use this to watch TV without a Roku?

Nope! Both projects, BRS and BRS-EMU, currently has no intention of emulating the Roku OS user interface, integrating with the Roku store, or emulating media content playback.  Although the BRS-EMU project runs channels with user interface, but it will only support 2D API components, see limitations section below for full details on what is out of scope.

## Technology and Compatibility

This emulator is bundled as a **[Webpack](https://webpack.js.org/)** Javascript library that runs as a **[Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)** in the browser, and it uses features like [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) and [OffScreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas), that are _bleeding edge_ in the browser engines implementation, because of that, at this moment, it can only be executed in [Chromium](https://www.chromium.org/Home) based browsers, like [Chrome](https://www.google.com/chrome/), [Brave](https://brave.com/download/), [Opera](https://www.opera.com/) and the new [Edge Insider](https://www.microsoftedgeinsider.com/en-us/download/). The **BrightScript Draw 2D API Emulator** is a full client-side application, nothing is sent or processed in the server side.

## Current Limitations

This emulator is still a **prototype**, this way, there are several features from the **BrightScript** language and components that are not supported, or partially supported, some are planned to be implemented, others will stay as mock objects (for compatibility), and some are considered out of scope of this project. Below is the current list of those limitations:

### In Scope (to be developed/fixed)

*   Usage of **@** to access attributes from `roXMLElements` is not supported.
*   `Goto` statement is not supported.
*   `GetInterface(obj, interface)` function is not supported, use `Type(obj)` for now.
*   Usage of **colon** to do a loop in one line is not working. e.g. `while r.IsMatch(s): s = r.Replace(s, "\1,\2"): end while` 
*   It's not possible to compare `roUniversalControlEvent` to an integer.
*   Single line `if..then..[else]` cannot be nested inside another `if` clause.
*   The global AA (root `m` object) is not accessible from a function called inside a method.
*   The component `roUrlTransfer` is not implemented.
*   Reserved words like `Mod` cannot be used as variables (Roku does allow that).
*   The `Dim` statement cannot create multi-dimensional arrays.
*   Return `Invalid` from a function explicitly declared as `Object` doesn't work, use `Dynamic` or remove type declaration.
*   Send `Invalid` on a function parameter when it explicitly defines the type, generates an error. If `Invalid` is possible remove type declaration.
*   Unlike in **Roku** the emulator file system is case sensitive, so for now make sure your code use the correct case when dealing with files.

### In Scope (mocked)

*   Audio playback is not supported yet, for now `roAudioPlayer` and `roAudioResource` are mocked.
*   RAF (Roku Ads Framework) object `Roku_Ads()` is mocked with the most common methods available.
*   Channel Store components (`roChannelStore` and `roChannelStoreEvent`) are mocked.

### Out of Scope

*   RSG (Roku SceneGraph) SDK support.
*   Video playback or streaming.
*   SDK 1.0 deprecated components.

## Usage
This repo provides a webpage with a set of JavaScript libraries, download the zip file from the Release page and unzip to a folder.
Althought the emulator is a client application it cannot run as pure HTML page, as some browser functionalities have security restrictions, 
so you will need a simple web server to use the application. If your have [Python](https://www.python.org/) installed, just run the commands 
below on the root folder of the emulator.

* Linux
    ```
    $ python -m SimpleHTTPServer 8888
    ```

* Windows
    ```
    c:\github\brs-emu> python -m http.server 8888
    ```

Then you can now open your browser at the page `http://localhost:8888/index.html`

### Games and Demos

You can try the emulator by running one of the demonstration channels included in the repository, these are pre-configured as _clickable icons_ on `index.html`. In addition to the icons, the emulator has a button where you can load your own code, either as a single **.brs** file or a channel **.zip package**. You can also load the `.zip` release files of some games, all the files linked below are tested on the emulator and are publicly available with source code.

*   [Prince of Persia for Roku](https://github.com/lvcabral/Prince-of-Persia-Roku) port by Marcelo Lv Cabral - Download [zip file](https://github.com/lvcabral/Prince-of-Persia-Roku/releases/download/v0.15.3700/Prince-of-Persia-Roku-015.zip)
*   [Lode Runner for Roku](https://github.com/lvcabral/Lode-Runner-Roku) remake by Marcelo Lv Cabral - Download [zip file](https://github.com/lvcabral/Lode-Runner-Roku/releases/download/v0.17.700/Lode-Runner-Roku-017.zip)

### Note for BrightScript Developers

You can see the debug messages from `print` statements in your code using the _browser console_, just right click anywhere in the page and select _Inspect (Ctrl+Shift+i)_. Exceptions from the emulator will be shown there too. If your code does show an error in some scenario not listed on the limitations above, feel free to [open an issue](https://github.com/lvcabral/brs-emu/issues) at the project's GitHub repository.

## Building from source
The BRS project follows pretty standard `node` development patterns, with the caveat that it uses `yarn` for dependency management.

### Prerequisites
BRS builds (and runs) in `node`, so you'll need to [install that first](https://nodejs.org).

Once that's ready, install [yarn](https://yarnpkg.com).  Installing it with `npm` is probably the simplest:

```shell
$ npm install -g yarn
```
### Setup
1. Clone this repo:
   ```
   $ git clone https://github.com/lvcabral/brs-emu.git
   ```

2. Install dependencies:
    ```shell
    $ yarn install     # or just `yarn`
    ```

3. Get `brs` onto your `PATH`:
    ``` shell
    $ yarn link
    ```
### The build-test-clean dance
#### Build
This project is written in TypeScript, so it needs to be compiled before it can be executed.  `yarn build` compiles files in `src/` into JavaScript and TypeScript declarations, and puts them in `lib/` and `types/` respectively.

```shell
$ yarn build

$ ls lib/
brsEmu.js

$ ls types/
index.d.ts (and friends)
```
#### Release
To release a smaller library Webpack can create a *minified* version by running `yarn release`.

```shell
$ yarn release

$ ls lib/
brsEmu.min.js
```
If you want to use this release version, remember to update `app/index.js` to use `brsEmu.min.js` instead of `brsEmu.js`.

#### Testing
Tests are written in plain-old JavaScript with [Facebook's Jest](http://facebook.github.io/jest/), and can be run with the `test` target:

```shell
$ yarn test

# tests start running
```

Notes:
* Only test files ending in `.test.js` will be executed by `yarn test`.
* Currently, BRS-EMU tests are not covering all emulation components, and some of BRS tests are failing, this will be fixed, be patient (or help me write the tests).

#### Cleaning
Compiled output in `lib/` and `types/` can be removed with the `clean` target:

```shell
$ yarn clean

$ ls lib/
ls: cannot access 'lib': No such file or directory

$ ls types/
ls: cannot access 'types': No such file or directory
```

#### All Together
Thanks to the [npm-run-all](https://www.npmjs.com/package/npm-run-all) package, it's trivially easy to combine these into a sequence of tasks without relying on shell semantics:

```shell
$ yarn run-s clean build test
```
