const HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;

var Collectables = artifacts.require('Collectables')

module.exports = (deployer) => {
    deployer.deploy(Collectables).then(async function(instance) {
        //console.log('Extra info here!');

        var accounts = await web3.eth.getAccounts();
        await instance.setPricePerCollectable(100000);
        await instance.createNewEscaperoom(accounts[5], "Escape Room 1", 100000);
        await instance.createNewEscaperoom(accounts[6], "Escape Room 2", 100000);
        await instance.createNewEscaperoom(accounts[7], "Escape Room 3", 100000);
        await instance.createNewEscaperoom(accounts[8], "Escape Room 4", 100000);
        await instance.createNewEscaperoom(accounts[9], "Escape Room 5", 100000);


        //await instance.rewardVisitor(1, accounts[0], {from: accounts[5]} );
        // await instance.rewardVisitor(2, accounts[0], {from: accounts[6]} );
        // await instance.rewardVisitor(3, accounts[0], {from: accounts[7]} );

        return 0;
    })
}