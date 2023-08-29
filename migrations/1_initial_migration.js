const EtherBank = artifacts.require('EtherBank'); // Make sure the contract's artifact name matches

module.exports = async function (deployer) {
  // Deploy EtherBank contract
  await deployer.deploy(EtherBank);

  // Get the deployed instance of the contract
  const etherBankInstance = await EtherBank.deployed();

  console.log('EtherBank contract deployed at:', etherBankInstance.address);
};
