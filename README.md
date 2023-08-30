# Deploy Subgraph Template

This repository provides a template for deploying a smart contract on Polygon Mumbai and setting up a basic subgraph to index events from the smart contract.

## Prerequisites

- Node.js and npm: [Install Node.js](https://nodejs.org/)
- Truffle: Install Truffle globally using `npm install -g truffle`

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/vkpatva/deploy-subgraph-template.git
   ```

2. Install project dependencies:
    ``` bash
    cd deploy-subgraph-template
    npm install
    ```

3. Setting up Environment Variables

   ```bash
   cp .env.example .env
   ```

   Open the .env file in a text editor of your choice.
   Replace the placeholders with your actual values:

   MNEMONIC: Replace with your wallet's mnemonic(seed phrase).

   ALCHEMY_URL: Replace with the Alchemy URL for Polygon Mumbai.

   for eg.
   ```
   MNEMONIC=happy sad ........ 
   ALCHEMY_URL=https://polygon-mumbai.alchemyapi.io/v2/your-alchemy-key
   ```
   Save the .env file.

   Make sure to keep your .env file secure and never commit it to version control.

4. Write your smart contract code or use an existing one. Place it in the `contracts/` directory.

5. Create a migration script to deploy your smart contract. For example, you can create a new migration script in the `migrations/` directory like `2_deploy_contract.js`:

   ```javascript
   const EtherBank = artifacts.require('EtherBank'); // Adjust this based on your contract's name

   module.exports = async function (deployer) {
     // Deploy EtherBank contract
     await deployer.deploy(EtherBank);

     // Get the deployed instance of the contract
     const etherBankInstance = await EtherBank.deployed();

     console.log('EtherBank contract deployed at:', etherBankInstance.address);
   };


6. truffle migrate --network polygon_mumbai
