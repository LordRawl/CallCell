const browserSync = require( 'browser-sync' ).create();
const debuga = require( 'debuga' );

module.exports = () => {
	browserSync.init( {
		open: true,
		reloadOnRestart: true,
		reloadDebounce: 100,
		port: 3000,
		snippetOptions: {
			rules: {
				match: /<\/body>/i,
			},
		},
		server: {
			baseDir: ['./dist'],
		},
		directory: false,
		middleware: [debuga()],
		// notify: false // Отключаем уведомления
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	} );

	browserSync.watch( 'dist/**/*' ).on( 'change', browserSync.reload );
};
