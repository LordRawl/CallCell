const webpack = require( 'webpack' );
const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );

const isDebug = process.env.NODE_ENV !== 'production';
const isProd = !isDebug;

const optimization = () => {
	const config = {};

	if ( isProd ) {
		config.minimizer = [new TerserPlugin( {
			extractComments: false,
		} )];
	}

	return config;
};

module.exports = ( watch = false ) => ( {
	mode: isDebug ? 'development' : 'production',
	entry: {
		app: path.resolve( './app/scripts/app.js' ),
		animation: path.resolve( './app/scripts/animation.js' ),
	},
	output: {
		publicPath: '/assets/scripts/',
		filename: '[name].min.js',
		path: path.resolve( './dist/assets/scripts/' ),
	},
	resolve: {
		alias: {
			'@blocks': path.resolve( __dirname, 'app/blocks/' ),
			'@sections': path.resolve( __dirname, 'app/sections/' ),
		},
	},
	watch,
	devtool: isDebug ? 'inline-cheap-module-source-map' : false,
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				// cache: true,
				fix: true,
			},
		},
		{
			test: /\.js$/,
			// exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					babelrc: false,
					presets: ['@babel/preset-env'],
					plugins: [
						[
							'@babel/plugin-proposal-class-properties',
							{
								loose: true,
							},
						],
					],
				},
			},
		},
		],
	},
	optimization: optimization(),
	plugins: [
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' ),
			},
		} ),
		// new webpack.NoEmitOnErrorsPlugin(),
	],
} );
