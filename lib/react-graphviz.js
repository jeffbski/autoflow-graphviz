'use strict';

var graphviz = require('graphviz');
var path = require('path');
var fs = require('fs');

var react = require('react');

var INVALID_NAME_CHARS_RE = /\s+/g;
var includedFlowNames;
var type = 'png';
var outputDir = '.';

function configure(options) {
  if (!options) options = { };
  if (options.output) {
    outputDir = options.output;
    if (!fs.existsSync(outputDir)) throw new Error('path does not exist, please create it first: ' + outputDir);
  }
  if (options.type) type = options.type;
  if (options.include && options.include.length) {
    includedFlowNames = {};
    options.include.reduce(function (accum, i) {
      accum[i] = true;
      return accum;
    }, includedFlowNames);
  }
}

function filterFlowNames(flowName) {
  if (!includedFlowNames) return true;
  return includedFlowNames[flowName];
}

/**
   remove invalid chars like whitespace
  */
function clean(str) {
  return str.replace(INVALID_NAME_CHARS_RE, '');
}

function GraphBuilder(graphName) {
  this.graph = graphviz.digraph(graphName);
  this.methods = {};
  this.params = {};
}

GraphBuilder.prototype.getGraph = function () {
  return this.graph;
};

GraphBuilder.prototype.method = function (name) {
  name = clean(name);
  var m = this.methods[name];
  if (!m) {
    m = this.graph.addNode(name, { shape: 'box', color: 'blue', fillcolor: 'beige', style: 'filled' }); // teal
    this.methods[name] = m;
  }
  return m;
};

GraphBuilder.prototype.param = function (name) {
  name = clean(name);
  var p = this.params[name];
  if (!p) {
    p = this.graph.addNode(name, { style: 'filled', fillcolor: 'gainsboro' });
    this.params[name] = p;
  }
  return p;
};

process.on(react.events.TYPES.AST_DEFINED, function (ast) {
  if (!filterFlowNames(ast.name)) return;
  var cleanName = clean(ast.name);
  var g = new GraphBuilder(cleanName);
  var graph = g.getGraph();
  var input = graph.addNode(cleanName + '_input', { shape: 'box', style: 'filled', fillcolor: 'aquamarine' });
  ast.inParams.forEach(function (p) {
    var pn = g.param(p);
    graph.addEdge(input, pn);
  });
  ast.tasks.forEach(function (t) {
    var tn = g.method(t.name);
    t.a.forEach(function (p) {
      var pn = g.param(p);
      graph.addEdge(pn, tn);
    });
    t.out.forEach(function (p) {
      var pn = g.param(p);
      graph.addEdge(tn, pn);
    });
  });
  ast.tasks.forEach(function (t) {
    if (t.after) {
      var tn = g.method(t.name);
      t.after.forEach(function (m) {
        var mn = g.method(m);
        graph.addEdge(mn, tn);
      });
    }
  });
  var output = graph.addNode(cleanName + '_output', { shape: 'box', style: 'filled', fillcolor: 'aquamarine' });
  ast.outTask.a.forEach(function (p) {
    var pn = g.param(p);
    graph.addEdge(pn, output);
  });
  var filename = [cleanName, '.', type].join('');
  var fullPath = path.join(outputDir, filename);
  console.error('writing: ' + fullPath);
  if (type === 'dot') {
    var dotData = graph.to_dot();
    fs.writeFile(fullPath, dotData, function (err) {
      if (err) console.error(err);
    });
  } else {
    graph.output(type, fullPath);
  }
});

module.exports = configure;