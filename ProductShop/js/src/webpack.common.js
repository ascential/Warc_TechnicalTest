const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
	entry: path.resolve(__dirname, "index.jsx"),
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				include: path.resolve(__dirname),
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								[
									"@babel/preset-env",
									{
										targets: "defaults",
									},
								],
								"@babel/preset-react",
							],
							plugins: [
								"@babel/proposal-class-properties",
								"@babel/plugin-syntax-dynamic-import",
							],
						},
					},
				],
			},
			{
				test: /\.(?:le|c)ss$/,
				use: [
					require.resolve("style-loader"),
					{
						loader: require.resolve("css-loader"),
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: require.resolve("less-loader"),
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx"],
		modules: ["node_modules"],
	},
};
