const path = require('path');

const paths = {};

paths.root = path.join(__dirname, '..');
paths.dist = path.join(paths.root, 'dist');
paths.public = path.join(paths.root, 'public');
paths.res = path.join(paths.root, 'res');
paths.src = path.join(paths.root, 'src');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    paths,
    isProd
};
