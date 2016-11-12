'use strict';
const onHeaders = require('on-headers');
const memwatch = require('memwatch-next');
const _ = require('lodash');

module.exports = memUsage;

function memUsage() {

  return function memUsage(req, res, next) {
    let hd = new memwatch.HeapDiff();
    console.log('starting req');
    let memStart = process.memoryUsage().rss;

    onHeaders(res, function onHeaders() {
      let now = process.memoryUsage().rss;
      let totalMem = now - memStart;
      console.log(hd.end().change.details);
      console.log(`total ${totalMem}, now ${now}, start ${memStart}`);
      res.setHeader('X-Total-Mem-Usage', totalMem * 1e-6);

    });

    next();
  }

}
