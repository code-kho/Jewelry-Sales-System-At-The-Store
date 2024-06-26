// next.config.js
const withTM = require("next-transpile-modules")([
    "mui-one-time-password-input",
]);

module.exports = withTM({
    // any other next.js settings you want to configure
});

module.exports = withTM({
    devIndicators: {},
    publicRuntimeConfig: {
        // Available on both server and client
        theme: "DEFAULT",
        currency: "USD",
    },
    images: {
        domains: ["firebasestorage.googleapis.com"],
        remotePatterns: [
            {
                hostname: "picsum.photo",
            },
        ],
    },
});
