# react-graphviz

react-graphviz is a plugin for react, the flow control rules engine, which allows react to use graphviz to generate flow diagrams for the dependencies

For more information on `react` the lightweight flow control rules engine:  http://github.com/jeffbski/react

## Goals

Generate graphviz diagrams for flow definitions that:

 - show relationship between inputs, tasks, and outputs
 - show dependencies between inputs, outputs, and other preconditions
 - create PNG files in a designated directory

## Installing

    npm install react-graphviz

OR

Pull from github - http://github.com/jeffbski/react-graphviz


## Example

```javascript
var react = require('react-graphviz'); // enable graphviz integration
react.graphFlow('outputPath'); // graph the flow for all react functions defined after this call and save to outputPath directory

// OR if you just want to graph the flow for one function, you can instead do this

var fn = react('myflow', ...);

// if specified outputPath exists and is a directory, then the filename will be outputPath/flowName.png
// otherwise it will be use the outputPath as the file name (directory should already exist)
react.graphFlow(fn, 'outputPath'); // graph the existing flow for one react function and save to outputPath
```


## License

 - [MIT license](http://github.com/jeffbski/react-graphviz/raw/master/LICENSE)

## Contributors

 - Author: Jeff Barczewski (@jeffbski)

## Contributing

 - Source code repository: http://github.com/jeffbski/react-graphviz
 - Ideas and pull requests are encouraged  - http://github.com/jeffbski/react-graphviz/issues
 - You may contact me at @jeffbski or through github at http://github.com/jeffbski
