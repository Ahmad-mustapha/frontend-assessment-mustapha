const config = {
    default: {
        override: {
            wrapper: "cloudflare",
            converter: "edge",
            incrementalCache: "dummy",
            tagCache: "dummy",
            queue: "dummy",
        },
    },
    edgeExternals: ["node:crypto"],
    middleware: {
        external: true,
        override: {
            wrapper: "cloudflare-edge",
            converter: "edge",
            proxyExternalRequest: "fetch",
            incrementalCache: "dummy",
            tagCache: "dummy",
            queue: "dummy",
        },
    },
};

export default config;
