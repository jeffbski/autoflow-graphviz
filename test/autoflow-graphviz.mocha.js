'use strict';
/*jshint white: false */
/*global autoflow:true */

var chai = require('chai');
var t = chai.assert;

var temp = require('temp');
var path = require('path');
var fs = require('fs');

var autoflow = require('autoflow');
var autoflowGraphviz = require('../'); //require('autoflow-graphviz');

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

function loadUser(uid, cb){ setTimeout(cb, 100, null, "User"+uid); }
function loadFile(filename, cb){ setTimeout(cb, 100, null, 'Filedata'+filename); }
function markdown(filedata) { return 'html'+filedata; }
function prepareDirectory(outDirname, cb){ setTimeout(cb, 200, null, 'dircreated-'+outDirname); }
function writeOutput(html, user, cb){  setTimeout(cb, 300, null, html+'_bytesWritten'); }
function loadEmailTemplate(cb) { setTimeout(cb, 50, null, 'emailmd'); }
function customizeEmail(user, emailHtml) { return 'cust-'+user+emailHtml; }
function deliverEmail(custEmailHtml, cb) { setTimeout(cb, 100, null, 'delivered-'+custEmailHtml); }

suite('autoflow-graphviz');

test('generate diagram with defaults', function (done) {
  autoflowGraphviz();  //use all defaults
  var expectedFile = './loadRender.png';
  if (fs.existsSync(expectedFile)) fs.unlinkSync(expectedFile);
  var fn = autoflow('loadRender', 'fooPath, barPath, barP2, cb -> err, renderedOut',
    loadFoo, 'fooPath, cb -> err, foo',
    loadBar, 'barPath, barP2, cb -> err, bar',
    render, 'foo, bar -> renderedOut'
  );
  setTimeout(function () {
    t.ok(fs.existsSync(expectedFile), 'png file should exist');
    fs.unlinkSync(expectedFile);
    done();
  }, 1000);
});

test('generate diagram for single flow using file path', function (done) {
  temp.mkdir('autoflow-graphviz-test', function (err, dirPath) {
    autoflowGraphviz({
      type: 'dot',
      output: dirPath,
      include: ['loadAndSave', 'foo']
    });
    var foo = autoflow('foo', 'a, cb -> err, b',
      loadUser, 'a, cb -> err, b'
    );
    var bar = autoflow('bar', 'a, cb -> err, b',
      loadUser, 'a, cb -> err, b'
    );
    var loadAndSave = autoflow('loadAndSave', 'filename, uid, outDir, cb -> err, html, user, bytes',
      loadUser,         'uid, cb          -> err, user',     // calling async loadUser with uid, cb called with err and user
      loadFile,         'filename, cb     -> err, filedata',
      markdown,         'filedata         -> html',    // using a sync function
      prepareDirectory, 'outDir, cb   -> err, dircreated',
      writeOutput,      'html, user, cb   -> err, bytes', { after: prepareDirectory },  // only after prepareDirectory done
      loadEmailTemplate, 'cb              -> err, emailmd',
      markdown,         'emailmd          -> emailHtml',   // using a sync function
      customizeEmail,   'user, emailHtml  -> custEmailHtml',  // sync function
      deliverEmail,     'custEmailHtml, cb    -> err, deliveredEmail', { after: writeOutput   }  // only after writeOutput is done
   );
    setTimeout(function () {
      t.ok(fs.existsSync(path.join(dirPath, 'loadAndSave.dot')), 'should exist');
      t.ok(fs.existsSync(path.join(dirPath, 'foo.dot')), 'should exist');
      t.ok(!fs.existsSync(path.join(dirPath, 'bar.dot')), 'should not exist');
      done();
    }, 1000);
  });
});