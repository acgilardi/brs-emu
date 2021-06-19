const path = require("path");

module.exports = env => {
    const isProduction = env.NODE_ENV === "production";
    let outputFile, mode;
    let libraryName = "brsEmu";
    if (isProduction) {
        mode = "production";
        outputFile = libraryName + ".min.js";
    } else {
        mode = "development";
        outputFile = libraryName + ".js";
    }
    return [
        {
            entry: "./src/index.ts",
            target: "web",
            mode: mode,
            devtool: "inline-source-map",
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: "ts-loader",
                        exclude: /node_modules/,
                    },
                ],
            },
            resolve: {
                modules: [path.resolve("./node_modules"), path.resolve("./src")],
                extensions: [".tsx", ".ts", ".js"],
            },
            node: { fs: "empty", readline: "empty" },
            output: {
                path: path.join(__dirname, "app/lib"),
                filename: outputFile,
                library: libraryName,
                libraryTarget: "umd",
                umdNamedDefine: true,
                globalObject: "typeof self !== 'undefined' ? self : this",
            },
        },
    ];
};
