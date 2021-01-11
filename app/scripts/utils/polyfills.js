/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-rest-params */
if ( window.NodeList && !NodeList.prototype.forEach ) {
	NodeList.prototype.forEach = function ( callback, thisArg ) {
		thisArg = thisArg || window;
		for ( let i = 0; i < this.length; i++ ) {
			callback.call( thisArg, this[i], i, this );
		}
	};
}
