const gulp = require( 'gulp' );
const pug = require( 'gulp-pug' );
const plumber = require( 'gulp-plumber' );
const errorHandler = require( 'gulp-plumber-error-handler' );
const prettify = require( 'gulp-jsbeautifier' );
const filter = require( 'gulp-filter' );
const rename = require( 'gulp-rename' );
const getData = require( 'jade-get-data' )( 'app/data' );

module.exports = () => gulp
	.src( 'app/**/*.pug' )
	.pipe( plumber( { errorHandler: errorHandler( 'Error in templates task' ) } ) )
	.pipe( filter( ( file ) => /app[\\\/]pages/.test( file.path ) ) ) // eslint-disable-line no-useless-escape
	.pipe( pug( { data: { getData } } ) )
	.pipe(
		prettify( {
			indent_size: 2,
			brace_style: 'expand',
			indent_with_tabs: true,
			indent_inner_html: true,
			preserve_newlines: true,
			end_with_newline: true,
			// wrap_line_length: 120,
			max_preserve_newlines: 50,
			wrap_attributes_indent_size: 1,
			inline: ['abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small', 'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',	'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'],
		} ),
	)
	.pipe( rename( { dirname: '.' } ) )
	.pipe( gulp.dest( 'dist' ) );
