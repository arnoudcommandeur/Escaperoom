App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    // $.getJSON('../pets.json', function(data) {
    //   var collectableRow = $('#collectableRow');
    //   var collectableTemplate = $('#collectableTemplate');

    //   for (i = 0; i < data.length; i ++) {

    //     // console.log(i);
    //     collectableTemplate.find('.panel-title').text(data[i].name);
    //     collectableTemplate.find('img').attr('src', data[i].picture);
    //     collectableTemplate.find('.pet-breed').text(data[i].breed);
    //     collectableTemplate.find('.pet-age').text(data[i].age);
    //     collectableTemplate.find('.pet-location').text(data[i].location);
    //     collectableTemplate.find('.btn-adopt').attr('data-id', data[i].id);

    //     collectableRow.append(collectableTemplate.html());
    //   }
    // });

    return await App.initWeb3();
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

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Collectables.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var CollectablesArtifact = data;
      App.contracts.Collectable = TruffleContract(CollectablesArtifact);

      // Set the provider for our contract
      App.contracts.Collectable.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.showCollectablesMain();
    });

    //return App.bindEvents();
  },

  showCollectablesMain: function() {
    //var collectableInstance;

    App.contracts.Collectable.deployed().then(function(instance) {
    //collectableInstance = instance;

      return instance.EscapeRoomCounter.call();
    }).then(function(EscapeRoomCounter) {
      console.log("Number of Escape Rooms: " + EscapeRoomCounter.toNumber());

      for (var i = 0; i < EscapeRoomCounter; i++) {
        App.showCollectables(i);
      }


    }).catch(function(err) {
      console.error(err.message);
    });
  },

  showCollectables: function(EscapeRoomCounter) {
    //var collectableInstance;

    App.contracts.Collectable.deployed().then(function(instance) {
    //collectableInstance = instance;

      return instance.balanceOf.call(web3.eth.accounts[0],EscapeRoomCounter);
    }).then(function(Tokens) {
      console.log("Number of Tokens for Escape Room: " + EscapeRoomCounter + " for account: " + web3.eth.accounts[0] + ": " + Tokens.toNumber());


    }).catch(function(err) {
      console.error(err.message);
    });
  },
  // showCollectables: function() {
  //   var collectableInstance;

  //   App.contracts.Collactable.deployed().then(function(instance) {
  //     collectableInstance = instance;

  //     return collectableInstance.getAdopters.call();
  //   }).then(function(adopters) {
  //     for (i = 0; i < adopters.length; i++) {
  //       if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //         $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //       }
  //     }
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });
  // },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
