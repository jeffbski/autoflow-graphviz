# react-graphviz

react-graphviz is a plugin for react, the flow control rules engine, which can use graphviz to generate flow diagrams for the dependencies

For more information on `react` the lightweight flow control rules engine:  http://github.com/jeffbski/react

## Goals

Generate graphviz diagrams for flow definitions that:

 - show relationship between inputs, tasks, and outputs
 - show dependencies between inputs, outputs, and other preconditions
 - create PNG, PDF, GIF, or DOT files in a designated directory


## Prerequisites

 - Install graphviz on your system - http://www.graphviz.org/
 - React 0.5.2+ is needed because it exposes the events needed by react-graphviz

## Installing

First install the open source graphviz software if not already installed on your system. You can find all about it at http://www.graphviz.org/
It can be downloaded or installed via a package manager.

For example:

```bash
brew install graphviz  # mac OS X
apt-get install graphviz  # ubuntu and debian linux
```

This should put graphviz binaries on your path, react-graphviz uses `dot`, so make sure that `dot` is on your path, then you can install react-graphviz.


```bash
    npm install react-graphviz   # install locally
```

OR

```bash
    npm install -g react-graphviz  # installs globally
```

OR

Pull from github - http://github.com/jeffbski/react-graphviz


## Example

```bash
# if you installed locally
node_modules/.bin/react-graphviz moduleOrJSFile
# OR if using globally
react-graphviz moduleOrJSFile
```

## Usage

```
  Usage: react-graphviz <moduleOrJSPath ...> [options]

  Options:

    -h, --help                               output this usage information
    -V, --version                            output the version number
    -t, --type <type>                        type of output (png, pdf, gif, dot), default: png
    -i, --include <flowName[,flowName,...]>  limit graphing to only these flowNames
    -o, --output <outDir>                    output directory (should exist), default to cwd (.)
```


## License

 - [MIT license](http://github.com/jeffbski/react-graphviz/raw/master/LICENSE)

## Contributors

 - Author: Jeff Barczewski (@jeffbski)

## Contributing

 - Source code repository: http://github.com/jeffbski/react-graphviz
 - Ideas and pull requests are encouraged  - http://github.com/jeffbski/react-graphviz/issues
 - You may contact me at @jeffbski or through github at http://github.com/jeffbski
