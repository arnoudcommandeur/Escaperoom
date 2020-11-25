const HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;

if (!MNEMONIC || !INFURA_KEY) {
  console.error("Please set a mnemonic and infura key.")
  return
}

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
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          MNEMONIC,
          "https://rinkeby.infura.io/v3/" + INFURA_KEY,
          0,
          10
        );
      },
      network_id: "*",
      gas: 5000000
    }
  }
};
