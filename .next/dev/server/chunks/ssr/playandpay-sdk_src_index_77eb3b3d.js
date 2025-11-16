module.exports = [
"[project]/playandpay-sdk/src/index.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/playandpay-sdk_src_wallet-connect_483d7b48.js",
  "server/chunks/ssr/e21d5_algosdk_dist_esm_types_956cd924._.js",
  "server/chunks/ssr/e21d5_algosdk_dist_esm_client_7225251e._.js",
  "server/chunks/ssr/e21d5_algosdk_dist_esm_75907e97._.js",
  "server/chunks/ssr/e21d5_1a28da86._.js",
  "server/chunks/ssr/[root-of-the-server]__73b05591._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/playandpay-sdk/src/index.js [app-ssr] (ecmascript)");
    });
});
}),
];