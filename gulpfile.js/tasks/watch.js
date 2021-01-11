const gulp = require( 'gulp' );

module.exports = () => {
	global.isWatching = true;

	gulp.watch( 'app/static/icons/**/*', gulp.series( 'icons' ) );
	gulp.watch( ['app/static/images/**/*', 'app/sections/**/*.{png,jpg,jpeg,webp,svg}', 'app/pages/**/*.{png,jpg,jpeg,webp,svg}'], gulp.series( 'images' ) );
	gulp.watch( 'app/static/misc/**/*', gulp.series( 'copy' ) );
	gulp.watch( 'app/{pages,blocks,sections,layouts}/**/*.pug', gulp.series( 'templates' ) );
	gulp.watch( 'app/{styles,blocks,sections,pages}/**/*.sass', { delay: 500 }, gulp.series( 'styles' ) );
	gulp.watch( 'app/data/**/*.json', gulp.series( 'templates' ) );
};
