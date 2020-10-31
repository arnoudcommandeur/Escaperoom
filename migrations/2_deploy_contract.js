var Collectables = artifacts.require('Collectables')

module.exports = (deployer) => {
    deployer.deploy(Collectables).then(async function(instance) {
        //console.log('Extra info here!');
        var accounts = await web3.eth.getAccounts();

        await instance.setPricePerCollectable(2000000);
        await instance.createNewEscaperoom(accounts[5], "The mask", 100000);
        await instance.createNewEscaperoom(accounts[6], "The mask", 100000);
        await instance.createNewEscaperoom(accounts[7], "The mask", 100000);
        await instance.createNewEscaperoom(accounts[8], "The mask", 100000);
        await instance.createNewEscaperoom(accounts[9], "The mask", 100000);


        await instance.rewardVisitor(1, accounts[0], {from: accounts[5]} );
        // await instance.rewardVisitor(2, accounts[0], {from: accounts[6]} );
        // await instance.rewardVisitor(3, accounts[0], {from: accounts[7]} );

        return 0;
    })
}