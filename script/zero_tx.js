const { Web3 } = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const mnemonic = process.env.MNEMONIC;
const alchemyUrl = process.env.ALCHEMY_URL;

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonic,
  },
  providerOrUrl: alchemyUrl,
});

const web3 = new Web3(provider);


const senderAddress = "0xa4F07F05a3AcB12A17934017f1644c55AC3CebAb"; // Replace with your sender address

async function cancelPendingTransaction() {
  try {
    const nonce = await web3.eth.getTransactionCount(senderAddress, "latest");
    console.log("Nonce:", nonce);

    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from : senderAddress,
      to: senderAddress,
      gas : 21000,
      value : 0,
      maxFeePerGas: 51000000000, // Max fee per gas
      maxPriorityFeePerGas: 30000000000, // Max priority fee per gas
    };

    await web3.eth
    .sendTransaction(txObject)
    .on("transactionHash", function (hash) {
      console.log("Transaction Hash:", hash);
    })
    .on("error", function (error) {
      console.error("Error:", error);
    });

    console.log("Transaction to cancel pending transaction sent:", receipt.transactionHash);
  } catch (error) {
    console.error("Error cancelling pending transaction:", error);
  }
}

cancelPendingTransaction();
