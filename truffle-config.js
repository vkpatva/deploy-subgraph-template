const HDWalletProvider = require('@truffle/hdwallet-provider');

require('dotenv').config(); // Load environment variables from .env file

const mnemonic = process.env.MNEMONIC;
const alchemyUrl = process.env.ALCHEMY_URL;

module.exports = {
  networks: {
    polygon: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic,
          },
          providerOrUrl: alchemyUrl,
        }),
      network_id: 80001, // Polygon mainnet network id
      gasPrice: 20000000000, // Adjust the gas price as needed
      gas: 8000000, // Gas limit
      confirmations: 2, // Number of confirmations to wait before deployment is considered successful
      timeoutBlocks: 200, // Number of blocks to wait before deployment times out
      skipDryRun: true, // Skip the dry run before deployment
    },
  },

  compilers: {
    solc: {
      version: '0.8.0', // Use the Solidity compiler version that your contract was developed with
    },
  },
};
