module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!

  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    test: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    }
  }
};
