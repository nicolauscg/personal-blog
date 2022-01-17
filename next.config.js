/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "s3.us-west-2.amazonaws.com",
      "www.notion.so",
      "images.unsplash.com",
    ],
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
};
