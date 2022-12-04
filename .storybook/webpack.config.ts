import webpack from 'webpack';
import path from 'path';

export default ({ config }: {config: webpack.Configuration}) => {
	config!.resolve!.modules!.push(path.resolve(__dirname, '..', 'src'));
	config!.resolve!.extensions!.push('.ts', '.tsx');

	return config;
};
