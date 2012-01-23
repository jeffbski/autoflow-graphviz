# react-graphviz

react-graphviz is a plugin for react, the flow control rules engine, which can use graphviz to generate flow diagrams for the dependencies

For more information on `react` the lightweight flow control rules engine:  http://github.com/jeffbski/react

## Goals

Generate graphviz diagrams for flow definitions that:

 - show relationship between inputs, tasks, and outputs
 - show dependencies between inputs, outputs, and other preconditions
 - create PNG, PDF, GIF, or DOT files in a designated directory


## Installing

    npm install -g react-graphviz  # installs globally
    npm install react-graphviz   # install locally

OR

Pull from github - http://github.com/jeffbski/react-graphviz


## Example

```bash
react-graphviz moduleOrJSFile ... --type png --include flowName --output dir
# OR
node_modules/bin/react-graphviz moduleOrJSFile ... --type png --include flowName --output dir
```

## License

 - [MIT license](http://github.com/jeffbski/react-graphviz/raw/master/LICENSE)

## Contributors

 - Author: Jeff Barczewski (@jeffbski)

## Contributing

 - Source code repository: http://github.com/jeffbski/react-graphviz
 - Ideas and pull requests are encouraged  - http://github.com/jeffbski/react-graphviz/issues
 - You may contact me at @jeffbski or through github at http://github.com/jeffbski
