/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "ja",
    localeDetection: false,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
