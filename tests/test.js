'use strict';

/** Used modules. */
var assert = require('chai').assert;
var Args = require('../modules/commandLineArgs');
var Recipe = require('../modules/Recipe');
var Search = require('../modules/SearchRecipe');

/**
 * Command Line Args tests.
 */
describe('Command Line Args', function() {
  describe('#get', function() {
  	it('can accept empty parameters', function() {
		  assert.isOk(Args.get());
    });

    it('needs to return array', function() {
		  assert.isArray(Args.get());
    });

    it('its length needs to be equal or greater than 0', function() {
		  assert.isAtLeast(Args.get().length, 0);
    });
  });

  describe('#toString', function() {
    it('needs to return string', function() {
      assert.isString(Args.toString());
    });
  });
});

/**
 * Recipe tests.
 */
describe('Recipe', function() {
  describe('#toString', function() {
    it('needs to return string', function() {
      var r = new Recipe();
      assert.isString(r.toString());
    });
  });

  describe('#isValid', function() {
    it('no thumbnail info needs to return false validation', function() {
      var r = new Recipe('name', 'href', null, 'item1, item2')
      assert.isFalse(r.isValid());
    });
  });
});

/**
 * Search Recipe tests.
 */
describe('Search Recipe', function() {
  describe('#getRecipes', function() {
    it('needs to return an array', function() {
      var i = 'onion,garlic';
      return Search.load(i)
        .then(() => { assert.isArray(Search.getRecipes()) })
        .catch((ex) => { assert.fail(ex, null, 'Issues found while requesting data.') });
    });

    it('needs to return up to 20 elements', function() {
      var i = 'onion,garlic';
      return Search.load(i)
        .then(() => { assert.isAtMost(Search.getRecipes().length, 20) })
        .catch((ex) => { assert.fail(ex, null, 'Issues found while requesting data.') });
    });
  });

  describe('#getUsedIngredients', function() {
    it('needs to return a string', function() {
      var i = 'onion,garlic';
      return Search.load(i)
        .then(() => { assert.isString(Search.getUsedIngredients()) })
        .catch((ex) => { assert.fail(ex, null, 'Issues found while requesting data.') });
    });

    it('needs to return a string containg all ingredients used on recipes found', function() {
      var i = 'salt';
      var expected = 'salt, beef';
      return Search.load(i)
        .then(() => { assert.equal(Search.getUsedIngredients(), expected) })
        .catch((ex) => { assert.fail(ex, null, 'Issues found while requesting data.') });
    });
  });
});