const messageBuild = artifacts.require('Collectables'); //artifacts.require('./build/contracts/Collectables.json')
const contract = require('./truffle-contract')
// const Message = contract(messageBuild);

module.exports = async function(callback) {
//  Message.setProvider(web3.currentProvider);
  console.log('Step 1');

  const accounts = await web3.eth.getAccounts();

  console.log('Accounts loaded');
  console.log(accounts);
  //Message.defaults({from: creator})

//   var messageInstance = null
//   Message.deployed().then(inst => { return messageInstance = inst}).then( () =>{ console.log("Creating Message:", typeof messageInstance.createMessage, "creator", creator, "web3.eth.defaultAccount", web3.eth.defaultAccount); return messageInstance.createMessage(creator, "This is a classic warning") }).catch((error)=> { console.error("\n\n\n\n==>error", error) }).then( () =>{ console.log("Reading Message", typeof messageInstance.readMessage); return messageInstance.readMessage(creator).then((msg) => console.log("The result is:", msg)) }).then( ()=> { return console.log("End"); return callback()} )

    //await Collectables.rewardVisitor(1, accounts[0], {from: creator} );

    //console.log('Escape Room 1 rewarded to account 0');
    callback();
}

// var Collectables = artifacts.require('Collectables');

// module.exports = async function(callback) {
//     console.log('Rewarding Escape Room 1 to account 0');
//     const accounts = await web3.eth.getAccounts();
//     console.log('Accounts loaded');

//     await Collectables.rewardVisitor(1, accounts[0], {from: accounts[5]} );

//     console.log('Escape Room 1 rewarded to account 0');

//     callback();
// }