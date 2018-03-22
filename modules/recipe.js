'use strict';

var Utility = require('../modules/utility');

/**
 * Recipe constructor.
 * @constructor
 * @param {string} name - Recipe's name.
 * @param {string} url - Recipe's URL.
 * @param {string} thumbnail - Recipe's Thumbnail URL.
 * @param {string} ingredients - Recipe's ingredients separated by comma.
 * @requires module:modules/utility
 */
function Recipe(name, url, thumbnail, ingredients) {
	this.name = name || null;
	this.url = url || null;
	this.thumbnail = thumbnail || null;
	this.ingredients = ingredients || null;

	Utility.objectStringPropertiesSanitizer(this, Utility.stringSanitizer);
}

/**
 * Return the string representation of recipe's object.
 * @returns {string} Recipe's string.
 */
Recipe.prototype.toString = function() {
	return 'Name: ' + this.name + '\n' + 'URL: ' + this.url + '\n' + 'Thumbnail: ' + this.thumbnail;
}

/**
 * Check if the Recipe object is valid.
 * @todo Add better validation on next sprint.
 * @return {boolean}
 */
Recipe.prototype.isValid = function() {
	if (!this.thumbnail) {
		return false;
	}

	return true;
}

module.exports = Recipe;