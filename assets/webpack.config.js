const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Md5Hash = require('webpack-md5-hash');

module.exports = {
	entry: {
		'index.css': [
			'./scss/index.scss',
		],
		'index.js': [
		  './ts/index.tsx',
		],
	},
	output: {
		path: path.resolve(__dirname, '..', 'public', 'build'),
		filename: '[chunkhash].[name]',
		chunkFilename: '[chunkhash].[name]',
		library: 'areyuoinfordinner',
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /(node_modules)/, },

			// { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	},
	plugins: [
		new ExtractTextPlugin({filename: '[chunkhash].[name]', allChunks: false}),
		new Md5Hash(),
		new ManifestPlugin({
			stripSrc: new RegExp('(.css|.js)'),
		}),
		new CleanWebpackPlugin([
			path.resolve(__dirname, '..', 'public', 'build'),
		], {
			root: __dirname,
			verbose: true,
			dry: false,
			exclude: ['manifest.json'],
		}),
		new CompressionPlugin(),
	],
};
