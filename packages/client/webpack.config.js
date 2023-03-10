const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, options) => {
    return {
        entry: './src/index.tsx',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'build'),
        },
        module: {
            rules: [
                {
                    test: /\.scss$/i,
                    use: [
                        {
                            loader:
                                options.mode !== 'production'
                                    ? 'style-loader'
                                    : MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'swc-loader',
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx'],
        },
        devtool: 'inline-source-map',
        devServer: {
            static: {
                directory: path.join(__dirname, 'build'),
            },
            port: 3000,
            hot: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'public', 'index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
        ],
    };
};
