'use strict';

/** Used modules. */
var Http = require('http');
var Recipe = require('../modules/recipe');

/**
 * Search Recipe module.
 * @requires module:http
 * @requires module:modules/recipe
 */
var SearchRecipe = (function() {
  const MAX_RESULTS = 20;
  const REQUEST_URL = 'www.recipepuppy.com';
  const REQUEST_API_PATH = '/api/?';
  const RESPONSE_API_VERSION = 0.1;
  var _recipes = [];
  var _usedIngredients = [];

  /**
   * Add valid recipe to internal array of recipes.
   * @param {Recipe} recipe - Object to be added.
   * @returns {boolean}
   */
  var addRecipe = function(recipe) {
    try {
      if (recipe.isValid()) {
        // Adding regular recipe
        _recipes.push(recipe);
        
        // Adding used ingredients to general list
        recipe.ingredients.split(', ').forEach((item) => {
          if (_usedIngredients.indexOf(item) < 0) {
            _usedIngredients.push(item);
          }
        });

        return true;
      }
      else {
        console.log('Warning: Attempt to add not valid recipe into the list.');
        return false;
      }
    }
    catch(ex) {
      console.log('Error: ' + ex);
      return false;
    } 
  }

  /**
   * Check if API response is valid.
   * @param {string} apiResponse - API response buffer.
   * @returns {boolean} || JSON
   */
  var parseResponse = function(apiResponse) {
    try {
      let response = JSON.parse(apiResponse);

      if (!response.hasOwnProperty('version')) {
        throw 'API version property was not found.';
      }

      if (response.version !== RESPONSE_API_VERSION) {
        throw 'API version does not match. Current: "' + response.version + '" Expected: "' + RESPONSE_API_VERSION + '".';
      }

      if (!response.hasOwnProperty('results')) {
        throw 'API results property was not found.';
      }

      if (!response.results instanceof Array) {
        throw 'API results is expected to be an array of elements.';
      }

      return response;
    }
    catch(ex) {
      console.log('Error: %s', ex);
      return false;
    }
  }

  var exposed = {
    /**
     * Load recipes from API.
     * @param {string} ingredients - String separated by commas.
     * @returns {Promise}
     */
    load: function(ingredients) {
      return new Promise((resolve, reject) => {
        let ingredientsParameters = ingredients ? 'i=' + ingredients : '';
        let getReqConfig = {
          hostname: REQUEST_URL,
          port: 80,
          path: REQUEST_API_PATH + ingredientsParameters,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        let req = Http.request(getReqConfig, (res) => {
          let chunks = [];

          res.on('data', (chunk) => {
            chunks.push(chunk);
          });

          res.on('end', () => {
            let buffer = Buffer.concat(chunks).toString();
            let response = parseResponse(buffer);

            if (response) {
              _recipes = [];
              _usedIngredients = [];
              response.results.slice(0, MAX_RESULTS).forEach((item) => { 
                addRecipe(new Recipe(item.title, item.href, item.thumbnail, item.ingredients))
              });

              resolve();
            }
            else {
              reject('Issues found while parsing API response data.');
            }
          });
        });

        req.on('error', (ex) => {
          reject(ex);
        });

        req.end();
      });
    },

    /**
     * Return loaded recipes from API.
     * @returns {Recipe[]} List of recipes.
     */
    getRecipes: function() {
      return _recipes;
    },

    /**
     * Return used ingredients from the loaded recipes.
     * @returns {string} Ingredients separated by comma.
     */
    getUsedIngredients: function() {
      return _usedIngredients.join(', ');
    }
  };

  return exposed;
})();

module.exports = SearchRecipe;