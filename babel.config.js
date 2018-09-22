module.exports = function (api) {
    api.cache(true)

    const presets = [
        [
            "@babel/preset-env",
            {
                "debug": false,
                "targets": {
                    "browsers": [
                        "last 3 versions"
                    ]
                }
            }
        ]
    ];

    return {
        presets
    };
}