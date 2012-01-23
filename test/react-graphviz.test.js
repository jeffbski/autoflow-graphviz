'use strict';
/*jshint white: false */

var test = require('tap').test;
var temp = require('temp');
var path = require('path');
var fs = require('fs');

var react = require('react');
var reactGraphviz = require('../'); //require('react-graphviz');

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

test('generate diagram with defaults', function (t) {
  t.plan(1);
  reactGraphviz();  //use all defaults
  var expectedFile = './loadRender.png';
  if (path.existsSync(expectedFile)) fs.unlinkSync(expectedFile);
  var fn = react('loadRender', 'fooPath, barPath, barP2, cb -> err, renderedOut',
    loadFoo, 'fooPath, cb -> err, foo',
    loadBar, 'barPath, barP2, cb -> err, bar',
    render, 'foo, bar -> renderedOut'
  );
  setTimeout(function () {
    t.ok(path.existsSync(expectedFile), 'png file should exist');
    fs.unlinkSync(expectedFile);
    t.end();
  }, 1000);
});

test('generate diagram for single flow using file path', function (t) {
  t.plan(3);
  temp.mkdir('react-graphviz-test', function (err, dirPath) {
    reactGraphviz({
      type: 'dot',
      output: dirPath,
      include: ['loadAndSave', 'foo']
    });
    var foo = react('foo', 'a, cb -> err, b',
      loadUser, 'a, cb -> err, b'
    );                    
    var bar = react('bar', 'a, cb -> err, b',
      loadUser, 'a, cb -> err, b'
    );                    
    var loadAndSave = react('loadAndSave', 'filename, uid, outDir, cb -> err, html, user, bytes',  
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
      t.ok(path.existsSync(path.join(dirPath, 'loadAndSave.dot')), 'should exist');
      t.ok(path.existsSync(path.join(dirPath, 'foo.dot')), 'should exist');
      t.ok(!path.existsSync(path.join(dirPath, 'bar.dot')), 'should not exist');
      t.end();
    }, 1000);    
  });
});