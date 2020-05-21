'use strict';

const R = require('ramda');
const constants = require('./lib/constants');
const memoizee = require('memoizee');

const appMethod = require('./lib/app');

const methods = {
  app: appMethod,
  reviews: require('./lib/reviews')
};

function memoized (opts) {
  const cacheOpts = Object.assign({
    primitive: true,
    normalizer: JSON.stringify,
    maxAge: 1000 * 60 * 5, // cache for 5 minutes
    max: 1000 // save up to 1k results to avoid memory issues
  }, opts);

  // need to rebuild the methods so they all share the same memoized appMethod
  const doMemoize = (fn) => memoizee(fn, cacheOpts);
  const mAppMethod = memoizee(appMethod, cacheOpts);

  const otherMethods = {
    reviews: require('./lib/reviews')
  };

  return Object.assign({ app: mAppMethod },
    constants,
    R.map(doMemoize, otherMethods));
}

module.exports = Object.assign({ memoized }, constants, methods);
