var path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path:path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [{
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			use:{
				loader : 'babel-loader',
				options : {
					presets: [['env', {
						'targets':{
							'browsers':['last 2 versions']
						},
						'debug': true
					}]]
				}
			}
		}]
	},
	devServer : {
		contentBase: path.join(__dirname, ''),
		publicPath: '/dist',
    	compress: true,
    	port: 9000,
		inline: true
	}
}
