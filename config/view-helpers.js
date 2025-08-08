
const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        if (env.name == 'development'){
            // Add cache-busting based on file mtime in development
            try {
                const fullPath = path.join(__dirname, '..', env.asset_path, filePath);
                const mtime = fs.statSync(fullPath).mtime.getTime();
                return `/${filePath}?v=${mtime}`;
            } catch (e) {
                return `/${filePath}?v=${Date.now()}`;
            }
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json')))[filePath];
    }
}