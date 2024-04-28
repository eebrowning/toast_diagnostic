//helps avoid CORS and .env availability issues!
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://ws-api.toasttab.com/:path*',
        },
      ];
    },
    env: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      guid: process.env.GUID
    },
  };

