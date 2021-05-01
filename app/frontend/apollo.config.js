module.exports = {
  client: {
    includes: ['./src/**/*.{tsx,ts}'],
    tagName: 'gql',
    service: {
      name: 'graphql-url',
      url: 'http://127.0.0.1:4000/graphql',
    },
  },
};
