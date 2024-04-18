const PBA = "******";

module.exports = {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    cache: true,
    devServer: {
        port: 9000,
        hot: true,
        historyApiFallback: true,
        devMiddleware: { stats: "minimal" },
        proxy: ["/api", "/actuator"].reduce(
            (acc, curr) => ({
                ...acc,
                [curr]: {
                    target: "https://localhost:8000",
                    secure: false,
                    onProxyReq: function (proxyReq) {
                        proxyReq.setHeader("Cookie", `IMPERSONATED_USER=${PBA}; CAN_IMPERSONATE=yes`);
                    },
                },
            }),
            {}
        ),
    },
};
