'use strict';

/**
 * Utility module.
 */
var Utility = (function() {
	var exposed = {
		/**
		 * String Sanitizer.
		 * @param {string} targetString - String to be sanitized.
		 * @returns {string} Sanitized string.
		 * @todo Make it better
		 */
		stringSanitizer: function(targetString) {
			if (targetString) {
				return targetString.replace(/[\n\r\t]/g, '');	
			}
		},

		/**
		 * Object String Properties Sanitizer.
		 * @param {object} targetObject - Object to be sanitized.
		 * @param {callback} sanitizer - Callback function to be used as sanitizer.
		 */
		objectStringPropertiesSanitizer: function(targetObject, sanitizer) {
			Object.keys(targetObject).forEach(propertyName => {
        if (targetObject[propertyName] && typeof targetObject[propertyName] === 'object') {
            objectStringPropertiesSanitizer(targetObject[propertyName], sanitizer);
            return;
        }

        targetObject[propertyName] = sanitizer(targetObject[propertyName]);
    	})
		}
	};

	return exposed;
})();

module.exports = Utility;