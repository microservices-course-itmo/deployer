// used only for JEST
// babel config for project specified in build-tools/webpack.base.config.js

module.exports = {
    plugins: ["transform-class-properties"],
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
};