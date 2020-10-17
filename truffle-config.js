module.exports = {
  compilers: {
    solc: {
      version: "0.6.2",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    }
  },
  networks: {
    // remove this to test without ganache-cli or ganache
    development: {
      host: "localhost", // start Ganache-UI before starting Truffle
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
