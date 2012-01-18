'use strict';

var tap = require('tap').test;
var temp = require('temp');
var path = require('path');

var react = require('../'); //require('react-graphviz');

function loadFoo(fooPath, cb) {
  setTimeout(function () {
    cb(null, [fooPath, 'data'].join(':'));
  }, 10);
}

function loadBar(barPath, barP2, cb) {
  setTimeout(function () {
    cb(null, [barPath, barP2, 'data'].join(':'));
  }, 10);
}

function render(foo, bar) {
  return ['<html>', foo, '/', bar, '</html>'].join('');
}


test('generate diagram for single flow using file path', function (t) {
  var fn = react('loadRender', 'fooPath, barPath, barP2, cb -> err, renderedOut',
    loadFoo, 'fooPath, cb -> err, foo',
    loadBar, 'barPath, barP2, cb -> err, bar',
    render, 'foo, bar -> renderedOut'
  );

  temp.mkdir('react-graphviz-test-single', function (err, dirPath) {
    var filename = path.join(dirPath, 'single.png');
    react.graphFlow(fn, filename);
    // should this be sync or async? we would test for existence here
  });
});