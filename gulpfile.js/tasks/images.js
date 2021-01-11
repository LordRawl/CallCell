const gulp = require( 'gulp' );
const plumber = require( 'gulp-plumber' );
const errorHandler = require( 'gulp-plumber-error-handler' );
const newer = require( 'gulp-newer' );
const flatten = require( 'gulp-flatten' );

module.exports = () => gulp
	.src( ['app/static/images/**/*', 'app/sections/**/*.{png,jpg,jpeg,webp,svg}', 'app/pages/**/*.{png,jpg,jpeg,webp,svg}'] )
	.pipe( plumber( { errorHandler: errorHandler( 'Error in images task' ) } ) )
	.pipe( flatten( { includeParents: [1] } ) )
	.pipe( newer( 'dist/assets/images' ) )
	.pipe( gulp.dest( 'dist/assets/images' ) );
