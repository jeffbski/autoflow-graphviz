# autoflow-graphviz

autoflow-graphviz is a plugin for autoflow, the flow control rules engine, which can use graphviz to generate flow diagrams for the dependencies

For more information on `autoflow` the lightweight flow control rules engine:  http://github.com/jeffbski/autoflow

Note: This is NOT related to FaceBook's `flow` type system.

## Project status - INACTIVE

I am not currently working on autoflow or autoflow family projects. I am happy to accept contributors if further development is needed.

## Goals

Generate graphviz diagrams for flow definitions that:

 - show relationship between inputs, tasks, and outputs
 - show dependencies between inputs, outputs, and other preconditions
 - create PNG, PDF, GIF, or DOT files in a designated directory

## Example

```js
// autoflow code
var loadRender = autoflow('loadRender', 'fooPath, barPath, barP2, cb -> err, renderedOut',
  loadFoo, 'fooPath, cb -> err, foo',    // async cb function
  loadBar, 'barPath, barP2, cb -> err, bar',  // async cb function
  render, 'foo, bar -> renderedOut'  // sync function using outputs from first two
);
```

![simple-auto-flow-graphviz](https://cloud.githubusercontent.com/assets/5689/22215357/aebf11e2-e160-11e6-86ba-e14f9bfe2f7b.png)

## Prerequisites

 - Install graphviz on your system - http://www.graphviz.org/
 - autoflow 0.5.2+ is needed because it exposes the events needed by autoflow-graphviz

## Installing

First install the open source graphviz software if not already installed on your system. You can find all about it at http://www.graphviz.org/
It can be downloaded or installed via a package manager.

For example:

```bash
brew install graphviz  # mac OS X
apt-get install graphviz  # ubuntu and debian linux
```

This should put graphviz binaries on your path, autoflow-graphviz uses `dot`, so make sure that `dot` is on your path, then you can install autoflow-graphviz.


```bash
    npm install autoflow-graphviz   # install locally
```

OR

```bash
    npm install -g autoflow-graphviz  # installs globally
```

OR

Pull from github - http://github.com/jeffbski/autoflow-graphviz


## Example

```bash
# if you installed locally
node_modules/bin/autoflow-graphviz JSFilePath
# OR if using globally
autoflow-graphviz JSFilePath
```

## Usage

```
  Usage: autoflow-graphviz <JSPath ...> [options]

  Options:

    -h, --help                               output this usage information
    -V, --version                            output the version number
    -t, --type <type>                        type of output (png, pdf, gif, dot), default: png
    -i, --include <flowName[,flowName,...]>  limit graphing to only these flowNames
    -o, --output <outDir>                    output directory (should exist), default to cwd (.)
```


## License

 - [MIT license](http://github.com/jeffbski/autoflow-graphviz/raw/master/LICENSE)

## Contributors

 - Author: Jeff Barczewski (@jeffbski)

## Contributing

 - Source code repository: http://github.com/jeffbski/autoflow-graphviz
 - Ideas and pull requests are encouraged  - http://github.com/jeffbski/autoflow-graphviz/issues
 - You may contact me at @jeffbski or through github at http://github.com/jeffbski
