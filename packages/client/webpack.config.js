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
                    test: /\.(js|jsx)$/,
                    exclude: '/node_modules/',
                    use: ['babel-loader'],
                },
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'ts-loader',
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        },
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
