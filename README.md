# Deploy Subgraph Template

This repository provides a template for deploying a smart contract on Polygon Mumbai and setting up a basic subgraph to index events from the smart contract.

## Prerequisites

- Node.js and npm: [Install Node.js](https://nodejs.org/)
- Truffle: Install Truffle globally using `npm install -g truffle`

## Getting Started with Smart Contract

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


6. Deploy the smart contract to Polygon Mumbai:
   ```bash
   truffle migrate --network mumbai
   ```

7. Transaction Scripts for Smart Contract

   This repository provides scripts to interact with a smart contract on the Ethereum blockchain. The scripts include:

   1. **Deposit Script**: A script to deposit Ether into the smart contract.
   2. **Withdraw Script**: A script to withdraw Ether from the smart contract.
   3. **Zero Transaction Script**: A script to send a zero-value transaction to a smart contract, which can be used to cancel a pending transaction.

   **Deposit Script**

   This script allows you to deposit Ether into the smart contract.

   - *Script:* `scripts/deposit.js`
   - *Command:* `node ./scripts/deposit.js`

   Make sure to edit the script to include the correct contract ABI, contract address, and adjust the deposit amount if needed.

   **Withdraw Script**

   This script allows you to withdraw Ether from the smart contract.

   - *Script:* `scripts/withdraw.js`
   - *Command:* `node ./scripts/withdraw.js`

   Make sure to edit the script to include the correct contract ABI, contract address, and adjust the withdrawal amount if needed.

   **Zero Transaction Script**

   This script sends a zero-value transaction to the your address, which can be used to cancel a pending transaction.

   - *Script:* `scripts/zeroTx.js`
   - *Command:* `node ./scripts/zeroTx.js`

   Edit the script to include the correct sender address and adjust any necessary parameters.

   
   To run the scripts, open a terminal window and navigate to the project directory. Use the corresponding `node` command for the script you want to execute:

   ```bash
      node ./script/deposit.js
      node ./script/withdraw.js
      node ./script/zero_tx.js
   ```


## Deploying a Subgraph for Contracts using The Graph

This guide outlines the steps to deploy a subgraph for contracts using The Graph. A subgraph allows you to index and query data from your smart contracts, making it easy to create APIs and visualizations for your blockchain data.

### Steps

1. **Connect to The Graph Explorer:**
   - Go to [The Graph Explorer](https://thegraph.com/explorer).
   - Connect your Metamask wallet and ensure you have test tokens.

2. **Create Subgraph on Subgraph Studio:**
   - Navigate to Subgraph Studio and click "Create Subgraph".
   - Enter the required details. (You can also use existing contracts)
   - Note: You need to pay to publish subgraphs, but you can keep them private during creation.

3. **Install Graph CLI and Initialize Subgraph:**
   - Install the Graph CLI package: `npm install -g @graphprotocol/graph-cli`
   - Initialize the subgraph for the Polygon contract:
     ```
     graph init --studio polygoncontract
     ```
   - Select the protocol (Ethereum) and the chain (Polygon).

4. **Provide Contract Address:**
   - Provide the contract address of the deployed contract for subgraph creation.

5. **Schema Definition:**
   - Define the schema in `schema.graphql` to specify accessible events and properties.
   - The schema should match what you want to query via the API.

6. **Authorization and Deployment:**
   - Authorize and deploy the subgraph using your key:
     ```
     graph auth https://api.thegraph.com/deploy/ <ACCESS_TOKEN>
     graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ <SUBGRAPH_NAME>
     ```
   - For detailed steps, follow this [video tutorial](https://thegraph.com/docs/en/deploying/subgraph-studio/).

7. **Upload to IPFS:**
   - Your subgraph will be uploaded to IPFS and shown on your The Graph dashboard.
   - The subgraph can be queried using the API generated.

### Additional Notes

- **Start Block:** You can specify a start block to begin indexing events. It's not necessary to index events before the contract's deployment.
- **subgraph.yaml:** This file contains information about the created subgraph.
- **schema.graphql:** Defines the events and properties accessible through the API. The schema matches the playground schema.
- **Build Directory:** The contents of the build directory are the ones that will be uploaded to IPFS.

**Note:** Always exercise caution when dealing with contracts and data. Make sure to test thoroughly with test tokens before using real funds or data.

For more detailed information, refer to The Graph documentation and resources:
- [Deploying a Subgraph to Studio](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-studio/)
- [The Graph Documentation](https://thegraph.com/docs/en/)
