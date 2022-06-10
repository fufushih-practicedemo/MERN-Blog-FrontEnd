/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  publicRuntimeConfig: {
    APP_NAME: 'SEOBLOG',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    API_PRODUCTION: 'https//seoblog.com',
    PRODUCTION: false,
    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: 'https//seoblog.com',
    FB_APP_ID: '',
    DISQUS_SHORTNAME: 'mernblog-1',
    SALT: 'afiuhauidhfiacbi'
  }
}

module.exports = nextConfig
