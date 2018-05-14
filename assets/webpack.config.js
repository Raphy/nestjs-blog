const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Md5Hash = require('webpack-md5-hash');

const isProduction = process.argv.indexOf('-p') >= 0;

module.exports = {
	mode: isProduction ? 'production' : 'development',
	entry: {
		'index.css': [
			'./sass/index.scss',
		],
		'index.js': [
		  './js/index.tsx',
		],
	},
	output: {
		path: path.resolve(__dirname, '..', 'public', 'build'),
		filename: isProduction ? '[chunkhash].[name]' : '[name]',
		chunkFilename: isProduction ? '[chunkhash].[name]' : '[name]',
		library: 'blog',
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		// Fix webpack's default behavior to not load packages with jsnext:main module
		// (jsnext:main directs not usually distributable es6 format, but es6 sources)
		mainFields: ['module', 'browser', 'main'],
		// alias: {
		// 	app: path.resolve(__dirname, 'src/app/')
		// }
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						//loader: isProduction ? 'ts-loader' : ['babel-loader', 'ts-loader'],
						options: {
							allowTsInNodeModules: false,
							transpileOnly: true
						},
					},
				],
				exclude: /(node_modules)/,
			},
			{
				test: /.(png|jpg|gif|woff(2)?|eot|ttf|svg|jpg|jpeg)(\?[a-z0-9=\.]+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'resolve-url-loader',
						},
						{
							loader: 'sass-loader',
						},
					],
				}),
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'resolve-url-loader',
						},
					]
				}),
			},
		],
	},
	plugins: [
		new ExtractTextPlugin({filename: isProduction ? '[chunkhash].[name]' : '[name]', allChunks: false}),
		new Md5Hash(),
		new ManifestPlugin({
			stripSrc: new RegExp('(.css|.js)'),
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
			DEBUG: false
		}),
		new CleanWebpackPlugin([
			path.resolve(__dirname, '..', 'public', 'build'),
		], {
			root: path.resolve(__dirname, '..'),
			verbose: true,
			dry: false,
			exclude: ['manifest.json'],
		}),
		new CompressionPlugin(),
	],
};
