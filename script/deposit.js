const { Web3 } = require("web3"); // Correct import
const HDWalletProvider = require("@truffle/hdwallet-provider");
const contractInfo = require("../build/contracts/EtherBank.json");
require("dotenv").config();

const executeTransaction = async () => {
  const mnemonic = process.env.MNEMONIC;
  const alchemyUrl = process.env.ALCHEMY_URL;

  const provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonic,
    },
    providerOrUrl: alchemyUrl,
  });

  const web3 = new Web3(provider);
  const contractAbi = contractInfo.abi;
  const contractAddress = contractInfo.networks["80001"].address;
  const accounts = provider.getAddresses();
  const etherBankContract = new web3.eth.Contract(contractAbi, contractAddress);

  try {
  // Prepare the data for the deposit function call
    const depositData = etherBankContract.methods.deposit().encodeABI();
    for (let i = 0; i < 5; i++) {
      const txObj = {
        from: accounts[i],
        to: contractAddress,
        value: web3.utils.toHex(20), // 20 Wei
        data: depositData,
        gas: 50000,
        maxFeePerGas: 31000000000, // Max fee per gas
        maxPriorityFeePerGas: 10000000000, // Max priority fee per gas
      };

      await web3.eth
        .sendTransaction(txObj)
        .on("transactionHash", function (hash) {
          console.log("Transaction Hash:", hash);
        })
        .on("receipt", function (receipt) {
          console.log("Receipt:", receipt);
        })
        .on("error", function (error) {
          console.error("Error:", error);
        });
    }
  } catch (err) {
    console.log(err);
  }
  // Send the transaction
};

executeTransaction()
  .then(() => {
    console.log("Transactions executed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error executing transactions:", error);
    process.exit(1);
  });
