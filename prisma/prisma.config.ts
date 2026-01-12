export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
      adapter: 'neon',
    },
  },
};
