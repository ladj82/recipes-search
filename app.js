/*!
 * Recepies Search
 * Copyright(c) 2018 Luiz Duarte <luizduarte82@gmail.com>
 * MIT Licensed
 */

'use strict';

/** App used modules. */
var Args = require('./modules/commandLineArgs');
var Search = require('./modules/searchRecipe');
var Print = require('./modules/printRecipe');

/**
 * App entry point.
 * @requires module:modules/commandLineArgs
 * @requires module:modules/searchRecipe
 * @requires module:modules/printRecipe
 */
(function() {
	Search.load(Args.toString())
		.then(() => Print.output(Search.getRecipes(), Search.getUsedIngredients()))
		.catch(ex => console.log('Error: ' + ex))
})();
