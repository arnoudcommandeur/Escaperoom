/*

The public version of the file used for testing can be found here: https://gist.github.com/ConsenSys-Academy/7d59ba6ebe581c1ffcc981469e226c6e

This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "truffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.

*/
let BN = web3.utils.BN
let Collactables = artifacts.require('Collectables')
let catchRevert = require("./exceptionsHelpers.js").catchRevert

contract('Collactables', function(accounts) {

    const contractOwner = accounts[0]
    const visitor1 = accounts[1]
    const visitor2 = accounts[2]
    const visitor3 = accounts[3]
    const visitor4 = accounts[4]
    const visitor5 = accounts[5]
    const escapeRoomAdmin1 = accounts[6]
    const escapeRoomAdmin2 = accounts[7]
    const escapeRoomAdmin3 = accounts[8]
    const escapeRoomAdmin4 = accounts[9]

    const emptyAddress = '0x0000000000000000000000000000000000000000'

    const escapeRoomName1 = 'escapeRoomName1'
    const escapeRoomName2 = 'escapeRoomName2'
    const escapeRoomName3 = 'escapeRoomName3'
    const escapeRoomName4 = 'escapeRoomName4'
    const escapeRoomName5 = 'escapeRoomName5'

    // const price = "1000"
    // const excessAmount = "2000"
    // const name = "book"

    let instance

    beforeEach(async () => {
        instance = await Collactables.new()
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
        await instance.rewardVisitor(1, visitor1, {from: escapeRoomAdmin1})

        const result = await instance.balanceOf.call(visitor1, 1, {from: visitor1})
        assert.equal(result.toString(10), 1, 'Token of escaperoom not available after reward')
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
        await instance.mint(1, newTokens, {from: escapeRoomAdmin1, value: newTokens*newPricePerToken})

    })

    it("should not be able to buy new tokens after supplying the incorrect amount of ether", async() => {
        const newPricePerToken = 100000
        const newTokens = 1000

        const tx = await instance.setPricePerCollectable(newPricePerToken, {from: contractOwner})
        await instance.createNewEscaperoom(escapeRoomAdmin1, escapeRoomName1, 0, {from: contractOwner})
        await catchRevert(instance.mint(1, newTokens, {from: escapeRoomAdmin1, value: (newTokens*newPricePerToken-1)}))
    })

})
