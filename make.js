/* eslint-disable no-console */
/* eslint-disable consistent-return */
const program = require( 'commander' );
const fs = require( 'fs' );
const path = require( 'path' );
const { promisify } = require( 'util' );

/* eslint-disable global-require */
const sources = {
	block: require( './templates/block' ),
	section: require( './templates/section' ),
	page: require( './templates/page' ),
	sass: require( './templates/sass' ),
	js: require( './templates/js' ),
};
/* eslint-enable global-require */

const dirPath = {
	block: path.resolve( 'app/blocks' ),
	page: path.resolve( 'app/pages' ),
	section: path.resolve( 'app/sections' ),
};

const validateName = ( name, kind ) => new Promise( ( resolve, reject ) => {
	const isValid = /^(\d|\w|-)+$/.test( name );

	if ( isValid ) {
		resolve( isValid );
	} else {
		const errMsg =				`ERR>>> An incorrect ${kind} name '${name}'\n`
				+ 'ERR>>> A block name must include letters, numbers & the minus symbol.';
		reject( errMsg );
	}
} );

const directoryExist = ( blockPath, name, kind ) => new Promise( ( resolve, reject ) => {
	fs.stat( blockPath, ( notExist ) => {
		if ( notExist ) {
			resolve();
		} else {
			console.log( blockPath );
			reject( `ERR>>> The ${kind} '${name}' already exists.` );
		}
	} );
} );

const createDir = ( blockPath ) => new Promise( ( resolve, reject ) => {
	fs.mkdir( blockPath, ( err ) => {
		if ( err ) {
			reject( `ERR>>> Failed to create a folder '${dirPath}'` );
		} else {
			resolve();
		}
	} );
} );

const generateFileSources = ( name, kind, js ) => {
	const data = {};
	data.pug = sources[kind]( name ).trim();
	data.sass = sources.sass( name ).trim();

	if ( js ) {
		data.js = sources.js( name ).trim();
	}

	return Promise.resolve( data );
};

const createFiles = ( blockPath, name, files ) => Object.keys( files ).map( ( ext ) => {
	const filePath = path.join( blockPath, `${name}.${ext}` );
	const fileSource = files[ext];

	return new Promise( ( resolve, reject ) => {
		fs.writeFile( filePath, fileSource, 'utf8', ( err ) => {
			if ( err ) {
				reject( `ERR>>> Failed to create a file '${filePath}'` );
			} else {
				resolve();
			}
		} );
	} );
} );

const getFiles = ( blockPath ) => new Promise( ( resolve, reject ) => {
	fs.readdir( blockPath, ( err, files ) => {
		if ( err ) {
			reject( `ERR>>> Failed to get a file list from a folder '${blockPath}'` );
		} else {
			resolve( files );
		}
	} );
} );

const appendToIncludes = ( kind, blockName ) => {
	const filePath = './app/layouts/_internalIncludes.pug';

	if ( ['section', 'block'].indexOf( kind ) === -1 ) {
		return;
	}

	const file = fs.readFileSync( filePath, 'utf8' );
	const includeString =	`include ../${kind}s/${blockName}/${blockName}`;
	const lines = file.split( /\n/ );

	if ( lines.slice( -1 )[0].length < 1 ) {
		lines.pop();
	}

	if ( lines.indexOf( includeString ) !== -1 ) {
		return console.log(
			`>>> ${kind} ${blockName} already included to '${filePath}'`,
		);
	}

	lines.push( includeString );
	const nextFile = lines.join( '\n' );
	fs.writeFileSync( filePath, nextFile, 'utf8' );
};

const make = ( name, kind, js ) => {
	const blockPath = path.join( dirPath[kind], name );

	return validateName( name, kind )
		.then( () => directoryExist( blockPath, name, kind ) )
		.then( () => createDir( blockPath ) )
		.then( () => generateFileSources( name, kind, js ) )
		.then( ( files ) => createFiles( blockPath, name, files ) )
		.then( () => getFiles( blockPath ) )
		.then( ( files ) => {
			const line = '-'.repeat( 48 + name.length );
			console.log( line );
			console.log( `The block has just been created in 'app/${kind}s/${name}'` );
			console.log( line );

			// Displays a list of files created
			files.forEach( ( file ) => console.log( file ) );
		} )
		.then( () => ( { kind, name } ) );
};

const printError = ( err ) => console.log( err );

program
	.command( 'block [blockNames...]' )
	.option( '--js', 'Generate script file' )
	.action( async ( blockNames, opts ) => {
		if ( blockNames === undefined ) {
			return console.log( 'Please enter blockName' );
		}

		const promises = blockNames.map( ( name ) => make( name, 'block', opts.js ) );

		const blocks = await Promise.all( promises ).catch( printError );
		blocks.forEach( ( block ) => appendToIncludes( block.kind, block.name ) );
	} );

program
	.command( 'section [sectionNames...]' )
	.option( '--js', 'Generate script file' )
	.action( async ( sectionNames, opts ) => {
		if ( sectionNames === undefined ) {
			return console.log( 'Please enter sectionName' );
		}

		const promises = sectionNames.map( ( name ) => make( name, 'section', opts.js ) );
		Promise.all( promises ).catch( printError );

		const blocks = await Promise.all( promises ).catch( printError );
		blocks.forEach( ( block ) => appendToIncludes( block.kind, block.name ) );
	} );

program
	.command( 'page [pageNames...]' )
	.option( '--js', 'Generate script file' )
	.action( async ( pageNames, opts ) => {
		if ( pageNames === undefined ) {
			return console.log( 'Please enter pageName' );
		}

		const promises = pageNames.map( ( name ) => make( name, 'page', opts.js ) );
		Promise.all( promises ).catch( printError );

		const blocks = await Promise.all( promises ).catch( printError );
		blocks.forEach( ( block ) => appendToIncludes( block.kind, block.name ) );
	} );

program.parse( process.argv );
