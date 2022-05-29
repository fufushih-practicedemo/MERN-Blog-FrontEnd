/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  publicRuntimeConfig: {
    APP_NAME: 'SEOBLOG',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    PRODUCTION: false
  }
}

module.exports = nextConfig
