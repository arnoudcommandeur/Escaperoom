/*

The public version of the file used for testing can be found here: https://gist.github.com/ConsenSys-Academy/7d59ba6ebe581c1ffcc981469e226c6e

This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "truffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.

*/
let BN = web3.utils.BN
let Collectables = artifacts.require('Collectables')
let catchRevert = require("./exceptionsHelpers.js").catchRevert

contract('Collectables', function(accounts) {

    const pricePerToken = "100000"

    const contractOwner = accounts[0]
    const visitor1 = accounts[1]
    const visitor2 = accounts[2]
    const visitor3 = accounts[3]
    const visitor4 = accounts[4]
    const escapeRoomAdmin1 = accounts[5]
    const escapeRoomAdmin2 = accounts[6]
    const escapeRoomAdmin3 = accounts[7]
    const escapeRoomAdmin4 = accounts[8]
    const escapeRoomAdmin5 = accounts[9]

    const emptyAddress = '0x0000000000000000000000000000000000000000'

    const escapeRoomName1 = 'escapeRoomName1'
    const escapeRoomName2 = 'escapeRoomName2'
    const escapeRoomName3 = 'escapeRoomName3'
    const escapeRoomName4 = 'escapeRoomName4'
    const escapeRoomName5 = 'escapeRoomName5'

    // const excessAmount = "2000"
    // const name = "book"

    let instance

    beforeEach(async () => {
        instance = await Collectables.new()
    })

    it("should add a new Escape Room by the contractOwner", async() => {
        const tx = await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 100, {from: contractOwner})

        //console.log(tx.logs);

        // if (tx.logs[0].event == "TransferSingle") {
        //     eventEmitted = true
        // }           
        const result = await instance.EscapeRoomCounter.call();

        assert.equal(result, 1, 'Number of escape rooms not 1')
        //assert.equal(eventEmitted, true, 'no tokens were minted while creating the new escape room')
    })

    it("should not be able to create Escape Room by NOT the contractOwner", async() => {
        await catchRevert(instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 100, {from: visitor1}))
    })

    it("should be able to reward a visitor by Escape Room admin", async() => {
        const tx = await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 100, {from: contractOwner})
        await instance.rewardVisitor(visitor1, {from: escapeRoomAdmin1})

        const result = await instance.balanceOf.call(visitor1, 1, {from: visitor1})
        assert.equal(result.toString(10), 1, 'Token of escaperoom not available after reward')
    })

    it("should not be able to reward the same visitor twice by the samen Escape Room admin", async() => {
        const tx = await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 100, {from: contractOwner})
        await instance.rewardVisitor(visitor1, {from: escapeRoomAdmin1})
        await catchRevert(instance.rewardVisitor(visitor1, {from: escapeRoomAdmin1}))

        const result = await instance.balanceOf.call(visitor1, 1, {from: visitor1})
        assert.equal(result.toString(10), 1, 'Multiple tokens of same escaperoom')
    })

    it("should only be able for the contractOwner to mint new free tokens", async() => {
        const tx = await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 100, {from: contractOwner})
        await instance.mintAdmin(1, 100, {from: contractOwner})

        const result = await instance.balanceOf.call(escapeRoomAdmin1, 1, {from: escapeRoomAdmin1})
        assert.equal(result.toString(10), 200, 'Token of escaperoom not increased by function mint')
    })

    it("should only be able to buy new tokens after supplying the correct amount of ether", async() => {
        const newPricePerToken = 100000
        const newTokens = 1000

        const tx = await instance.setPricePerCollectable(newPricePerToken, {from: contractOwner})
        await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 0, {from: contractOwner})
        await instance.mintTokens(newTokens, {from: escapeRoomAdmin1, value: newTokens*newPricePerToken})

    })

    it("should not be able to buy new tokens after supplying the incorrect amount of ether", async() => {
        const newPricePerToken = 100000
        const newTokens = 1000

        const tx = await instance.setPricePerCollectable(newPricePerToken, {from: contractOwner})
        await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 0, {from: contractOwner})
        await catchRevert(instance.mintTokens(newTokens, {from: escapeRoomAdmin1, value: (newTokens*newPricePerToken-1)}))
    })

    it("should not be able to withdraw tokens as a non smartcontract owner", async() => {
        const newPricePerToken = 100000
        const newTokens = 1000

        const tx = await instance.setPricePerCollectable(newPricePerToken, {from: contractOwner})
        await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 0, {from: contractOwner})
        await instance.mintTokens(newTokens, {from: escapeRoomAdmin1, value: newTokens*newPricePerToken})

        await catchRevert(instance.withdraw(escapeRoomAdmin1, {from: escapeRoomAdmin1}))
    })

    it("should be able to withdraw tokens as a smartcontract owner to own address", async() => {
        const newPricePerToken = 100000
        const newTokens = 1000

        const tx = await instance.setPricePerCollectable(newPricePerToken, {from: contractOwner})
        await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 0, {from: contractOwner})
        await instance.mintTokens(newTokens, {from: escapeRoomAdmin1, value: newTokens*newPricePerToken})

        await instance.withdraw(contractOwner, {from: contractOwner})
    })

    it("should be able to withdraw tokens as a smartcontract owner to other address", async() => {
        const newPricePerToken = 100000
        const newTokens = 1000

        const tx = await instance.setPricePerCollectable(newPricePerToken, {from: contractOwner})
        await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 0, {from: contractOwner})
        await instance.mintTokens(newTokens, {from: escapeRoomAdmin1, value: newTokens*newPricePerToken})

        await instance.withdraw(escapeRoomAdmin1, {from: contractOwner})
    })

    it("should not be able to change tokenprice for non contract owner", async() => {
        const newPricePerToken = 100000
        const newTokens = 1000

        const tx = await catchRevert(instance.setPricePerCollectable(newPricePerToken, {from: visitor1}))
    })

})
