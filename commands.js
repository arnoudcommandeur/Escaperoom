// Init contract
var instance = await Collectables.deployed();
await instance.setPricePerCollectable(2000000);

var accounts = await web3.eth.getAccounts();
await instance.createNewEscaperoom(accounts[1], "The mask", "100000");
await instance.mint(1, 2, {from: accounts[1], value:4000000});

await instance.rewardVisitor(1, accounts[2], {from: accounts[1]} );
await instance.rewardVisitorBatch(1, [accounts[2], accounts[3]], {from: accounts[1]} );
await instance.balanceOf(accounts[2],1).then(result => result.toNumber());

await instance.mintAdmin(1, 100);
await instance.setPricePerCollectable(2000000);

// Get contract balance
await web3.eth.getBalance(instance.address).then(result => console.log(result));

instance.EscaperoomAdmins(accounts[1]).then(result => result);

instance.EscapeRoomCounter.call().then(function (res) {console.log(res.toNumber())});
instance.Escaperooms.call(1).then(function (res) {console.log(res)});



// Testing
instance.createNewEscaperoom(accounts[1], "The mask", "100000",{from: accounts[1]});



instance.mint(accounts[0],5,100,"0x");

instance.safeTransferFrom(accounts[0],accounts[1],1,5,"0x");

instance.balanceOf(accounts[0],5).then(result => result.toNumber());

instance.pause();
instance.unpause();
