/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const gulp = require( 'gulp' );
const plumber = require( 'gulp-plumber' );
const errorHandler = require( 'gulp-plumber-error-handler' );
const gulpIf = require( 'gulp-if' );
const postcss = require( 'gulp-postcss' );
const sass = require( 'gulp-sass' );
const cssnano = require( 'gulp-cssnano' );
const sourcemaps = require( 'gulp-sourcemaps' );
const sassBulk = require( 'gulp-sass-bulk-import' );
const rename = require( 'gulp-rename' );

const isDebug = process.env.NODE_ENV !== 'production';

exports.build = () => gulp
	.src( 'app/styles/*.sass' )
	.pipe( plumber( { errorHandler: errorHandler( 'Error in styles task' ) } ) )
	.pipe( gulpIf( isDebug, sourcemaps.init() ) )
	.pipe( sassBulk() )
	.pipe( sass() )
	.pipe(
		postcss( [
			require( 'autoprefixer' ),
			require( 'postcss-discard-comments' ),
			require( 'postcss-import' ),
		] ),
	)
	.pipe( cssnano( { zindex: false } ) )
	.pipe( gulpIf( isDebug, sourcemaps.write() ) )
	.pipe( rename( { suffix: '.min' } ) )
	.pipe( gulp.dest( 'dist/assets/styles' ) );
