const path = require("path");

module.exports = {
    ...require("./config.js"),
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "../www"),
        },
        compress: true,
        port: 9000,
    },
};