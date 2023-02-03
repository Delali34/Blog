/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  incremental: true,
};
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});
