'use strict';

/**
 * Print Recipe module.
 */
var PrintRecipe = (function() {
	var exposed = {
		/**
		 * Print on screen the found recipes and used ingredients.
		 * @param {Recipe[]} recipes - Array of recipes.
		 * @param {string} usedIngredients - Used ingredients.
		 */
		output: function(recipes, usedIngredients) {
			var recipes = recipes || [];
			var usedIngredients = usedIngredients || [];

			if (recipes.length > 0) {
				console.log('\t');
				
				recipes.forEach((item) => {
					console.log(item.toString());
					console.log('\t');
				});

				console.log('Used Ingredients: %s', usedIngredients);
				console.log('\t');
			}
			else {
				console.log('No results were found.');
			}
		}
	};

	return exposed;
})();

module.exports = PrintRecipe;