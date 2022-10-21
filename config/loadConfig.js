const fs = require("fs");
const path = require("path");

function loadConfig(filePath) {
    const configPath = path.resolve(__dirname, filePath);
    const configFile = fs.readFileSync(configPath);
    const config = JSON.parse(configFile);

    return config;
}

module.exports = loadConfig;
