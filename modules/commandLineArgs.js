'use strict';

/**
 * Command Line Args module.
 */
var CommandLineArgs = (function() {
	var exposed = {
		/**
		 * Return the list of arguments informed by the used.
		 * @return {string[]} Arguments list.
		 */
		get: function() {
			return process.argv.slice(2);
		},

		/**
		 * Return the string representation of arguments.
		 * @return {string} Arguments separated by comma.
		 */
		toString: function() {
			return this.get().join(',');
		}
	};

	return exposed;
})();

module.exports = CommandLineArgs;