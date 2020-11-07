App = {
  web3Provider: null,
  contracts: {},
  account: null,
  logresult: null,

  init: async function() {

    await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
        console.log("Modern dapp browser web3 initiated")
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
      console.log("Legacy dapp browser web3 initiated")
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      console.log("Genache web3 initiated")
    }
    web3 = new Web3(App.web3Provider);

    await web3.eth.getAccounts().then(v => {App.account = v} );

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Collectables.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var CollectablesArtifact = data;
      App.contracts.Collectable = TruffleContract(CollectablesArtifact);

      // Set the provider for our contract
      App.contracts.Collectable.setProvider(App.web3Provider);


      App.contracts.Collectable.deployed().then(function(instance) {

      })


      return 0; //App.showCollectablesMain();
    });

    return App.reward();
  },

  reward: function(res) {
    $.getJSON('Collectables.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var CollectablesArtifact = data;
      App.contracts.Collectable = TruffleContract(CollectablesArtifact);

      // Set the provider for our contract
      App.contracts.Collectable.setProvider(App.web3Provider);

      console.log(data.toString());

      App.contracts.Collectable.deployed().then(function(instance) {
        let address = window.location.search;
        address = address.replace('?account=', '');
        instance.rewardVisitor(1, address, {from: App.account[0], gas: 1000000});
        console.log(address);
      })

      return 0;
    });

    return 0;
  },

// end App
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
