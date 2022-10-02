const path = require('path');

module.exports = (config, env) => {
	config.module.rules.push(
		{
			test: /\.module\.scss$/,
			use: [
				'style-loader',
				{
					loader: require.resolve('css-loader'),
					options: {
						modules: true,
						importLoaders: 1,
						localIdentName: '[local]__[hash:base64:5]',
					},
				},
			],
			include: path.resolve('src'),
		}
	);
	return config;
};
